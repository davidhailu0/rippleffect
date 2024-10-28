'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, ChangeEvent, useRef, useCallback, useMemo } from 'react';
import { ClipLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import MuxPlayer from '@mux/mux-player-react';
import { fetchSurveys } from '../../../lib/actions';
import { GetVideoContext, Video } from '../../../hooks/VideoContext';

type Answer = { question_id: number; response: string };
type Survey = { id: number; title: string; question_type: string; choices: Record<string, string> };
type Question = { id: number; questions: Survey[] };

export default function DisplayQuestion() {
    const [surveys, setSurveys] = useState<Question | null>(null);
    const [selectedValue, setSelectedValue] = useState<Answer | null>(null);
    const [answers, setAnswers] = useState<Answer[]>([]);
    const [videoIDS, setVideoIDS] = useState<Video[]>([]);
    const [index, setIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [lastTime, setLastTime] = useState(0);
    const router = useRouter();

    // Memoized video context
    const videoContext = useMemo(() => GetVideoContext(), []);

    // Function to handle video sorting
    const compareVideoTitle = useCallback((a: Video, b: Video) => {
        const questionNumA = parseInt(a.title.split(' ')[1]);
        const questionNumB = parseInt(b.title.split(' ')[1]);
        return questionNumA - questionNumB;
    }, []);

    // Fetch surveys and videos
    useEffect(() => {
        const fetchRequest = async () => {
            const question = await fetchSurveys();
            if (question) {
                const firstQuestionTitle = question.questions[0]?.title;
                if (firstQuestionTitle && localStorage.getItem(firstQuestionTitle)) {
                    const response = localStorage.getItem(firstQuestionTitle) as string;
                    setSelectedValue({ question_id: question.questions[0].id, response });
                    setAnswers([{ question_id: question.questions[0].id, response }]);
                }
                setSurveys(question);
            }

            const surveyVideos = videoContext!.videos
                .filter(({ tag_list }) => tag_list.includes('survey'))
                .sort(compareVideoTitle);
            setVideoIDS(surveyVideos);
        };

        fetchRequest();
    }, [videoContext, compareVideoTitle]);

    // Handle visibility changes for the video
    useEffect(() => {
        const handleVisibilityChange = () => {
            const videoElement = videoRef.current;
            if (videoElement) {
                if (document.visibilityState === 'hidden') {
                    videoElement.pause()
                }
                else {
                    videoElement.play();
                }
            }
        };

        const handleContextMenu = (e: MouseEvent) => e.preventDefault();

        document.addEventListener('visibilitychange', handleVisibilityChange);
        document.addEventListener('contextmenu', handleContextMenu);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            document.removeEventListener('contextmenu', handleContextMenu);
        };
    }, []);

    // Submit answers to the survey
    const answerQuestion = useCallback(async () => {
        try {
            const email = Cookies.get('email');
            const token = Cookies.get('token');
            if (!email || !token) return;

            await fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/surveys/${surveys?.id}/answer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: token,
                    Origin: window.location.origin,
                },
                body: JSON.stringify({
                    email,
                    answers,
                }),
            });
        } catch (error) {
            console.error('Error submitting answers:', error);
        }
    }, [surveys, answers]);

    // Go to the next question
    const goToNext = useCallback(() => {
        if (!surveys || surveys.questions.length === 0) return;

        if (selectedValue) {
            setAnswers((prev) => {
                const newAnswers = [...prev];
                newAnswers[index] = selectedValue;
                return newAnswers;
            });
        }

        if (index + 1 < surveys.questions.length) {
            setIndex((prev) => prev + 1);
            setSelectedValue(null);
            const nextQuestionTitle = surveys.questions[index + 1]?.title;
            const nextResponse = localStorage.getItem(nextQuestionTitle);

            if (nextResponse) {
                const nextAnswer: Answer = { question_id: surveys.questions[index + 1].id, response: nextResponse };
                setSelectedValue(nextAnswer);
                setAnswers((prev) => {
                    const newAnswers = [...prev];
                    newAnswers[index + 1] = nextAnswer;
                    return newAnswers;
                });
            }
        } else {
            answerQuestion();
            Cookies.set('questionFinished', 'true', { path: '/', expires: 365 });
            router.replace('/step-3');
        }
    }, [surveys, selectedValue, index, answerQuestion, router]);

    // Handle input change
    const handleOnChange = (val: Answer) => {
        if (!surveys || surveys.questions.length === 0) return;
        localStorage.setItem(surveys?.questions[index].title, val.response);
        setSelectedValue(val);
        setAnswers((prev) => {
            const newAnswers = [...prev];
            newAnswers[index] = val;
            return newAnswers;
        });
    };

    // Handle video time update
    const handleTimeUpdate = (e: Event) => {
        const videoElement = e.currentTarget as HTMLVideoElement;
        const currentTime = videoElement.currentTime;
        if (currentTime - lastTime > 2) {
            videoElement.currentTime = lastTime;
        } else {
            setLastTime(currentTime);
        }
    };

    if (!surveys) return <ClipLoader color="#fff" size={70} className="h-10 w-10" />;
    if (surveys.questions.length === 0) return <p className="text-white text-2xl font-bold">No Questions Found</p>;

    return (
        <div className="mt-7 md:mt-12 flex flex-col w-full md:w-2/5">
            <div className="h-auto w-full mx-auto flex flex-col gap-7 bg-white px-8 py-10">
                <Image src="/logo.png" alt="logo" height={95} width={90} className="mx-auto" unoptimized />
                <MuxPlayer
                    ref={videoRef}
                    playbackId={videoIDS[index]?.mux_playback_id}
                    onTimeUpdate={handleTimeUpdate}
                    className="h-[300px] md:h-[500px] overflow-x-hidden"
                />
                <SurveyQuestion
                    survey={surveys.questions[index]}
                    selectedValue={selectedValue}
                    handleOnChange={handleOnChange}
                />
            </div>
            <div className="w-full h-16 bg-blue-500 flex justify-end items-center">
                <button onClick={goToNext} className="text-white h-full w-48 bg-blue-700">Next -&gt;</button>
            </div>
        </div>
    );
}

// Separate component for the survey question
function SurveyQuestion({
    survey,
    selectedValue,
    handleOnChange,
}: {
    survey: Survey;
    selectedValue: Answer | null;
    handleOnChange: (val: Answer) => void;
}) {
    return (
        <>
            {survey.question_type === 'multiple_choice' && <p className="text-blue-400">{survey.title}</p>}
            {survey.question_type === 'multiple_choice' ? (
                <div className="grid grid-cols-4 space-x-3">
                    {Object.entries(survey.choices).map(([key, value]) => (
                        <label key={key} className="inline-flex items-center">
                            <input
                                type="radio"
                                name={key}
                                value={value}
                                checked={selectedValue?.response === value}
                                onChange={() => handleOnChange({ question_id: survey.id, response: value })}
                                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                            />
                            <span className="ml-2 text-gray-700">{value}</span>
                        </label>
                    ))}
                </div>
            ) : (
                <TextField
                    label={survey.title}
                    value={selectedValue?.response}
                    placeholder={survey.title}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                        handleOnChange({ question_id: survey.id, response: e.target.value })
                    }
                />
            )}
        </>
    );
}

// TextField component
function TextField({
    label,
    value,
    placeholder,
    onChange,
}: {
    label: string;
    value?: string;
    placeholder: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
    return (
        <div>
            <label htmlFor="text-field" className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type="text"
                id="text-field"
                placeholder={placeholder}
                className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d7b398]"
                value={value || ''}
                onChange={onChange}
            />
        </div>
    );
}
