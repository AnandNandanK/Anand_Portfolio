import React from 'react';
import Dashboard from './dashboard';

const DashboardHome = () => {
    return (
        <div className='bg-white w-full '>
            <Dashboard/>
            <div className='max-w-[1200px]'>
                <h1 className='text-5xl text-center m'>Home</h1>
            </div>
            
        </div>
    );
}

export default DashboardHome;
