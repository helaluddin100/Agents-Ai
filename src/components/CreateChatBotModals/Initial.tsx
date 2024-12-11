import { useCreateBotMutation } from "@/generated/graphql";
import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FaFilePdf, FaUpload } from "react-icons/fa";

interface InitialProps {
  name: string;
  setName: any;
  logo: any;
  setLogo: any;
}

const Initial: React.FC<InitialProps> = ({ name, setName, logo, setLogo }) => {
  const [imageURL, setImageURL] = React.useState("");

  useEffect(() => {
    if (logo) {
      setImageURL(URL.createObjectURL(logo));
    }
  }, [logo]);

  const onDrop = useCallback(
    (acceptedFiles: any) => {
      // setError("");
      const file = acceptedFiles[0];
      if (!file) {
        return;
      }
      // console.log(file);

      // const myRenamedFile = new File([file], file.name.replace(/ /g, "_"), {
      //   type: file.type,
      // });

      // file = myRenamedFile;
      // console.log(file);

      setImageURL(URL.createObjectURL(file));

      setLogo(file);

      console.log(logo, file);
    },

    [setLogo, logo]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
    },
  });

  return (
    <div className="pt-10 ">
      <div>
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="username"
        >
          Name your bot
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="username"
          type="text"
          placeholder="Enter a name for the bot"
          value={name}
          onChange={(e) => {
            // setError("");
            setName(e.target.value);
          }}
        />
      </div>
      <div className="mt-8">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Upload your logo
        </label>
        <div
          {...getRootProps()}
          className="w-full hover:cursor-pointer h-48 border-2 border-separate flex items-center justify-center"
        >
          <input {...getInputProps()} multiple />
          {isDragActive ? (
            <FaUpload className="w-10 h-10 text-secondary" />
          ) : logo ? (
            <div className="flex flex-col items-center">
              <img src={imageURL} className="w-20 h-20 mb-2" />
              <p className="">{logo.name}</p>
            </div>
          ) : (
            <div className="flex">
              <FaUpload className="w-5 h-5 mr-2" />
              <p>Drag your Logo here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Initial;
