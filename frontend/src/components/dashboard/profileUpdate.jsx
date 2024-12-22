
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Dashboard from './dashboard';
import { useNavigate } from 'react-router-dom';
import UseGetHerosection from '../../hooks/useGetHerosection';
import { useSelector,useDispatch } from 'react-redux';
import { updateProfile } from '../../services/operations/auth';
import { Loader2 } from 'lucide-react';





const ProfileUpdate = () => {

    UseGetHerosection();

    const dispatch=useDispatch();


    const nevigate=useNavigate();

    const {token,loading} = useSelector((state)=>state.auth)
    // console.log('LOADING : ', loading)
   

    const {profile} = useSelector(store => store.application)

    // console.log(profile)

    //FORM START DATA
        const [inputFeild, setInputFeild] = useState({
            title: profile?.title,
            description: profile?.myself,
        });

        const {title,description}=inputFeild

        const changeHandler = (e) => {
            setInputFeild({ ...inputFeild, [e.target.name]: e.target.value });
        };
    //FORM DATA END


    const handleOnSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfile(title,description,token))
        
    }

   
    // console.log(profile)


    return (

        <div className='h-screen w-screen bg-white flex items-center justify-center mx-auto overflow-y-hidden px-3'>
            <Dashboard/>
            <form onSubmit={handleOnSubmit} className='w-[90%] lg:w-1/2 md:w-1/2 border border-gray-200 rounded-md p-4 my-10 bg-white bg-opacity-80'>
                <h1 className='font-bold text-xl mb-5 w-full text-center'>Update Profile </h1>

                <div className='flex flex-col gap-1 mt-2'>
                    <label className="font-semibold">Title</label>
                    <input
                        type='text'
                        placeholder='Enter your Title'
                        className='border rounded-sm h-10 px-3'
                        name='title'
                        value={inputFeild.title}
                        onChange={changeHandler}
                    />
                </div>

                <div className='flex flex-col gap-1 mt-2'>
                    <label className="font-semibold">Enter Descripton</label>
                    <textarea
                        type='text'
                        placeholder='Enter your Description'
                        className='border rounded-sm h-32 px-3 '
                        name='description'
                        value={inputFeild.description}
                        onChange={changeHandler}
                    />
                </div>


                {loading ? (
                        <Button className="w-full my-4" disabled>
                            <Loader2 className='mr-2 h-4 animate-spin my-4' />
                            Please wait
                        </Button>
                    ) : (
                        <Button type="submit" className="w-full my-4">Update</Button>
                    )}


            </form>
        </div>

    );
}

export default ProfileUpdate;
