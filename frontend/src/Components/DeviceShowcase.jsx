import Device from "./Device";

const DeviceShowcase = ({ data, check, setCheck }) => {
  setCheck(false);
  const str = data.stdout;
  const arr = str.split("\n");
  const arr2 = [];
  arr.map((item) => {
    const arr3 = item.split("|||");
    if (arr3.length == 3) arr2.push(arr3);
  });

  console.log(arr2);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-2 max-w-[90vw] mx-auto">
      {arr2.map((item) => (
        <Device key={item[0]} item={item}></Device>
      ))}
    </div>
  );
};

export default DeviceShowcase;
