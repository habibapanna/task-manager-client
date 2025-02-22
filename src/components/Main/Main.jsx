import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';

const Main = () => {
    return (
        <div>
            <section className='max-w-7xl mx-auto'>
                <Navbar></Navbar>
           <div className='max-w-6xl mx-auto'>
           <Outlet></Outlet>
           </div>
            </section>
            
            
        </div>
    );
};

export default Main;