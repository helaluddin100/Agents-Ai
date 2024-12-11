import React from "react";

interface botConvoProps {
  header: string;
  body: string;
  key: number;
}

const BotConvo: React.FC<botConvoProps> = ({ key, header, body }) => {
  // key is even or not

  return (
    <div
      className="my-8 mx-8 lg:my-0 lg:mx-0 md:w-1/2 bg-[#edf3f7] p-8 rounded-3xl"
      key={key}
    >
      <div className={`flex mt-4 justify-end`}>
        <p className="text-lg md:w-2/3 bg-primary p-2 px-4 text-white rounded-tr-2xl rounded-bl-2xl">
          {header}
        </p>
      </div>
      <div className="flex md:w-2/3 justify-start mt-4">
        <p className="text-lg  p-2 px-4 text-black bg-white rounded-tl-3xl rounded-br-3xl">
          {body}
        </p>
      </div>
    </div>
  );
};

export default BotConvo;
