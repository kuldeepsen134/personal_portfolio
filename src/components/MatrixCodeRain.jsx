import React from 'react';
import './AnimationExample.css'; // Assuming your CSS file is named 'styles.css'

const AnimationExample = () => {
    return (
        <div className='animation-example'>
            {[...Array(8)].map((_, index) => (
                <div key={index} className={`item ${index > 3 ? '-type2' : ''}`}>
                    <div className='line'></div>
                    <div className='dot'></div>
                    <div className='circle'></div>
                </div>
            ))}
            <div className='center'>
                <div className='circle'></div>
                <div className='circle'></div>
                <div className='circle'></div>
            </div>
        </div>
    );
};

export default AnimationExample;
