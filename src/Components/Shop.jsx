import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Data from "../Data";

const Shop = () => {
  const [isError, setIsError] = useState("");
  const [data1, setData1] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [show, setShow] = useState(8);

  useEffect(() => {
    const getApiData = async () => {
      try {
        setData1(Data);
        setInitialData(Data);
      } catch (error) {
        setIsError(error.message);
      }
    };
    getApiData();
  }, []);

  const showMore = () => {
    setShow((prevShow) => prevShow + 8);
  };

  const sortLowToHigh = (data) => data.sort((a, b) => a.price - b.price);
  const sortHighToLow = (data) => data.sort((a, b) => b.price - a.price);
  const filterPartyDress = (data) => data.filter((item) => item.title === "Party Dress");
  const filterCasual = (data) => data.filter((item) => item.type === "Casual");

  const handleSort = (event) => {
    const sortType = event.target.value;
    let sortedData = [...initialData]; 

    switch (sortType) {
      case "LowtoHigh":
        sortedData = sortLowToHigh(sortedData);
        break;
      case "HightoLow":
        sortedData = sortHighToLow(sortedData);
        break;
      case "Party":
        sortedData = filterPartyDress(sortedData);
        break;
      case "Casual":
        sortedData = filterCasual(sortedData);
        break;
      case "Default":
      default:
        sortedData = [...initialData];
        break;
    }

    setData1(sortedData);
  };

  return (
    <>
      <div className="filter">
        <div className="wrapper">
          <select name="sort" id="sort" onChange={handleSort}>
            <option value="Default">Default</option>
            <option value="LowtoHigh">Low to high</option>
            <option value="HightoLow">High to low</option>
            <option value="Party">Party Dress</option>
            <option value="Casual">Casual</option>
          </select>
        </div>
      </div>
      <div className="main-card">
        <div className="wrapper">
          <div className="parent-card">
            {data1.length > 0 ? (
              data1.slice(0, show).map((item) => (
                <div key={item.id} className="card">
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
          <div className="show-btn">
            {show < data1.length && (
              <input
                type="button"
                value="Show more"
                className="show-more"
                onClick={showMore}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
