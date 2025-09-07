import bgPhotoSun from "./images/bg-desktop-light.jpg";
import bgPhotoMoon from "./images/bg-desktop-dark.jpg";
import Moon from "./images/icon-moon.svg";
import Sun from "./images/icon-sun.svg";
import CloseIcon from "./images/icon-cross.svg";
import { useState } from "react";
function App() {
  const [mode, setMode] = useState(Moon);
  const [input, setInput] = useState("");
  const [liArr, setLiArr] = useState([]);
  const [Active, SetActive] = useState("All");
  const [completedLi, setcompletedLi] = useState([]);
  let [count, SetCount] = useState(0);
  const HandleMode = () => {
    mode == Moon ? setMode(Sun) : setMode(Moon);
  };

  const HandleAdd = () => {
    if (!input) return null;
    setLiArr([...liArr, { name: input, active: true, completedLi: false }]);
    setInput("");
  };
  const handleCloseLi = (index) => {
    const newArr = liArr.filter((_, id) => id !== index);
    setLiArr(newArr);
  };
  const HandleCount = () => {
    if (Active == "Active") {
      return liArr.filter((ele) => ele.active).length;
    } else if (Active == "Completed") {
      return liArr.filter((ele) => ele.completedLi).length;
    } else {
      return liArr.length + count;
    }
  };
  const getFilteredTodos = () => {
    if (Active == "Active") {
      return liArr.filter((ele) => ele.active);
    } else if (Active == "Completed") {
      return liArr.filter((ele) => ele.completedLi);
    } else return liArr;
  };
  const handleComplete = (index) => {
    const newTodo = [...liArr];
    if (newTodo[index].completedLi == false) {
      SetCount(--count);
      newTodo[index].completedLi = true;
      newTodo[index].active = false;
    } else {
      SetCount(++count);
      newTodo[index].completedLi = false;
      newTodo[index].active = true;
    }
    if (newTodo[index].completedLi) {
      setcompletedLi((prev) => [...prev, newTodo[index].name]);
    } else {
      setcompletedLi((prev) =>
        prev.filter((item) => item != newTodo[index].name)
      );
    }
    setLiArr(newTodo);
  };
  const HandleClearCompleted = () => {
    const newArr = liArr.filter((ele) => !ele.completedLi);
    setLiArr(newArr);
  };
  return (
    <>
      <header className="min-h-screen flex flex-col">
        <div className="relative">
          <img
            src={mode == Moon ? bgPhotoSun : bgPhotoMoon}
            className="min-w-full"
            alt="bgPhoto"
          />
        </div>

        <div className="absolute xl:top-36 md:top-20 top-10 lg:w-4/12 md:w-6/12 w-10/12 left-1/2 -translate-x-1/2">
          <div className="flex justify-between">
            <h2 className="font-josefin xl:text-4xl text-2xl text-white font-bold">
              T O D O
            </h2>
            <img
              src={mode}
              onClick={HandleMode}
              className="xl:w-6 xl:h-6 w-4 h-4 cursor-pointer"
              alt="MoonIcon"
            />
          </div>
          <div className="flex mt-14 items-center justify-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={`${
                mode == Moon
                  ? "bg-white"
                  : "bg-[hsl(235,24%,19%)] text-gray-200"
              } w-10/12 px-5 font-josefin py-3 rounded-s-sm md:text-sm text-[12px] outline-none`}
              placeholder="Create A New Todos"
            />
            <button
              className=" md:text-sm text-[12px] bg-gradient-to-r from-cyan-400 to-purple-500 w-2/12 py-3 rounded-r-lg text-white font-josefin cursor-pointer text-center"
              onClick={HandleAdd}
            >
              Add
            </button>
          </div>
          <div
            className={`${
              mode == Moon ? "bg-white" : "bg-[hsl(235,24%,19%)] border-none"
            } boxModel rounded-sm font-josefin mt-14  md:text-lg text-md border-gray-200 shadow-xl border-1`}
          >
            <ul
              className={`${mode == Moon ? "text-blue-950" : "text-gray-300"}`}
            >
              {getFilteredTodos().map((ele, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center px-5 py-4">
                    <li
                      className={`${
                        ele.completedLi ? "line-through text-gray-600" : ""
                      } cursor-grab`}
                      onClick={() => handleComplete(index)}
                    >
                      {ele.name}
                    </li>
                    <img
                      src={CloseIcon}
                      alt="CloseIcon"
                      onClick={() => handleCloseLi(index)}
                      className="cursor-pointer w-3 h-3"
                    />
                  </div>
                  <hr
                    className={`${
                      mode == Moon ? "text-gray-300" : "text-gray-700"
                    }`}
                  />
                </div>
              ))}
            </ul>


            <div className="buttonFilter flex justify-between items-center text-gray-400 font-semibold md:text-sm text-[12px] px-5 py-4">
              <div>
                <span>{HandleCount()} items left</span>
              </div>
              {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////// */}
              {liArr.length > 0 ? (
                <div className="xl:flex hidden gap-5 items-center text-center">
                  <button
                    className={`${
                      Active == "All"
                        ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-3 py-1 rounded-sm"
                        : ""
                    } cursor-pointer`}
                    onClick={() => SetActive("All")}
                  >
                    All
                  </button>
                  <button
                    className={`${
                      Active == "Active"
                        ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-3 py-1 rounded-sm"
                        : ""
                    } cursor-pointer`}
                    onClick={() => SetActive("Active")}
                  >
                    Active
                  </button>
                  <button
                    className={`${
                      Active == "Completed"
                        ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-3 py-1 rounded-sm"
                        : ""
                    } cursor-pointer`}
                    onClick={() => SetActive("Completed")}
                  >
                    Completed
                  </button>
                </div>
              ) : null}
              {/* ///////////////////////////////////////////////////////////////////////////////////////////////////////// */}
              <div>
                <button
                  className="cursor-pointer md:text-sm text-[12px]"
                  onClick={HandleClearCompleted}
                >
                  Clear Completed
                </button>
              </div>
            </div>

          </div>
                  {/* Mobile Style */}
        {liArr.length > 0 ? (
          <div
            className={`${
              mode == Moon ? "bg-white" : "bg-[hsl(235,24%,19%)] text-white border-none"
            } boxModel py-2 rounded-sm xl:hidden  font-josefin mt-4  text-md border-gray-200 shadow-xl border-1 w-full flex justify-center items-center `}
          >
                <div className="flex md:gap-10 gap-5 items-center text-center md:text-lg text-[12px]">
                  <button
                    className={`${
                      Active == "All"
                        ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-3 py-1 rounded-sm"
                        : ""
                    } cursor-pointer`}
                    onClick={() => SetActive("All")}
                  >
                    All
                  </button>
                  <button
                    className={`${
                      Active == "Active"
                        ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-3 py-1 rounded-sm"
                        : ""
                    } cursor-pointer`}
                    onClick={() => SetActive("Active")}
                  >
                    Active
                  </button>
                  <button
                    className={`${
                      Active == "Completed"
                        ? "bg-gradient-to-r from-cyan-400 to-purple-500 text-white px-3 py-1 rounded-sm"
                        : ""
                    } cursor-pointer`}
                    onClick={() => SetActive("Completed")}
                  >
                    Completed
                  </button>
                </div>
                </div>
              ) : null}
        </div>
        <div
          className={`${
            mode == Moon ? "bg-gray-50" : "bg-[hsl(235,21%,11%)]"
          } flex-1`}
        ></div>

      </header>
    </>
  );
}

export default App;
