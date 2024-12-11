
import React, { useEffect } from 'react'
import axios from 'axios'
import { heroendpoint } from '../services/apis.js';
import {useDispatch, useSelector} from 'react-redux'
import { setProfile } from '../redux/slice/applicationSlice.js';


const {GET_HERO_API}= heroendpoint


export default function UseGetHerosection() {

    const {user,token}=useSelector((state)=>state.auth)

    // console.log('USER INSIDE HERO-HOOK',user)
    // console.log('USER INSIDE HERO-HOOK',token)

    const dispatch=useDispatch()
    const {profile} = useSelector(store => store.application)
    // console.log('PRINTING USER PROFILE',profile)
    // console.log(token)

   

    useEffect(()=>{
        const getHeroSection= async()=>{
            try {
                console.log('INSIDE TRY CATCH IN HERO-HOOK')
                const res=await axios.get(GET_HERO_API,{
                    withCredentials:true,
                    headers: {
                        Authorization: `Bearer ${token}`, // Replace `token` with your actual JWT token
                      }
                }
            );

                if(res.data.success){
                    dispatch(setProfile(res.data))
                }
                
                console.log('HERO FETCHED SUCCESS',res);
                
            } catch (error) {
                console.log(error)
            }
        }
        getHeroSection();
    },[])
}