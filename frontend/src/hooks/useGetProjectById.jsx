import React from 'react';
import { useDispatch } from 'react-redux';
import { projectEndpoint } from '../services/apis';
import { useEffect } from 'react';
import axios from 'axios'
import { setSingleProject } from '../redux/slice/applicationSlice';

const {GET_PROJECT_BY_ID_API} = projectEndpoint;

const UseGetProjectById = (projectId) => {

    const dispatch = useDispatch()

    useEffect(() => {
        const fetchProject= async () => {
            try {
                const res = await axios.get(`${GET_PROJECT_BY_ID_API}/${projectId}`, {
                    withCredentials: true
                });


                if (res.data.success) {
                    console.log('PROJECT BY ID FETCHED SUCCESS', res.data.data);
                    dispatch(setSingleProject(res.data.data));
                }

            } catch (error) {
                console.log(error)
            }
        }
        fetchProject();
    }, [projectId, dispatch])

}


export default UseGetProjectById;
