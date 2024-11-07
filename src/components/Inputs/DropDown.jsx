import { useState } from "react";

const DropDown = ({ options, label, setOption, optionValue, error }) => {
  const [showOptions, setShowOptions] = useState(false);
  const [buttonLabel, setButtonLabel] = useState(label);

  const handleOptions = (option) => {
    setOption(option);
    setButtonLabel(option);
    setShowOptions(false);
  };

  return (
    <div className="py-2">
      <button
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center w-full"
        type="button"
        data-dropdown-toggle="dropdown"
        onClick={() => setShowOptions(!showOptions)}
      >
        {buttonLabel}
      </button>
      {showOptions && (
        <ul className="py-1 bg-white shadow rounded-lg mt-2" aria-labelledby="dropdown">
          {options &&
            options.map((option, index) => (
              <li
                key={index}
                className="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2 cursor-pointer"
                onClick={() => handleOptions(option)}
              >
                {option}
              </li>
            ))}
        </ul>
      )}
      {/* Error message display */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default DropDown;
