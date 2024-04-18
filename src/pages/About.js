import React, { useEffect, } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { userAbout } from "../redux/slice/userSlice";

const About = () => {

    const { userData: { data } } = useSelector((state) => state.user);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(userAbout(""));
    }, [dispatch]);

    return (
        <div className='about-me' id='aboutUs' >
            <div className='container'>
                <div className='row  text-center'>
                    <h1 className='fw-bolder pb-5'>Know Me More</h1>
                </div>
                <div className='row fs-4'>
                    <div className='col-sm-8'>
                        <span className='fs-2'>Hi, I'm {''}
                            <span className='fw-bold border-bottom border-3 border-warning'>{data && data[0]?.full_name}</span>
                        </span>
                        <p> {data && data[0]?.aboutUs} </p>
                    </div>
                    <div className='col-sm-4 text-center '>
                        <span className="experience rounded-circle wow heartBeat bg-warning" >{data && data[0]?.totalExp}</span>
                        <p className='fs-2 fw-bold mt-3' >Years of Experiance</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default About