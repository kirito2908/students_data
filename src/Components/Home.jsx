import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteData, FetchData } from "./Store";
import { PacmanLoader } from "react-spinners";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router";

const Home = () => {
  const { loading, data, error } = useSelector((state) => state);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(FetchData());
  }, [dispatch]);

  if (loading) {
    return (
      <>
        <div className="loading">
          <PacmanLoader color="orange" size={100} speedMultiplier={1} />
        </div>
      </>
    );
  }

  if (error != null) {
    return (
      <>
        <div className="error">
          <h1>{error}</h1>
        </div>
      </>
    );
  }

  const handleDelete = (e) => {
    const id = e.target.getAttribute("data_id");

    var params = new FormData();

    params.set("Id", id);

    dispatch(DeleteData(params));

    window.location.reload(false);
  }

  const handleEdit = (e) => {
    const id = e.target.getAttribute("data_id");
    
    navigate(`/edit/${id}`);
  }

  return (
    <>
      <div className="container">
        <div className="showData">
        <Table responsive>
      <thead>
        <tr>
          <th>Index</th>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Password</th>
          <th>Gender</th>
          <th>Hobby</th>
          <th>Division</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          data && data.map((obj, index) => {
            return (
              <>
                <tr>
                  <td>{index += 1}</td>
                  <td>{obj.Id}</td>
                  <td>{obj.Name}</td>
                  <td>{obj.Email}</td>
                  <td>{obj.Password}</td>
                  <td>{obj.Gender}</td>
                  <td>{obj.Hobby}</td>
                  <td>{obj.Division}</td>
                  <td>
                    <button type="button" data_id={obj.Id} onClick={handleEdit}>Edit</button>
                    <button type="button" data_id={obj.Id} onClick={handleDelete}>Delete</button>
                  </td>
                </tr>
              </>
            )
          })
        }
      </tbody>
    </Table>
        </div>
      </div>
    </>
  );
};

export default Home;
