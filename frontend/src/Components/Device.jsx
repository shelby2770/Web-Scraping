const Device = ({ item }) => {
  const [img, model, price] = item;
  return (
    <div className="bg-base-100 shadow-xl p-2 rounded-lg border-[1px]">
      <figure className="">
        <img className="w-full" src={img} alt="" />
      </figure>
      <h3 className="py-2 text-sm font-semibold">{model}</h3>
      {/* <p className="h-20 text-gray-500 text-xs">{content.description}</p> */}
      
      <button
        className="w-full btn rounded-md bg-[#2F80ED] text-white"
      >
        Go to link
      </button>
    </div>
  );
};

export default Device;
