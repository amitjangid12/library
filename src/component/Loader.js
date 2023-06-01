import React from 'react';
import './Loader.scss'
const Loader = () => {
    return (
        <div className="loader" style={{ minHeight: '100vh', background:'black', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>
            <h2 style={{ display: 'flex', alignItems: 'center' }}>Loading
                <div className='loader-dot'></div>
                <div className='loader-dot'></div>
                <div className='loader-dot'></div>
            </h2>
        </div>
    );
};

export default Loader;
