import { createContext, useState, useContext } from "react";
import Home from "../Home";
// export const LevelContext = createContext();

export const AssetContext = createContext();
const NavBar = () => {
  // const [value, setValue] = useState("Initial Value");
  // const updateValue = (newValue) => {
  //   setValue(newValue);
  // };
  const [data, setData] = useState();

  return (
    <div className="flex flex-col">
      <div className="m-10 my-2">
        <div className="flex flex-col md:flex-row items-center md:navbar bg-base-100 gap-y-2">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">Python Gurus</a>
          </div>
          <div className="flex-none gap-2">
            <form className="flex flex-center join">
              <input
                className=" input input-bordered rounded-md join-item"
                type="text"
                // value=
                // onChange=
                placeholder="Enter your product..."
              />
              <button
                className="btn join-item rounded-r-md bg-primary_clr text-neutral-100"
                type="submit"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        <AssetContext.Provider value={data}>
          <Home></Home>
        </AssetContext.Provider>
      </div>
    </div>
  );
};

export default NavBar;
