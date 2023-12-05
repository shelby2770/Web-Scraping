import swal from "sweetalert";
import { createContext, useState } from "react";
import Home from "../Home";

export const AssetContext = createContext();
const NavBar = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);
  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log("Submitted:", inputValue);
    if (!inputValue) {
      swal("Input field empty!", "", "error");
    } else {
      setData("Processing");
      let temp_data = [];
      fetch("http://127.0.0.1:5000/spider", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(inputValue),
      })
        .then((res) => res.json())
        .then((data) => {
          const new_data = JSON.parse(data);
          temp_data = new_data;

          let kry_links = [];
          fetch("http://127.0.0.1:5000/kry_links", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(inputValue),
          })
            .then((res) => res.json())
            .then((data) => {
              kry_links = JSON.parse(data);
              let count = 0;
              kry_links.map((link) => {
                fetch("http://127.0.0.1:5000/kry_spider", {
                  method: "POST",
                  headers: {
                    "content-type": "application/json",
                  },
                  body: JSON.stringify(link),
                })
                  .then((res) => res.json())
                  .then((data) => {
                    const single_data = JSON.parse(data);
                    temp_data.push(single_data[0]);
                    count++;
                    if (count == kry_links.length) setData(temp_data);
                  });
              });
              if (!kry_links.length) setData(temp_data);
            });
        });
      setInputValue("");
    }
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
                placeholder="Enter your product"
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
