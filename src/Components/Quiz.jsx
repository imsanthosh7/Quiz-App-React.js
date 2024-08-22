import React, { useEffect, useState } from 'react'
import data from '../assets/Data.json'

function Quiz() {

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [timer, setTimer] = useState(10);

    useEffect(() => {

        let interval;
        if (timer > 0 && !showScore) {
            interval = setInterval(() => {
                setTimer((previousTimer) => previousTimer - 1);
            }, 1000);
        } else {
            clearInterval(interval);
            setShowScore(true);
        }

        return () => clearInterval(interval);

    }, [timer, showScore]);

    const handelAnswerCheck = (selectedOption) => {
        if (selectedOption === data[currentQuestion].correct_answer) {
            setScore((previousScore) => previousScore + 1);
        }

        if (currentQuestion < data.length - 1) {
            setCurrentQuestion((previousQustion) => previousQustion + 1);
            setTimer(10);
        } else {
            setShowScore(true);
        }


    }

    const restartQiuz = () => {
        setCurrentQuestion(0)
        setScore(0)
        setShowScore(false);
        setTimer(10);

    }

    return (
        <>
         <div className='flex justify-center my-5 '>
            <h1 className='md:text-[3rem] text-[2rem] font-semibold text-white'>Quiz App</h1>
         </div>
        <div className='md:h-[300px] md:w-[600px] w-[350px] h-[400px] md:px-20 px-6 py-4 flex justify-center flex-col items-center bg-gray-200 rounded-lg '>
            {showScore ?
                (
                    <div className='text-center'>
                        <p className='text-2xl text-gray-800'>Your Score:{score}/{data.length}</p>
                        <button
                            onClick={restartQiuz}
                            className='py-1 mt-3 px-2 rounded-full bg-orange-400 text-white'>
                            Restart
                        </button>
                    </div>
                ) :
                (
                    <div className='flex justify-center flex-col items-center'>
                        <h3 className='text-blue-500 text-2xl font-semibold'>Question {currentQuestion + 1}</h3>
                        <p className='my-2 md:text-lg text-[18px] font-medium text-gray-800 '>{data[currentQuestion].question}</p>
                        <div className='flex md:flex-row flex-col md:justify-center gap-2 my-2'>
                            {data[currentQuestion].options.map((item, id) => (
                                <button
                                    key={id}
                                    onClick={() => handelAnswerCheck(item)}
                                    className='py-1 px-3 rounded-3xl bg-blue-400 text-white hover:bg-blue-500 duration-150 md:text-sm text-[13px] font-medium'>
                                    {item}
                                </button>
                            ))}
                        </div>
                        <p className='my-2 font-medium text-gray-600'>Time Left: <span className='font-semibold text-gray-900'>{timer}s</span></p>
                    </div>
                )}


        </div>
        </>
    )
}

export default Quiz