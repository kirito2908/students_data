import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Header = () => {

    const navigate = useNavigate();

  return (
    <>
        <ul>
            <div className="options">
            {
                localStorage.getItem("isLogin") && 
                <li>
                    <Link to="/view" className='homeRoute'>Home</Link>
                </li>
            }
            {
                localStorage.getItem("isLogin") &&
                <li>
                    <Link to="/insert" className='insertRoute' >Insert</Link>
                </li>
            }
            </div>
            {
                localStorage.getItem("isLogin") &&
                <li>
                    <button type='button' className='logoutBtn' onClick={()=>{
                        localStorage.clear();
                        navigate("/");
                        }} >Log Out</button>
                </li>
            }
        </ul>
    </>
  )
}
