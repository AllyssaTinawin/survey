"use client"
import React, { useState } from 'react';
import { addResponse } from '../api/server';

const questions = [
    {
        question: "What is your age group?",
        options: ["Under 18", "18-24", "25-34", "35-44", "45-54", "55-64", "65 or above"],
        fieldName: "age"
    },
    {
        question: "What is your highest level of educational attainment?",
        options: ["High school or equivalent", "Some college/Associate degree", "Bachelor's degree", "Graduate/Professional degree"],
        fieldName: "education"
    },
    {
        question: "How many hours per day, on average, do you use electronic devices (smartphones, tablets, computers, TVs, etc.)?",
        options: ["Less than 1 hour", "1-2 hours", "2-4 hours", "More than 4 hours"],
    },
    {
        question: "How often do you use these devices in bed before attempting to sleep??",
        options: ["Never", "Rarely (1-2 times a week)", "Sometimes (3-4 times a week)", "Often (5-6 times a week)", "Every Night"],
    },
    {
        question: "Do you use any technology (smartphone, tablet, etc.) as an alarm clock in your bedroom??",
        options: ["Yes", "No"],
    },
    {
        question: "On average, how many hours of sleep do you get per night?",
        options: ["Less than 5 hours", "5-6 hours", "6-7 hours", "7-8 hours", "More than 8 hours"],
    },
    {
        question: "How would you rate the overall quality of your sleep?",
        options: ["Excellent", "Good", "Fair", "Poor", "Very Poor"],
    },
    {
        question: "How often do you find yourself checking or using electronic devices if you wake up during the night?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Every Night"],
    },
    {
        question: "Do you believe that using electronic devices before bedtime affects your ability to fall asleep?",
        options: ["Not at all", "Slightly", "Moderately", "Significantly", "I don't know"],
    },
    {
        question: "Do you use any apps or features on your electronic devices to help you relax or wind down before bedtime (e.g., meditation apps, relaxation music)?",
        options: ["Yes, regularly", "Yes, occasionally", "No"],
    },
    {
        question: "Do you use any sleep-tracking devices or apps (e.g., Fitbit, Sleep Cycle) to monitor your sleep patterns?",
        options: ["Yes", "No"],
    },
    {
        question: "When experiencing sleep difficulties, how often do you attempt to adjust your technology use habits (e.g., reducing screen time before bed, using blue light filters)?",
        options: ["Never", "Rarely", "Sometimes", "Often", "Always"],
    },
];

export default function Home() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        age: '',
        education: '',
        answers: [],
    });

    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAnswerSelection = (questionIndex, answer) => {
        const updatedAnswers = [...formData.answers];
        updatedAnswers[questionIndex] = { question: questions[questionIndex].question, answer };
        setFormData({ ...formData, answers: updatedAnswers });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (!formData.age || !formData.education) {
            setError('Age and education fields are required.');
            return;
        }
    
        setLoading(true);
        setError('');
    
        try {
            const res = await addResponse(formData);
    
            if (res && res.name) {
                console.log('Survey response saved:', res);
                setFormData({
                    name: '',
                    email: '',
                    age: '',
                    education: '',
                    answers: [],
                });
                setShowModal(true);
                setSubmitted(true);
            } else {
                console.error('Error saving survey response');
            }
        } catch (error) {
            if (error.message === 'Email already exists') {
                setError('This email has already been used to submit a survey.');
            } else {
                setError('An error occurred while submitting the survey.');
            }
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-orange-950 via-black to-orange-950 flex flex-col items-center justify-center text-white">
    {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
            <div className="relative">
                <div className="absolute inset-0 bg-gray-200 rounded-full"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="animate-spin rounded-full border-4 border-t-4 border-orange-500 h-12 w-12"></div>
                </div>
            </div>
        </div>
            )}
            <div className="bg-orange-200 p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-3xl font-extrabold mb-6 text-center text-transparent bg-gradient-to-r from-orange-500 to-orange-900 bg-clip-text">
                    Technology Usage and its Impact on Sleep Patterns
                </h1>
                <div className="text-center text-black mt-4">
                This survey complies with the Data Privacy Act of 2012 to protect your personal information.
                </div>

                {submitted ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold mb-4 text-orange-500 mt-10">Thank you! You have already submitted the survey.</h2>
                    </div>
                ) : (
                    <>
                        {error && (
                            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                                <div className="bg-slate-200 p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                                    <h2 className="text-2xl font-bold mb-4 text-red-500">Error</h2>
                                    <p className="text-black mb-4">{error}</p>
                                    <button
                                        className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:bg-red-700"
                                        onClick={() => setError('')}
                                    >
                                        Close
                                    </button>
                                </div>
                            </div>
                        )}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-black font-bold mb-2" htmlFor="name">
                                    Full Name 
                                </label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 bg-white-800 text-black"
                                    type="text"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    placeholder="Enter your full name here"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-black font-bold mb-2" htmlFor="email">
                                    Email
                                </label>
                                <input
                                    className="w-full px-3 py-2 border border-gray-700 rounded-lg focus:outline-none focus:border-green-500 bg-white-800 text-black"
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    placeholder="Enter your email address"
                                    required
                                />
                            </div>
                            {questions.map((question, index) => (
                                <div key={index} className="mb-4 p-4 border border-green-700 rounded-lg bg-slate-50">
                                    {question.fieldName ? (
                                        <fieldset>
                                            <legend className="block text-black font-bold mb-2">{question.question}</legend>
                                            {question.options.map((option, optionIndex) => (
                                                <div key={optionIndex} className="flex items-center mb-2">
                                                    <input
                                                        className="mr-2"
                                                        type="checkbox"
                                                        id={`${question.fieldName}-${optionIndex}`}
                                                        name={question.fieldName}
                                                        value={option}
                                                        onChange={handleInputChange}
                                                        checked={formData[question.fieldName] === option}
                                                        required
                                                    />
                                                    <label htmlFor={`${question.fieldName}-${optionIndex}`} className="text-black">{option}</label>
                                                </div>
                                            ))}
                                        </fieldset>
                                    ) : (
                                        <fieldset>
                                            <legend className="block text-black font-bold mb-2">{`${index + 1}. ${question.question}`}</legend>
                                            {question.options.map((option, optionIndex) => (
                                                <div key={optionIndex} className="flex items-center mb-2">
                                                    <input
                                                        className="mr-2"
                                                        type="checkbox"
                                                        id={`option-${index}-${optionIndex}`}
                                                        name={`question-${index}`}
                                                        value={option}
                                                        onChange={() => handleAnswerSelection(index, option)}
                                                        checked={formData.answers[index]?.answer === option}
                                                        required
                                                    />
                                                    <label htmlFor={`option-${index}-${optionIndex}`} className="text-black">{option}</label>
                                                </div>
                                            ))}
                                        </fieldset>
                                    )}
                                </div>
                            ))}
                            <div className="flex justify-right">
                                <button
                                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 focus:outline-none focus:bg-blue-700"
                                    type="submit"
                                >
                                    Submit Response
                                </button>
                            </div>
                        </form>
                    </>
                )}
                       </div>
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-slate-200 p-8 rounded-lg shadow-lg w-full max-w-md">
                        <h2 className="text-2xl font-bold mb-4 text-orange-500">Thank you for taking our survey!</h2>
                        <p className="text-black mb-4">Your survey response has been successfully submitted.</p>
                        <button
                            className="bg-red-500 text-white font-bold py-2 px-4 rounded hover:bg-red-700 focus:outline-none focus:bg-red-700"
                            onClick={() => setShowModal(false)}
                        >
                            X
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

