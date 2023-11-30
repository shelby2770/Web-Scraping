// import { useEffect, useState } from "react";
import DeviceShowcase from "./Components/DeviceShowcase";
import { useContext } from "react";
import { AssetContext } from "./Components/NavBar";


const Home = () => {
  const data = useContext(AssetContext);
  console.log("home e", data);
  console.log(typeof data, typeof data[0])
  console.log(Array.isArray(data), Array.isArray(data[0]))
  // console.log(typeof data[0])
  return (
    <div className="flex flex-col items-center my-10">
      {data.length ? (
        data == "Processing" ? (
          <div>Processing</div>
        ) : (
          // <div>Paisi</div>
          <DeviceShowcase></DeviceShowcase>
        )
      ) : (
        <div>No data exists</div>
      )}
      {/* {data.length == 0 ? (
        <div className="h-[60vh] my-5">
          <h2 className="xs:text-sm sm:text-lg md:text-3xl lg:text-5xl font-semibold"></h2>
        </div>
      ) : (
        <DeviceShowcase></DeviceShowcase>
      )} */}
    </div>
  );
};

export default Home;
