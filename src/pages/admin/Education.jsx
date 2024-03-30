import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createExperience, deleteExperience, experienceList, experienceListOne, updateExperience } from '../../redux/slice/experience';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useFormik } from 'formik';
import { createEducation, deleteEducation, educationsList, eductionListOne, updateEducation } from '../../redux/slice/resumeSlice.js';

const EducationPage = () => {
    const dispatch = useDispatch();

    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);


    const { userEducationListData, userEducationData } = useSelector((state) => state.resume);



    const addFormik = useFormik({
        initialValues: {
            program: '',
            institute: '',
            description: '',
            startDate: '',
            endDate: '',

        },
        enableReinitialize: true,

        onSubmit: async (values, { resetForm }) => {
            try {
                await dispatch(createEducation(values));
                resetForm();
                setIsUpdateSuccess((prev) => !prev);
            } catch (error) {
                console.error(error);
            }
        },
    });



    const editFormik = useFormik({
        initialValues: {
            id: userEducationData?._id || "",
            program: userEducationData?.program || "",
            institute: userEducationData.institute || '',
            description: userEducationData.description || '',
            startDate: userEducationData.startDate || '',
            endDate: userEducationData.endDate || '',
        },
        enableReinitialize: true,

        onSubmit: async (values) => {
            const { id } = values;
            try {
                await dispatch(updateEducation(values));
                setIsUpdateSuccess((prev) => !prev);
            } catch (error) {
                console.error(error);
            }
        },
    });


    useEffect(() => {
        dispatch(educationsList(""));
    }, [dispatch, isUpdateSuccess, isDeleteSuccess]);


    const getExperience = (expID) => {
        dispatch(eductionListOne(expID));
    };

    const handleDelete = (id) => {
        dispatch(deleteEducation(id));
        setIsDeleteSuccess((prev) => !prev);
    };

    return (
        <div className="container py-5">
            <div className="row">
                <div className="col-12">
                    <button
                        type="button"
                        className="btn btn-primary mx-4"
                        data-bs-toggle="modal"
                        data-bs-target="#addSkillBtn"
                    >
                        <IoMdAddCircleOutline />
                    </button>
                </div>
            </div>
            <div className="row">
                {userEducationListData?.data?.map((item, i) => {
                    return (
                        <div className="col-3" key={i}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <p className="card-title">Program : {item.program}</p>
                                        <p className="card-title">Institute : {item.institute}</p>
                                        <p className="card-title">Description : {item.description}</p>

                                        
                                        {/* Button trigger modal */}
                                        <button
                                            type="button"
                                            className="btn btn-primary mx-4"
                                            data-bs-toggle="modal"
                                            data-bs-target="#staticBackdrop"
                                            onClick={() => {
                                                getExperience(item._id);
                                            }}
                                        >
                                            <BiEdit />
                                        </button>

                                        <button
                                            type="button"
                                            className="btn btn-danger mx-4"
                                            onClick={() => {
                                                handleDelete(item._id);
                                            }}
                                        >
                                            <AiOutlineDelete />
                                        </button>
                                    </div>
                                    <p className="card-text">Start date : {item.startDate}</p>
                                    <p className="card-text">End date : {item.endDate}</p>

                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>


            {/*Add skill Modal */}
            <div
                className="modal fade"
                id="addSkillBtn"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="addSkillBtnLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addSkillBtnLabel">
                                Add New Education
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>

                        {/* Add new Skill form */}

                        <form className="skill-form" onSubmit={addFormik.handleSubmit}>
                            <div className="modal-body">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="program"
                                        placeholder="Program"
                                        onChange={addFormik.handleChange}
                                        value={addFormik.values.program}
                                    />
                                    <label htmlFor="floatingInput">Program</label>
                                </div>

                                <div className="form-floating  mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Institute"
                                        name="institute"
                                        onChange={addFormik.handleChange}
                                        value={addFormik.values.institute}
                                    />
                                    <label htmlFor="floatingPassword">Institute</label>
                                </div>

                                <div className="form-floating  mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Description"
                                        name="description"
                                        onChange={addFormik.handleChange}
                                        value={addFormik.values.description}
                                    />
                                    <label htmlFor="floatingPassword">Description</label>
                                </div>

                                <div className="form-floating  mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Start Date"
                                        name="startDate"
                                        onChange={addFormik.handleChange}
                                        value={addFormik.values.startDate}
                                    />
                                    <label htmlFor="floatingPassword">Start Date</label>
                                </div>

                                <div className="form-floating  mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="End Date"
                                        name="endDate"
                                        onChange={addFormik.handleChange}
                                        value={addFormik.values.endDate}
                                    />
                                    <label htmlFor="floatingPassword">End Date</label>
                                </div>


                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Submit
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* Edit Modal */}
            <div
                className="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabIndex={-1}
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropLabel">
                                Edit Education
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                            />
                        </div>
                        {/* Edit Skill form */}
                        <form className="skill-form" onSubmit={editFormik.handleSubmit}>
                            <div className="modal-body">
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="ID"
                                        value={userEducationData?._id}
                                        disabled
                                    />
                                    <label htmlFor="floatingInput">ID</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="program"
                                        placeholder="program"
                                        onChange={editFormik.handleChange}
                                        value={editFormik.values.program}
                                    />
                                    <label htmlFor="floatingInput">Program</label>
                                </div>

                                <div className="form-floating  mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Institute"
                                        name="institute"
                                        onChange={editFormik.handleChange}
                                        value={editFormik.values.institute}
                                    />
                                    <label htmlFor="floatingPassword">Institute</label>
                                </div>

                                <div className="form-floating  mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Description"
                                        name="description"
                                        onChange={editFormik.handleChange}
                                        value={editFormik.values.description}
                                    />
                                    <label htmlFor="floatingPassword">Description</label>
                                </div>

                                <div className="form-floating  mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Start Date"
                                        name="startDate"
                                        onChange={editFormik.handleChange}
                                        value={editFormik.values.startDate}
                                    />
                                    <label htmlFor="floatingPassword">Start Date</label>
                                </div>

                                <div className="form-floating  mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="End Date"
                                        name="endDate"
                                        onChange={editFormik.handleChange}
                                        value={editFormik.values.endDate}
                                    />
                                    <label htmlFor="floatingPassword">End Date</label>
                                </div>

                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        data-bs-dismiss="modal"
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default EducationPage