'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useState, useEffect, ChangeEvent } from "react"
import { ClipLoader } from "react-spinners"
import Cookies from "js-cookie"
import { fetchSurveys } from "../lib/actions"
type Answer = { question_id: number, response: string }
type Survey = { id: number, title: string, question_type: string, choices: { [key: string]: string } }
type Question = { id: number, questions: Survey[] }

export default function DisplayQuestion() {
    const [surveys, setSurveys] = useState<Question | null>(null)
    const [selectedValue, setSelectedValue] = useState<Answer | null>(null)
    const [answers, setAnswer] = useState<Answer[]>([])
    const [index, setIndex] = useState(0)
    const router = useRouter()

    useEffect(() => {
        async function fetchRequest() {
            const question = await fetchSurveys()
            setSurveys(question)
        }
        fetchRequest()
    }, [])
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
        fetch(`${process.env.NEXT_PUBLIC_APP_DOMAIN}api/v1/surveys/${surveys.id}/answer`, {
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
            return
        }
        answerQuestion()
        router.replace('/step-3')
    }

    return <div className="mt-7 md:mt-12 flex flex-col w-full md:w-2/5">
        <div className="h-auto w-full mx-auto flex flex-col gap-7 bg-white px-8 py-10">
            <Image src="/logo.png" alt="logo.png" height={106} width={100} className="mx-auto" unoptimized />
            <video controls autoPlay className="h-[300px] md:h-[500px]"></video>
            <p className="text-blue-400">
                {surveys.questions[index]?.title}
            </p>
            {surveys.questions[index]?.question_type === 'multiple_choice' ?
                <div className="grid grid-cols-4 space-x-3">
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
                : <input className="outline-none border-b border-b-black " type="text" value={selectedValue?.response} onChange={(e: ChangeEvent<HTMLInputElement>) => handleOnChange({ question_id: surveys.questions[index].id, response: e.target.value })} />}
        </div>
        <div className="w-full h-16 bg-blue-500 flex justify-end items-center">
            <button onClick={goToNext} className="text-white h-full w-48 bg-blue-700">Next -&gt;</button>
        </div>
    </div>
}