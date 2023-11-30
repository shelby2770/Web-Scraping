import Device from "./Device";
import { useContext, useState } from "react";
import { AssetContext } from "./NavBar";

const DeviceShowcase = () => {
  const [data, setData] = useState(useContext(AssetContext));
  // console.log("before:", data);

  // const handleSort = () => { 
  //   data.sort(
  //     (a, b) =>
  //       parseFloat(
  //         a["price"][a["price"].length - 1].toString().replace(/[^0-9.-]/g, "")
  //       ) -
  //       parseFloat(
  //         b["price"][b["price"].length - 1].toString().replace(/[^0-9.-]/g, "")
  //       )
  //   );
  //   <div>Sort hoise...</div>
  //   console.log("after:", data);
  // };
  return (
    <div className="flex flex-col gap-4">
     
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2 max-w-[90vw] mx-auto">
        {data.map((item, idx) => (
          <Device key={idx} item={item}></Device>
        ))}
      </div>
    </div>
  );
};

export default DeviceShowcase;
