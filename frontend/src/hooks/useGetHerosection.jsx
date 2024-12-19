
import React, { useEffect } from 'react'
import axios from 'axios'
import { heroendpoint } from '../services/apis.js';
import {useDispatch, useSelector} from 'react-redux'
import { setProfile } from '../redux/slice/applicationSlice.js';
import { setLoading, setToken } from '../redux/slice/authSlice.js';
import { toast } from 'sonner';


const {GET_HERO_API}= heroendpoint


export default function UseGetHerosection() {

    const {user,token}=useSelector((state)=>state.auth)

    // console.log('USER INSIDE HERO-HOOK',user)
    // console.log('USER INSIDE HERO-HOOK',token)

    const dispatch=useDispatch()
    const {profile} = useSelector(store => store.application)
    // console.log('PRINTING USER PROFILE',profile)
    // console.log(token)

    const {loading} = useSelector((state)=>state.auth)

   

    useEffect(()=>{
        const getHeroSection= async()=>{
            try {
                dispatch(setLoading(false))
                console.log('INSIDE TRY CATCH IN HERO-HOOK')
                const res=await axios.get(GET_HERO_API,{
                    withCredentials:true,
                    headers: {
                        Authorization: `Bearer ${token}`, // Replace `token` with your actual JWT token
                      }
                }
            );

            console.log('HERO SECTION HOOK DATA....',res.data.data)

                if(res.data.success){
                    dispatch(setProfile(res.data.data))
                   
                }
                
                console.log('HERO FETCHED SUCCESS',res);
                
            } catch (error) {

                if(error.response.data.success==false){
                    dispatch(setToken(null));
                }

                
               
                console.log(error)
                toast.error(error.response.data.message)
            }
        }
        getHeroSection();
    },[])
}