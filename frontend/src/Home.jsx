// import { useEffect, useState } from "react";
import DeviceShowcase from "./Components/DeviceShowcase";
import { useContext, useState } from "react";
import { AssetContext } from "./Components/NavBar";

const Home = () => {
  const data = useContext(AssetContext);
  const [check, setCheck]= useState(false)
  // console.log("home e", data);
  const handleSort = () => {
    data.sort(
      (a, b) =>
        parseFloat(
          a["price"][a["price"].length - 1].toString().replace(/[^0-9.-]/g, "")
        ) -
        parseFloat(
          b["price"][b["price"].length - 1].toString().replace(/[^0-9.-]/g, "")
        )
    );
    <div>Sort hoise...</div>;
    console.log("after:", data);
    setCheck(true)
  };
  return (
    <div className="flex flex-col items-center my-10">
      {data.length ? (
        data == "Processing" ? (
          <div>Processing</div>
        ) : (
          // <div>Paisi</div>
          <div className="flex flex-col gap-4">
            <div className="flex flex-row justify-between text-lg">
              <div>
                <h4 className="">Total found: {data.length}</h4>
              </div>
              <div>
                <button className="btn btn-sm btn-outline" onClick={handleSort}>
                  Sort by price
                </button>
              </div>
            </div>
            <DeviceShowcase></DeviceShowcase>
          </div>
        )
      ) : (
        <div>No data exists</div>
      )}
    </div>
  );
};

export default Home;
