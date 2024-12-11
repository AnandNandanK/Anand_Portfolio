
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import Dashboard from './dashboard';
import { useNavigate } from 'react-router-dom';
import CreateProjects from './CreateProjects';
import { useSelector } from 'react-redux';




const UpdateProject = () => {

    return (

        <div className='max-w-[1100px] flex items-center justify-center mx-auto overflow-y-hidden px-3'>
            <Dashboard/>
            <CreateProjects/> 
        </div>

    );
}

export default UpdateProject;
