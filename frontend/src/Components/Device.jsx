import { Link } from "react-router-dom";

const Device = ({ item }) => {
  const { shop_img, device_img, model, price, link } = item;
  console.log(link);
  return (
    <div className="bg-base-100 shadow-xl p-2 rounded-lg border-[1px]">
      <figure className="">
        <img className="w-full" src={device_img} alt={model} />
      </figure>

      <div className="h-20 text-center">
        <h3 className="py-2 text-xl font-semibold">
          {model.length <= 50 ? model : model.slice(0, 50) + "..."}
        </h3>
      </div>

      {price.length == 2 ? (
        <>
          <div
            className="text-primary_clr"
            style={{ textDecoration: "line-through" }}
          >
            ৳ {price[0]}
          </div>
          <div>৳ {price[1]}</div>
        </>
      ) : (
        <h5
          className="text-primary_clr text-lg"
        >
          <span className="text-2xl">৳</span>{price}
        </h5>
      )}

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
