import { useState } from "react";

import "./App.css";
import { IMAGE_URL } from "./utils/constants";

function App() {
  const [options, setOptions] = useState(["banana","apple","check","bht data","upi","gpay","paytm"]);

  const [filteredOptions, setFilteredOptions] = useState(options);
  const [inputValue, setInputValue] = useState("");

  const [currentIndex, setcurrentIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);

 

 

  const handleChange = (e) => {

    if (e.target.value.charAt(0) !== "@" && e.target.value.includes("@")) {
    
      const suffix=getSuffix(e.target.value);
      filterList(suffix);
      setShowOptions(true);

    } else {
      setShowOptions(false);
    }
    setInputValue(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (showOptions) {
      if (e.key === "ArrowDown") {
        setcurrentIndex((prev) => {
          if (prev < filteredOptions.length - 1) return prev + 1;
          return prev;
        });

        setInputValue(changeInputValue(inputValue, currentIndex + 1));

      } else if (e.key === "ArrowUp") {
        setcurrentIndex((prev) => {
          if (prev > 0) return prev - 1;
          return prev;
        });
        setInputValue(changeInputValue(inputValue, currentIndex - 1));
      }
      else if(e.key === "ArrowRight"){
        setInputValue((prev) => {
          setShowOptions(false);
          const index = prev.indexOf("@");
          const prefix = prev.slice(0, index + 1);
          return prefix + filteredOptions[0];
        });
      }
      else if (e.key === "Enter")
        setInputValue((prev) => {
          setShowOptions(false);
          return changeInputValue(prev, currentIndex);
        });
    }
  };

  const handleMouseEnter = (index) => {
    setcurrentIndex(index);

    setInputValue((prev) => {
      return changeInputValue(prev, index);
    });
  };

  const handleOnClick = (index) => {
    setInputValue((prev) => {
      setShowOptions(false);
      return changeInputValue(prev, index);
    });
  };

  const filterList = (suffix) => {
    if (suffix === "") {
      setFilteredOptions(options);
      return;
    }
    const updatedList = options.filter((val) => val.toLowerCase().startsWith(suffix.toLowerCase()));  
    setFilteredOptions(updatedList);
  };

  const getSuffix=(value)=>{
      const index = value.indexOf("@");
      return value.slice(index + 1);
  }

  const getPrefix=(value)=>{
    const index=value.indexOf("@");
    return value.slice(0,index+1);
  
  }

  const changeInputValue = (prev, crntIndex) => {
    if (crntIndex < 0 || crntIndex > filteredOptions.length - 1) return prev;

    const prefix = getPrefix(prev);
    return prefix + filteredOptions[crntIndex];
  
  };

  const getSuffixvalue = () => {
    const index = inputValue.indexOf("@");
    
    if (index + 1 === inputValue.length) return filteredOptions[0];

    const suffix = inputValue.slice(index + 1);

    const resIndex = currentIndex < filteredOptions.length  ? filteredOptions[currentIndex].indexOf(suffix) : 0;
    return currentIndex < filteredOptions.length ? filteredOptions[currentIndex].slice(resIndex + suffix.length) :"";
  };

  const showInputValue = () => {
    return showOptions ? inputValue + getSuffixvalue() : inputValue;
  };

  return (
    <div className="app">
      <div className="main-container">
        <img src={IMAGE_URL} />
        <div className="bottom-section" >
          <input
            className="main-input"
            autoFocus
            value={inputValue}
            placeholder="Enter your UPI"
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <input className="second-input" value={showInputValue()} />
          {showOptions && filteredOptions.length !== 0 && (
            <div className="select-container">
              <div
                className="option-container"
              >
                {filteredOptions.map((el, index) => (
                  <p
                    className="option"
                    key={el}
                    style={{
                      backgroundColor:
                        index === currentIndex ? "rgb(199, 197, 197)" : "white",
                    }}
                    onMouseEnter={() => handleMouseEnter(index)}
                    onClick={() => handleOnClick(index)}
                  >
                    {el}
                  </p>
                ))}
              </div>
            </div>
          )}
          <button>Pay Now</button>
        </div>
      </div>
    </div>
  );
}

export default App;