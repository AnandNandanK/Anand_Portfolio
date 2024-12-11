
import React, { useEffect } from 'react'
import axios from 'axios'
import { projectEndpoint } from '../services/apis.js';
import {useDispatch, useSelector} from 'react-redux'
import { setProjects } from '../redux/slice/applicationSlice.js';


const {GET_PROJECT_API}= projectEndpoint


export default function UseGetAllProjects() {

    const {user,token}=useSelector((state)=>state.auth)

    // console.log('USER INSIDE HERO-HOOK',user)
    // console.log('USER INSIDE HERO-HOOK',token)

    const dispatch=useDispatch()
    // const {projects} = useSelector(store => store.application)
    // console.log('PRINTING USER PROFILE',profile)
    // console.log(token)

   

    useEffect(()=>{
        const getAllProjects= async()=>{
            try {
                console.log('INSIDE TRY CATCH IN HERO-HOOK')
                const res=await axios.get(GET_PROJECT_API,{
                    withCredentials:true,
                    headers: {
                        Authorization: `Bearer ${token}`, // Replace `token` with your actual JWT token
                      }
                }
            );

                if(res.data.success){
                    dispatch(setProjects(res.data))
                }
                
                console.log('HERO FETCHED SUCCESS',res.data.data);
                
            } catch (error) {
                console.log(error)
            }
        }
        getAllProjects();
    },[])
}