"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface RegisterBody {
    email: string;
    name: string;
    phone?: string;
    passworld: string;
}

export default function RegisterForm() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<RegisterBody>();
    const router = useRouter()
    const onSubmit: SubmitHandler<RegisterBody> = (data: RegisterBody) => {
        console.log(data);
        axios.post("http://localhost:3000/api/auth/register", data)
            .then((res) => {
                reset();
                toast.success('login success!');
                setTimeout(() => {
                    router.push('/');
                }, 1500);
            })
            .catch((error) => {
                toast.error(error?.response.data.message);
            })
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-start mb-6 text-black">Register your account</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email address
                        </label>
                        <input
                            className={`shadow appearance-none border ${errors.email ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            id="email"
                            type="email"
                            placeholder="Email address"
                            {...register("email", {
                                required: {
                                    value: true,
                                    message: 'Email is required'
                                },
                                pattern: {
                                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                    message: 'Invalid email address',
                                },
                                minLength: {
                                    value: 20,
                                    message: 'minimun 20 chareketer'
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-500 text-xs italic mt-2">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Full name
                        </label>
                        <input
                            className={`shadow appearance-none border ${errors.name ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            id="name"
                            type="text"
                            placeholder="Full name"
                            {...register("name", {
                                required: {
                                    value: true,
                                    message: 'Full name is required'
                                },
                                minLength: {
                                    value: 5,
                                    message: 'minimun 5 chareketer'
                                },
                                pattern: {
                                    value: /^[^\d]*$/,
                                    message: 'Numbers are not allowed'
                                }

                            })}
                        />
                        {errors.name && <p className="text-red-500 text-xs italic mt-2">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
                            Phone number
                        </label>
                        <input
                            className={`shadow appearance-none border ${errors.phone ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                            id="phone"
                            type="text"
                            placeholder="Phone number"
                            {...register("phone")}
                        />
                        {errors.phone && <p className="text-red-500 text-xs italic mt-2">{errors.phone.message}</p>}
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className={`shadow appearance-none border ${errors.passworld ? 'border-red-500' : ''} rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline`}
                            id="password"
                            type="password"
                            placeholder="Password"
                            {...register("passworld", {
                                required: {
                                    value: true,
                                    message: 'Password is required'
                                },
                                minLength: {
                                    value: 10,
                                    message: 'minimun 10 chareketer'
                                }
                            })}
                        />
                        {errors.passworld && <p className="text-red-500 text-xs italic mt-2">{errors.passworld.message}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                            Register

                        </button>
                    </div>

                </form>

                <p className="text-center text-gray-600 text-sm mt-4">
                    Already have an account? <a href="/auth/login" className="text-blue-500 hover:text-blue-700">Sign In</a>
                </p>
                <ToastContainer />

            </div>
        </div>
    );
};
