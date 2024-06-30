import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchData } from "./Store";
import { PacmanLoader } from "react-spinners";

const Home = () => {
  const { loading, data, error } = useSelector((state) => state);

  const dispatch = useDispatch();

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

  return (
    <>
      <div className="container">
        <div className="showData">
          <table border={2} cellSpacing={7}>
            <tr>
              <th>Index</th>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Password</th>
              <th>Hobby</th>
              <th>Gender</th>
            </tr>
            {data &&
              data.map((obj, index) => {
                return (
                  <>
                    <tr>
                      <td>{(index += 1)}</td>
                      <td>{obj.Id}</td>
                      <td>{obj.Name}</td>
                      <td>{obj.Email}</td>
                      <td>{obj.Password}</td>
                      <td>{obj.Hobby}</td>
                      <td>{obj.Gender}</td>
                    </tr>
                  </>
                );
              })}
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
