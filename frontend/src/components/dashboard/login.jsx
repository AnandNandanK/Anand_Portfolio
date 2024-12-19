import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';
import { login } from '../../services/operations/auth.js';



export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { token,user } = useSelector((state) => state.auth);

    console.log('USER IN LOGIN PAGE',user)

    const [inputFeild, setInputFeild] = useState({
        email: "",
        password: "",
    });

    const { email, password } = inputFeild

    const changeHandler = (e) => {
        setInputFeild({ ...inputFeild, [e.target.name]: e.target.value });
    };

    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(login(email, password, navigate))
    }


    useEffect(() => {
        if (token) {
            navigate("/dashboard")
        };
    }, [token]);



    return (
        <div className='h-screen w-screen bg-white'>
            <div className='max-w-[1100px] flex items-center justify-center mx-auto overflow-y-hidden px-3'>
                <form onSubmit={handleOnSubmit} className='w-[90%] lg:w-1/2 md:w-1/2 border border-gray-200 rounded-md p-4 my-10 bg-white bg-opacity-80'>
                    <h1 className='font-bold text-xl mb-5 w-full text-center'>Admin Login</h1>

                    <div className='flex flex-col gap-1 mt-2'>
                        <label className="font-semibold">Email</label>
                        <input
                            type='text'
                            placeholder='   Enter your email address'
                            className='border rounded-sm h-10 px-3'
                            name='email'
                            value={inputFeild.email}
                            onChange={changeHandler}
                        />
                    </div>

                    <div className='flex flex-col gap-1 mt-3 mb-3'>
                        <label className="font-semibold">Password</label>
                        <input
                            type='password'
                            placeholder='    Enter your Password'
                            className='border rounded-sm h-10 px-3'
                            name='password'
                            value={inputFeild.password}
                            onChange={changeHandler}
                        />
                    </div>


                    {/* {loading ? (
                        <Button className="w-full my-4" disabled>
                            <Loader2 className='mr-2 h-4 animate-spin my-4' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">Login</Button>
                    )} */}
                 

                    <Button type="submit" className="w-full my-4">Login</Button>


                </form>
            </div>
        </div>
    );
}