import React, { useEffect, } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { userAbout } from "../redux/slice/userSlice";

const About = () => {

    const {
        userData: { data },
    } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAbout(""));
    }, [dispatch]);

    return (
        
        <div className='about-me'>
            <div className='container'>
                <div className='text-center mt-4'>
                    <span className='bg-warning text-center fs-4'>About Me </span>
                </div>
                <div className='row  text-center'>
                    <h2 className='fw-bolder my-4'>Know Me More</h2>
                </div>
                <div className='row fs-4'>
                    <div className='col-8'>
                        <span className='fs-2'>Hi, I'm {''}
                            <span className='fw-bold border-bottom border-3 border-warning'>{data && data[0]?.full_name}</span>
                        </span>
                        <p> {data && data[0]?.aboutUs} </p>
                    </div>
                    <div className='col-4 text-center '>
                        <span class="experience rounded-circle wow heartBeat bg-warning" >22</span>
                        <p className='fs-2 fw-bold' >Years of Experiance</p>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-3'>
                        <span className='fs-5 fw-lighter'>Name:</span>
                        <p className='fw-bold'>{data && data[0]?.full_name}</p>
                    </div>
                    <div className='col-3'>
                        <span className='fs-5 fw-lighter'>Email:</span>
                        <p className='fw-bold'>{data && data[0]?.email}</p>
                    </div>
                    <div className='col-3'>
                        <span className='fs-5 fw-lighter'>Mobile:</span>
                        <p className='fw-bold'> {data && data[0]?.mobile}</p>
                    </div>
                    <div className='col-3'>
                        <span className='fs-5 fw-lighter'>Date of birth:</span>
                        <p className='fw-bold'>11 November, 1987</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About