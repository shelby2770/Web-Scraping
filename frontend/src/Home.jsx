// import { useLoaderData } from "react-router-dom";
// import { useEffect, useState } from "react";
// import DeviceShowcase from "./Components/DeviceShowcase";
import { useContext } from 'react';
import { AssetContext } from './Components/NavBar';
const Home = () => {
  // const [inputValue, setInputValue] = useState("");
  // const [data, setData] = useState([]);
  // const [check, setCheck] = useState(false);
  // const handleSubmit = (event) => {
  //   event.preventDefault();

  //   console.log("Submitted:", inputValue);
  //   const user = { inputValue };
  //   fetch("http://localhost:3000/devices", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(user),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setData(data);
  //       console.log(data);
  //       setCheck(true);
  //     });
  //   setInputValue("");
  // };

  // const handleChange = (event) => {
  //   setInputValue(event.target.value);
  // };

  const gift= useContext(AssetContext)
  return (
    <div className="flex flex-col items-center my-10">
      {gift}
      {/* <form onSubmit={handleSubmit} className="flex flex-center join">
        <input
          className=" input input-bordered rounded-md join-item"
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter your product..."
        />
        <button
          className="btn join-item rounded-r-md bg-primary_clr text-neutral-100"
          type="submit"
        >
          Search
        </button>
      </form>
      {data.length==0 ? (
        <div className="h-[60vh] my-5">
          <h2 className="xs:text-sm sm:text-lg md:text-3xl lg:text-5xl font-semibold">
            No data exists
          </h2>
        </div>
      ) : (
        <DeviceShowcase
          data={data}
          check={check}
          setCheck={setCheck}
        ></DeviceShowcase>
      )} */}
    </div>
  );
};

export default Home;
