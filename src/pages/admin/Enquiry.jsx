import React, { useEffect } from "react";
import { enquiryList } from "../../redux/slice/contactusSlice";
import { useDispatch, useSelector } from "react-redux";

const EnquiryPage = () => {
  const dispatch = useDispatch();
  const { enquiryListData } = useSelector((state) => state.contactUs);

  useEffect(() => {
    dispatch(enquiryList());
  }, [dispatch]);

  return (
    <div className="container py-5">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Enquiry ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Mobile</th>
            <th scope="col">Message</th>
          </tr>
        </thead>
        <tbody>
          {enquiryListData?.data?.map((item, i) => {
            return (
              <tr key={i}>
                <th scope="row">{item._id}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.mobile}</td>
                <td>{item.message}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EnquiryPage;
