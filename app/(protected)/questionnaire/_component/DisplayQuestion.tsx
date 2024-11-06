'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useEffect, useRef, useCallback } from 'react';
import { ClipLoader } from 'react-spinners';
import Cookies from 'js-cookie';
import MuxPlayer from '@mux/mux-player-react';
import clsx from 'clsx';
import Question from '@/types/Question';
import Answer from '@/types/Answers';
import SurveyQuestion from './SurveyQuestion';
import { GetVideoContext, Video } from '@/app/hooks/VideoContext';
import { answerSurvey, fetchSurveys } from '@/app/services/SurveyService';



export default function DisplayQuestion() {
    const [surveys, setSurveys] = useState<Question | null>(null);
    const [selectedValue, setSelectedValue] = useState<Answer | null>(null);
    const [videoIDS, setVideoIDS] = useState<Video[]>([]);
    const [index, setIndex] = useState(0);
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const [lastTime, setLastTime] = useState(0);
    const router = useRouter();

    // Memoized video context
    const videoContext = GetVideoContext()

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
            if (question && question.questions && question.questions.length > 0) {
                const firstQuestionTitle = question.questions[0]?.title;
                if (firstQuestionTitle && localStorage.getItem(firstQuestionTitle)) {
                    const response = localStorage.getItem(firstQuestionTitle) as string;
                    setSelectedValue({ question_id: question.questions[0].id, response });
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
        answerSurvey({
            "answer": {
                "question_id": surveys?.questions[index].id,
                "response": selectedValue?.response
            }
        }, surveys?.id)
    }, [surveys, index, selectedValue]);

    // Go to the next question
    const goToNext = useCallback(() => {
        if (!surveys || surveys.questions.length === 0 || selectedValue == null || selectedValue.response == '') return;

        answerQuestion();
        if (index + 1 < surveys.questions.length) {
            setIndex((prev) => prev + 1);
            setSelectedValue(null);
            const nextQuestionTitle = surveys.questions[index + 1]?.title;
            const nextResponse = localStorage.getItem(nextQuestionTitle);

            if (nextResponse) {
                const nextAnswer: Answer = { question_id: surveys.questions[index + 1].id, response: nextResponse };
                setSelectedValue(nextAnswer);
            }
        } else {
            Cookies.set('questionFinished', 'true', { path: '/', expires: 365 });
            router.replace('/work-with-me/step-3');
        }
    }, [surveys, selectedValue, index, answerQuestion, router]);

    // Handle input change
    const handleOnChange = (val: Answer) => {
        if (!surveys || surveys.questions.length === 0) return;
        localStorage.setItem(surveys?.questions[index].title, val.response);
        setSelectedValue(val);
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
    if (!Boolean(surveys) || !Boolean(surveys.questions) || surveys.questions.length === 0) return <p className="text-white text-2xl font-bold">No Questions Found</p>;

    return (
        <div className="mt-7 md:mt-12 flex flex-col w-full md:w-2/5">
            <div className="h-auto w-full mx-auto flex flex-col gap-7 bg-white px-8 py-10">
                <Image src="/logo.png" alt="logo" height={95} width={90} className="mx-auto" unoptimized />
                <MuxPlayer
                    ref={videoRef}
                    streamType="on-demand"
                    playbackId={videoIDS[index]?.mux_playback_id || "not-found"}
                    onTimeUpdate={handleTimeUpdate}
                    className={clsx(`h-[300px] md:h-[500px] overflow-x-hidden`)}
                />
                <SurveyQuestion
                    survey={surveys.questions[index]}
                    selectedValue={selectedValue}
                    handleOnChange={handleOnChange}
                    handleNext={goToNext}
                />
            </div>
            <div className="w-full h-16 bg-pink-400 flex justify-end items-center">
                <button onClick={goToNext} className="text-white h-full w-48 bg-pink-600">Next -&gt;</button>
            </div>
        </div>
    );
}

// TextField component

