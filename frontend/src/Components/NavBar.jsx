import { createContext, useState } from "react";
import Home from "../Home";
// export const LevelContext = createContext();

export const AssetContext = createContext();
const NavBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  // const [check, setCheck] =useState(false)
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Submitted:", inputValue);
    // setCheck(true)
    const user = { inputValue };
    fetch("http://localhost:3000/devices", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log(JSON.stringify(data).length);
      });
    setInputValue("");
  };

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="flex flex-col">
      <div className="m-10 my-2">
        <div className="flex flex-col md:flex-row items-center md:navbar bg-base-100 gap-y-2">
          <div className="flex-1">
            <a className="btn btn-ghost text-xl">Python Gurus</a>
          </div>
          <div className="flex-none gap-2">
            <form onSubmit={handleSubmit} className="flex flex-center join">
              <input
                className=" input input-bordered rounded-md join-item"
                type="text"
                value={inputValue}
                onChange={handleChange}
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

        {/* {!check && <Home></Home>} */}
      </div>
    </div>
  );
};

export default NavBar;
