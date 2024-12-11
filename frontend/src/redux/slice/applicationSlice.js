import { createSlice } from "@reduxjs/toolkit";


const applicationSlice=createSlice({
    name:'application',
    initialState:{
        theam:false,
        profile:{},
        projects:[],
        singleProject:{}
    },
    reducers:{
        setTheam:(state,action)=>{
            state.theam=action.payload
        },
        setProfile:(state,action)=>{
            state.profile=action.payload
        },
        setProjects:(state,action)=>{
            state.projects=action.payload
        },
        setSingleProject:(state,action)=>{
            state.singleProject=action.payload
        },
    }

})


export const {setTheam,setProfile,setProjects,setSingleProject}=applicationSlice.actions;
export default applicationSlice.reducer