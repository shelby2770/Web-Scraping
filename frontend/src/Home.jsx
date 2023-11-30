import swal from "sweetalert";
import { FidgetSpinner } from "react-loader-spinner";
import DeviceShowcase from "./Components/DeviceShowcase";
import { useContext, useState } from "react";
import { AssetContext } from "./Components/NavBar";

const Home = () => {
  const data = useContext(AssetContext);
  const [check, setCheck] = useState(false);
  const handleSort = () => {
    if (check) {
      swal("Already sorted!", "", "error");
    } else {
      data.sort(
        (a, b) =>
          parseFloat(
            a["price"][a["price"].length - 1]
              .toString()
              .replace(/[^0-9.-]/g, "")
          ) -
          parseFloat(
            b["price"][b["price"].length - 1]
              .toString()
              .replace(/[^0-9.-]/g, "")
          )
      );
      <div>Sort hoise...</div>;
      setCheck(true);
    }
  };
  return (
    <div className="flex flex-col items-center my-10">
      {data.length ? (
        data == "Processing" ? (
          <div className="h-[20vh] md:h-[40vh] lg:h-[50vh]">
            <FidgetSpinner
              visible={true}
              height="200"
              width="200"
              ariaLabel="dna-loading"
              wrapperStyle={{}}
              wrapperClass="dna-wrapper"
              ballColors={["#ff0000", "#00ff00", "#0000ff"]}
              backgroundColor="#F4442E"
            />
          </div>
        ) : (
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
        <div className="text-3xl md:text-5xl lg:text-7xl flex flex-row items-center justify-center h-[20vh] md:h-[40vh] lg:h-[50vh]">
          No data exists
        </div>
      )}
    </div>
  );
};

export default Home;
