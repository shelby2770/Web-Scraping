import Device from "./Device";
import { useContext } from "react";
import { AssetContext } from "./NavBar";

const DeviceShowcase = () => {
  const data = useContext(AssetContext);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-2 max-w-[90vw] mx-auto">
      {data.map((item, idx) => (
        <Device key={idx} item={item}></Device>
      ))}
    </div>
  );
};

export default DeviceShowcase;
