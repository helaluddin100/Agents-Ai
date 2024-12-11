import React from "react";

interface StageNumberProps {
  stage: number;
  number: number;
}

const StageNumber: React.FC<StageNumberProps> = ({ stage, number }) => {
  return (
    <div className="flex w-full items-center">
      <div
        className={
          "rounded-full border-[5px] h-12 w-12 min-w-[48px] flex justify-center items-center font-bold" +
          (stage === number
            ? " border-animate text-animate"
            : " border-black text-black")
        }
      >
        {number}
      </div>
      {number !== 4 && (
        <div
          className={
            "w-[5px] sm:w-full h-[5px] " +
            (stage === number ? "bg-animate" : "bg-black")
          }
        ></div>
      )}
    </div>
  );
};

export default StageNumber;
