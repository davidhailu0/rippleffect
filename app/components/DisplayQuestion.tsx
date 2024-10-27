'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect, ChangeEvent, useRef } from "react"
import { ClipLoader } from "react-spinners"
import Cookies from "js-cookie"
import MuxPlayer from "@mux/mux-player-react";
import { fetchSurveys } from "../lib/actions"
import { GetVideoContext, Video } from "./VideoContext"
type Answer = { question_id: number, response: string }
type Survey = { id: number, title: string, question_type: string, choices: { [key: string]: string } }
type Question = { id: number, questions: Survey[] }

export default function DisplayQuestion() {
    const [surveys, setSurveys] = useState<Question | null>(null)
    const [selectedValue, setSelectedValue] = useState<Answer | null>(null)
    const [answers, setAnswer] = useState<Answer[]>([])
    const [videoIDS, setVideoIDS] = useState<Video[]>([])
    const [index, setIndex] = useState(0)
    const videoRef = useRef<HTMLVideoElement>(null);
    const [lastTime, setLastTime] = useState(0);
    const router = useRouter()

    const videoContext = GetVideoContext()

    const compareVideoTitle = (a: Video, b: Video) => {
        const questionNuma = parseInt(a.title.substring(a.title.indexOf(' ') + 1, a.title.indexOf(':')))
        const questionNumb = parseInt(b.title.substring(b.title.indexOf(' ') + 1, b.title.indexOf(':')))
        return questionNuma - questionNumb
    }

    useEffect(() => {
        async function fetchRequest() {
            const question = await fetchSurveys()
            if (question && question.questions.length != 0 && Boolean(localStorage.getItem(question.questions[0]?.title))) {
                setSelectedValue({ question_id: question.questions[0].id, response: localStorage.getItem(question.questions[0].title)!.toString() })
                setAnswer(prev => {
                    const newVal: Answer[] = [...prev]
                    newVal[0] = { question_id: question.questions[0].id, response: localStorage.getItem(question.questions[0].title)!.toString() }
                    return newVal
                })
            }
            setSurveys(question)
        }
        fetchRequest()
        setVideoIDS(videoContext!.videos.filter(({ tag_list }) => tag_list.includes('survey')).sort(compareVideoTitle))
        const handleVisibilityChange = () => {
            const videoElement = videoRef.current;
            if (videoElement) {
                if (document.visibilityState === "hidden") {
                    videoElement.pause();
                }
                else {
                    videoElement.play();
                }
            }
        };

        // Detect tab visibility changes
        document.addEventListener("visibilitychange", handleVisibilityChange);
        // document.addEventListener("visibilitychange", handlePlayPause);

        // Prevent context menu (right-click)
        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            // document.removeEventListener("visibilitychange", handlePlayPause);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);
    if (!surveys) return <ClipLoader color="#fff" size={70} className="h-10 w-10" />;

    if (surveys.questions.length === 0) {
        return <p className="text-white text-2xl font-bold">No Questions Found</p>
    }

    const handleOnChange = (val: Answer) => {
        localStorage.setItem(surveys.questions[index].title, val.response)
        setSelectedValue(val)
        setAnswer(prev => {
            const newVal: Answer[] = [...prev]
            newVal[index] = val
            return newVal
        })
    }

    const answerQuestion = () => {
        const email = Cookies.get('email')
        const token = Cookies.get('token')
        fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}/api/v1/surveys/${surveys.id}/answer`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token as string
            },
            body: JSON.stringify({
                "email": email,
                "answers": answers
            })
        })
    }

    const handleTimeUpdate = (e: Event) => {
        const videoElement = e.currentTarget as HTMLVideoElement
        const currentTime = videoElement.currentTime;
        if (currentTime - lastTime > 2) { // Adjust tolerance if necessary
            videoElement.currentTime = lastTime;
        } else {
            setLastTime(currentTime);
        }
    };

    const goToNext = () => {
        if (index + 1 < surveys.questions.length) {
            if (selectedValue !== null) {
                setAnswer(prev => {
                    const newVal: Answer[] = [...prev]
                    if (selectedValue != null) {
                        newVal[index] = selectedValue
                    }
                    return newVal
                })
                setIndex(prev => prev + 1)
                console.log(index)
                console.log(Boolean(localStorage.getItem(surveys.questions[index + 1]?.title)))
                setSelectedValue(null)
                if (Boolean(localStorage.getItem(surveys.questions[index + 1]?.title))) {
                    setSelectedValue({ question_id: surveys.questions[index + 1].id, response: localStorage.getItem(surveys.questions[index + 1].title)!.toString() })
                    setAnswer(prev => {
                        const newVal: Answer[] = [...prev]
                        newVal[index + 1] = { question_id: surveys.questions[index + 1].id, response: localStorage.getItem(surveys.questions[index + 1].title)!.toString() }
                        return newVal
                    })
                }
            }
            return
        }
        answerQuestion()
        Cookies.set('questionFinished', 'true', { path: '/', expires: 365 })
        router.replace('/step-3')
    }


    return <div className="mt-7 md:mt-12 flex flex-col w-full md:w-2/5">
        <div className="h-auto w-full mx-auto flex flex-col gap-7 bg-white px-8 py-10">
            <Image src="/logo.png" alt="logo.png" height={95} width={90} className="mx-auto" unoptimized />
            <MuxPlayer ref={videoRef} playbackId={videoIDS[index].mux_playback_id} onTimeUpdate={handleTimeUpdate} className={"h-[300px] md:h-[500px] overflow-x-hidden"} />
            {surveys.questions[index]?.question_type === 'multiple_choice' && <p className={`text-blue-400`}>
                {surveys.questions[index]?.title}
            </p>}
            {surveys.questions[index]?.question_type === 'multiple_choice' ?
                <div className={`grid grid-cols-4 space-x-3`}>
                    {Object.entries(surveys.questions[index].choices).map(([key, value]) => (
                        <label key={key} className="inline-flex items-center">
                            <input
                                type="radio"
                                name={key}
                                value={value}
                                checked={selectedValue?.response === value}
                                onChange={() => handleOnChange({ question_id: surveys.questions[index].id, response: value })}
                                className="form-radio h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                            />
                            <span className="ml-2 text-gray-700">{value}</span>
                        </label>
                    ))}
                </div>
                : <TextField label={surveys.questions[index]?.title} placeholder={surveys.questions[index]?.title} value={selectedValue?.response} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange({ question_id: surveys.questions[index].id, response: e.target.value })} />}
        </div>
        <div className="w-full h-16 bg-blue-500 flex justify-end items-center">
            <button onClick={goToNext} className="text-white h-full w-48 bg-blue-700">Next -&gt;</button>
        </div>
    </div>
}

function TextField({ label, value, placeholder, onChange }: { label: string, value?: string, type?: string, placeholder: string, hidden?: boolean, onChange: (arg: ChangeEvent<HTMLInputElement>) => void }) {
    return <div>
        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <input type="text" placeholder={placeholder} id="first-name" name="first-name" required
            className="w-full p-2 text-black border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d7b398]" value={Boolean(value) ? value : ''} onChange={onChange} />
    </div>

}