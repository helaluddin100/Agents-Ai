import React from "react";
import { SketchPicker } from "react-color";

interface ColorPickerProps {
  active: string;
  type: string;
  setColor: (color: string) => void;
  setActive: (active: string) => void;
  color: string;
  title: string;
}

const ColorPicker: React.FC<ColorPickerProps> = ({
  active,
  type,
  setColor,
  setActive,
  color,
  title,
}) => {
  return (
    <div>
      <div className="flex justify-between mb-4 h-10 items-center">
        <p>{title + " : "} </p>
        {active !== type && (
          <div
            className="w-16 h-8 border-2 border-black"
            style={{
              backgroundColor: color,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setActive(type);
            }}
          ></div>
        )}
        {active === type && (
          <div
            className="relative top-0 right-0"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <SketchPicker
              color={color}
              onChange={(color) => {
                setColor(color.hex);
                setActive("");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
