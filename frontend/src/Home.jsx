// import { useEffect, useState } from "react";
// import DeviceShowcase from "./Components/DeviceShowcase";
import { useContext } from "react";
import { AssetContext } from "./Components/NavBar";
const Home = () => {
  const data = useContext(AssetContext);
  console.log("home e",data)
  return (
    <div className="flex flex-col items-center my-10">
      {data.length ? <div>Paisi</div> : <div>No data exists</div>}
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
