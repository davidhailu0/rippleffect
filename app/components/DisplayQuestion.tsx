'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect, ChangeEvent, useRef } from "react"
import { ClipLoader } from "react-spinners"
import Cookies from "js-cookie"
import MuxPlayer from "@mux/mux-player-react";
import { fetchSurveys } from "../lib/actions"
type Answer = { question_id: number, response: string }
type Survey = { id: number, title: string, question_type: string, choices: { [key: string]: string } }
type Question = { id: number, questions: Survey[] }

export default function DisplayQuestion() {
    const [surveys, setSurveys] = useState<Question | null>(null)
    const [selectedValue, setSelectedValue] = useState<Answer | null>(null)
    const [answers, setAnswer] = useState<Answer[]>([])
    const [index, setIndex] = useState(0)
    const videoRef = useRef<HTMLVideoElement>(null);
    const [lastTime, setLastTime] = useState(0);
    const [show, setShow] = useState(false)
    const router = useRouter()

    useEffect(() => {
        async function fetchRequest() {
            const question = await fetchSurveys()
            console.log(question)
            setSurveys(question)
        }
        fetchRequest()
    }, [])

    useEffect(() => {
        const handleVisibilityChange = () => {
            const videoElement = videoRef.current;
            if (videoElement) {
                if (document.visibilityState === "hidden" && !videoElement.paused) {
                    videoElement.pause();
                }
            }
        };

        const handlePlayPause = () => {
            const videoElement = videoRef.current;
            if (videoElement) {
                if (document.visibilityState === "visible") {
                    videoElement.play();
                } else {
                    videoElement.pause();
                }
            }
        };

        // Detect tab visibility changes
        document.addEventListener("visibilitychange", handleVisibilityChange);
        document.addEventListener("visibilitychange", handlePlayPause);

        // Prevent context menu (right-click)
        const handleContextMenu = (e: MouseEvent) => e.preventDefault();
        document.addEventListener("contextmenu", handleContextMenu);

        return () => {
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            document.removeEventListener("visibilitychange", handlePlayPause);
            document.removeEventListener("contextmenu", handleContextMenu);
        };
    }, []);
    if (!surveys) return <ClipLoader color="#fff" size={70} className="h-10 w-10" />;

    if (surveys.questions.length === 0) {
        return <p className="text-white text-2xl font-bold">No Questions Found</p>
    }

    const handleOnChange = (val: Answer) => {
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
                'Authorization': token as string,
                'Origin': window.location.origin
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
            setAnswer(prev => {
                const newVal: Answer[] = [...prev]
                if (selectedValue != null) {
                    newVal[index] = selectedValue
                }
                return newVal
            })
            setIndex(prev => prev + 1)
            setShow(false)
            return
        }
        answerQuestion()
        Cookies.set('questionFinished', 'true', { path: '/', expires: 365 })
        router.replace('/step-3')
    }

    const onVideoEnd = () => {
        setShow(true)
    }

    return <div className="mt-7 md:mt-12 flex flex-col w-full md:w-2/5">
        <div className="h-auto w-full mx-auto flex flex-col gap-7 bg-white px-8 py-10">
            <Image src="/logo.png" alt="logo.png" height={95} width={90} className="mx-auto" unoptimized />
            <MuxPlayer playbackId="ZflXYEAaVp8GzS7wfucCJ3l7R9c5p101qXI1yg3QEZhk" onTimeUpdate={handleTimeUpdate} onEnded={onVideoEnd} className={"h-[300px] md:h-[500px]"} />
            {surveys.questions[index]?.question_type === 'multiple_choice' && <p className={`text-blue-400 ${!show && 'hidden'}`}>
                {surveys.questions[index]?.title}
            </p>}
            {surveys.questions[index]?.question_type === 'multiple_choice' ?
                <div className={`grid grid-cols-4 space-x-3 ${!show && 'hidden'}`}>
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
                : <TextField label={surveys.questions[index]?.title} placeholder={surveys.questions[index]?.title} value={selectedValue?.response} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange({ question_id: surveys.questions[index].id, response: e.target.value })} hidden={!show} />}
        </div>
        <div className="w-full h-16 bg-blue-500 flex justify-end items-center">
            <button onClick={goToNext} className="text-white h-full w-48 bg-blue-700">Next -&gt;</button>
        </div>
    </div>
}

function TextField({ label, value, type, placeholder, hidden, onChange }: { label: string, value?: string, type?: string, placeholder: string, hidden?: boolean, onChange: (arg: ChangeEvent<HTMLInputElement>) => void }) {
    return <div className={`relative w-full max-w-xs mx-auto ${hidden && 'hidden'}`}>
        <input type={type ? type : 'text'} value={value}
            className="text-black peer w-full px-4 py-2 bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent placeholder-transparent transition-all duration-200"
            placeholder={placeholder} onChange={onChange} />
        <label htmlFor="fancy-input"
            className="absolute left-4 -top-2.5 text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-gray-500">
            {label}
        </label>
    </div>

}