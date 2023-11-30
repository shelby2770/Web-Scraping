import Device from "./Device";
import { useContext } from "react";
import { AssetContext } from "./NavBar";

const DeviceShowcase = () => {
  const data = useContext(AssetContext);
  console.log("before:",data)
  data.sort(
    (a, b) =>
      parseFloat(a.toString().replace(/[^0-9.-]/g, "")) -
      parseFloat(b.toString().replace(/[^0-9.-]/g, ""))
  );
  console.log("after:",data)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 max-w-[90vw] mx-auto">
      {data.map((item, idx) => (
        <Device key={idx} item={item}></Device>
      ))}
    </div>
  );
};

export default DeviceShowcase;
