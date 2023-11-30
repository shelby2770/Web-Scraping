import { Link } from "react-router-dom";

const Device = ({ item }) => {
  const { shop_img, device_img, model, price, link } = item;
  console.log(link)
  return (
    <div className="bg-base-100 shadow-xl p-2 rounded-lg border-[1px]">
      <figure className="">
        <img className="w-full" src={device_img} alt={model} />
      </figure>
      <h3 className="py-2 text-sm font-semibold">{model}</h3>
      {/* <p className="h-20 text-gray-500 text-xs">{content.description}</p> */}

      <Link to={link} target="_blank" rel="noopener noreferrer">
        <button className="w-full btn rounded-md bg-[#2F80ED] text-white">
          Go to link
        </button>
      </Link>
    </div>
  );
};

export default Device;
