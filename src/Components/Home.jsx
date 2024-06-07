import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Data from "../Data";

export default function Home() {
  const [isError, setIsError] = useState("");
  const [data1, setData1] = useState([]);
  const [show, setShow] = useState(4);

  const getApiData = async () => {
    try {
      setData1(Data);
    } catch (error) {
      setIsError(error.message);
    }
  }; 

  useEffect(() => {
    getApiData();
    
  }, []);
 

  return (
    <>
      <div className="main-card"> 
        <div className="wrapper">
          <div className="parent-card">
            {data1.length > 0 ? (
              data1.slice(0, show).map((item, index) => (
                <div key={index} className="card">
                  <img src={item.image} alt={item.title} />
                  <h6>{item.type}</h6>
                  <NavLink className="nav-card" to={`/product/${item.id}`}>
                    {item.title}
                  </NavLink>
                  <h4>${item.price}</h4>
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
          {isError && <div>Error: {isError}</div>}
          
        </div>
      </div>
    </>
  );
}
