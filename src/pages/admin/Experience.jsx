import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createExperience, deleteExperience, experienceList, experienceListOne, updateExperience } from '../../redux/slice/experience';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AiOutlineDelete } from 'react-icons/ai';
import { BiEdit } from 'react-icons/bi';
import { useFormik } from 'formik';

const Experience = () => {
    const dispatch = useDispatch();

    const [isUpdateSuccess, setIsUpdateSuccess] = useState(false);
    const [isDeleteSuccess, setIsDeleteSuccess] = useState(false);


    const { experienceListData, experienceData } = useSelector((state) => state.experience);



    const addFormik = useFormik({
        initialValues: {
            title: '',
            companyName: '',
            description: '',
            joiningDate: '',
            leaveDate: ''
        },
        enableReinitialize: true,

        onSubmit: async (values, { resetForm }) => {
            try {
                await dispatch(createExperience(values));
                resetForm();
            } catch (error) {
                console.error(error);
            }
        },
    });



    const editFormik = useFormik({
        initialValues: {
            id: experienceData?._id || "",
            title: experienceData?.title || "",
            companyName: experienceData.companyName || '',
            description: experienceData.description || '',
            joiningDate: experienceData.joiningDate || '',
            leaveDate: experienceData.leaveDate || '',
        },
        enableReinitialize: true,

        onSubmit: async (values) => {
            const { id } = values;
            try {
                await dispatch(updateExperience(values));
                setIsUpdateSuccess((prev) => !prev);
            } catch (error) {
                console.error(error);
            }
        },
    });


    useEffect(() => {
        dispatch(experienceList(""));
    }, [dispatch, isUpdateSuccess, isDeleteSuccess]);


    const getExperience = (expID) => {
        dispatch(experienceListOne(expID));
    };

    const handleDelete = (id) => {
        dispatch(deleteExperience(id));
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
                {experienceListData?.data?.map((item, i) => {
                    return (
                        <div className="col-3" key={i}>
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex">
                                        <h5 className="card-title">{item.title}</h5>
                                        <img
                                            src={`${process.env.REACT_APP_API_BASE_URL}${item.techLogo}`}
                                            alt={item.title}
                                            style={{ width: 50 }}
                                        />
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
                                    <p className="card-text">{item.totalExp}</p>
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
                                Add New Experience
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
                                        name="title"
                                        placeholder="title"
                                        onChange={addFormik.handleChange}
                                        value={addFormik.values.title}
                                    />
                                    <label htmlFor="floatingInput">Title</label>
                                </div>

                                <div className="form-floating  mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Organization"
                                        name="companyName"
                                        onChange={addFormik.handleChange}
                                        value={addFormik.values.companyName}
                                    />
                                    <label htmlFor="floatingPassword">Organization</label>
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
                                        placeholder="Joining Date"
                                        name="joiningDate"
                                        onChange={addFormik.handleChange}
                                        value={addFormik.values.joiningDate}
                                    />
                                    <label htmlFor="floatingPassword">Joining Date</label>
                                </div>

                                <div className="form-floating  mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Leave Date"
                                        name="leaveDate"
                                        onChange={addFormik.handleChange}
                                        value={addFormik.values.leaveDate}
                                    />
                                    <label htmlFor="floatingPassword">Leave Date</label>
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
                                Edit Skill
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
                                        value={experienceData?._id}
                                        disabled
                                    />
                                    <label htmlFor="floatingInput">ID</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="title"
                                        placeholder="title"
                                        onChange={editFormik.handleChange}
                                        value={editFormik.values.title}
                                    />
                                    <label htmlFor="floatingInput">Title</label>
                                </div>

                                <div className="form-floating  mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Organization"
                                        name="companyName"
                                        onChange={editFormik.handleChange}
                                        value={editFormik.values.companyName}
                                    />
                                    <label htmlFor="floatingPassword">Organization</label>
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
                                        placeholder="Joining Date"
                                        name="joiningDate"
                                        onChange={editFormik.handleChange}
                                        value={editFormik.values.joiningDate}
                                    />
                                    <label htmlFor="floatingPassword">Joining Date</label>
                                </div>

                                <div className="form-floating  mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Leave Date"
                                        name="leaveDate"
                                        onChange={editFormik.handleChange}
                                        value={editFormik.values.leaveDate}
                                    />
                                    <label htmlFor="floatingPassword">Leave Date</label>
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

export default Experience