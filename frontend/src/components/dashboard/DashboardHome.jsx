import React from 'react';
import Dashboard from './dashboard';

const DashboardHome = () => {
    return (
        <div className='bg-white w-screen h-screen'>
            <Dashboard/>
            <div className='max-w-[1200px] mx-auto'>
                <h1 className='text-4xl text-center font-sans font-bold'>Anand Portfolio</h1>
            </div>

            <div className='h-full w-full flex justify-center items-center text-7xl font-semibold'>
                <h1 className='text-blue-400'><span className='text-orange-400'>Welcome</span> Back Admin </h1>

            </div>
            
        </div>
    );
}

export default DashboardHome;
