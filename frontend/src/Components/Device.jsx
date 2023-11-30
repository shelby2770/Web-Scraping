import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Device = ({ item }) => {
  const { shop_img, device_img, model, price, link } = item;
  // console.log(model, model.length);
  return (
    <div className="bg-base-100 shadow-xl p-2 rounded-lg border-[1px]">
      <figure className="flex flex-col gap-2">
        <img className="w-full h-16" src={shop_img} alt="logo" />
        <img className="w-full h-60" src={device_img} alt={model} />
      </figure>

      <div className="h-20 text-center">
        <h3 className="py-2 text-xl font-semibold">
          {model.length <= 40 ? model : model.slice(0, 40) + "..."}
        </h3>
      </div>

      {price.length == 2 ? (
        <div className="flex flex-col items-center text-lg h-16">
          <div
            className="text-primary_clr"
            style={{ textDecoration: "line-through" }}
          >
            ৳{price[0]}
          </div>
          <div className="text-[#4ade80]">
            <span className="text-2xl">৳</span>
            {price[1]}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center h-16">
          <h5 className="text-primary_clr text-lg">
            <span className="text-2xl">৳</span>
            {price}
          </h5>
        </div>
      )}

      {/* <p className="h-20 text-gray-500 text-xs">{content.description}</p> */}

      <Link to={link} target="_blank" rel="noopener noreferrer">
        <button className="w-full btn rounded-md bg-[#2F80ED] text-white">
          <div className="flex flex-row justify-end gap-2 items-center">
            <FaShoppingCart />
            But Now
          </div>
        </button>
      </Link>
    </div>
  );
};

export default Device;
