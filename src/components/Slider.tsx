import React from "react";

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

const Slider: React.FC<SliderProps> = ({ value, onChange, label }) => {
  return (
    <div className="mt-4">
      <label htmlFor={label} className="block mb-2 text-center text-gray-500">
        {label}
      </label>
      <div className="flex items-center">
        <p className="mr-2 text-gray-500">1</p>
        <input
          id={label}
          type="range"
          min="1"
          max="5"
          value={value.toString()}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer "
        />
        <p className="ml-2 text-gray-500">5</p>
      </div>
    </div>
  );
};

export default Slider;
