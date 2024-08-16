import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PacmanLoader } from "react-spinners";
import Table from 'react-bootstrap/Table';
import { useNavigate } from "react-router";
import { Header } from "./Header";
import axios from "axios";

const Home = () => {
  const { loading, error } = useSelector((state) => state);

  const navigate = useNavigate();

  const [allData, setAllData] = useState([]);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    axios.get('http://localhost:4000/get')
      .then(function (response) {
        setAllData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);
  
  useEffect(() => {
    console.log('allData:', allData); // This will log the updated state
    if (allData.length > 0) {
      const imageName = allData[allData.length - 1].image;
      axios.get(`http://localhost:4000/image/${imageName}`)
      .then(response => {
        setImageUrl(response.config.url);
      })
      .catch(error => {
        console.error(error);
      });
    }
  }, [allData]);


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

  const handleDelete = async (e) => {
    const id = e.target.getAttribute("data_id");

    axios.delete(`http://localhost:4000/delete/${id}`)
      .then(function () {
        alert("Data Deleted Succesfully");
        window.location.reload();
      })
      .catch(function () {
        alert("Data Deletion Failed");
      })

  }

  const handleEdit = (e) => {
    const id = e.target.getAttribute("data_id");

    navigate(`/edit/${id}`);
  }

  return (
    <>
      <Header />
      {
        localStorage.getItem("isLogin") &&
        <div className="container">
          <div className="showData">
            <Table responsive>
              <thead>
                <tr>
                  <th>Index</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Gender</th>
                  <th>Hobby</th>
                  <th>Division</th>
                  <th>Image</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  allData && allData.map((obj, index) => {
                    return (
                      <>
                        <tr>
                          <td>{index += 1}</td>
                          <td>{obj.name}</td>
                          <td>{obj.email}</td>
                          <td>{obj.mobile}</td>
                          <td>{obj.gender}</td>
                          <td>{obj.hobby}</td>
                          <td>{obj.division}</td>
                          <td>
                            <img src={imageUrl} alt={obj.image} />
                            {/* {obj.image} */}
                          </td>
                          <td>
                            <button type="button" data_id={obj._id} onClick={handleEdit}>Edit</button>
                            <button type="button" data_id={obj._id} onClick={handleDelete}>Delete</button>
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
      }

    </>
  );
};

export default Home;
