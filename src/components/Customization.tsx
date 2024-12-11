import {
  GetSettingByIdQuery,
  useUpdateBotSettingMutation,
  useUploadLogoMutation,
} from "@/generated/graphql";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaImage, FaRedo, FaSpinner, FaUpload } from "react-icons/fa";
import ColorPicker from "./ColorPicker";
import LoadingSpinner from "./LoadingSpinner";
import Resizer from "react-image-file-resizer";
import { useDropzone } from "react-dropzone";

interface CustomizationProps {
  data: GetSettingByIdQuery | undefined;
  loading: boolean;
  botId: number | null;
  messageFieldColor: string;
  setMessageFieldColor: React.Dispatch<React.SetStateAction<string>>;
  outgoingMessageColor: string;
  setOutgoingMessageColor: React.Dispatch<React.SetStateAction<string>>;
  incommingMessageColor: string;
  setIncommingMessageColor: React.Dispatch<React.SetStateAction<string>>;
  outgoingMessageTextColor: string;
  setOutgoingMessageTextColor: React.Dispatch<React.SetStateAction<string>>;
  incommingMessageTextColor: string;
  setIncommingMessageTextColor: React.Dispatch<React.SetStateAction<string>>;
  messageFieldTextColor: string;
  setMessageFieldTextColor: React.Dispatch<React.SetStateAction<string>>;
  logo: string;
  setLogo: React.Dispatch<React.SetStateAction<string>>;
}

const Customization: React.FC<CustomizationProps> = ({
  data,
  loading,
  botId,
  messageFieldColor,
  setMessageFieldColor,
  outgoingMessageColor,
  setOutgoingMessageColor,
  incommingMessageColor,
  setIncommingMessageColor,
  outgoingMessageTextColor,
  setOutgoingMessageTextColor,
  incommingMessageTextColor,
  setIncommingMessageTextColor,
  messageFieldTextColor,
  setMessageFieldTextColor,
  logo,
  setLogo,
}) => {
  const [updateLoading, setUpdateLoading] = React.useState(false);

  const [active, setActive] = React.useState("");
  const toasterRef = React.useRef<HTMLDivElement>(null);
  const [updateLogoLoading, setUpdateLogoLoading] = useState(false);
  const [error, setError] = useState("");
  const [modal, setModal] = useState(false);
  const [file, setFile] = useState<any>(null);
  const [fileName, setFileName] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [pictureHover, setPictureHover] = useState(false);

  const resizeFile = (file: any) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        "JPEG",
        100,
        0,
        (uri: any) => {
          resolve(uri);
        },
        "blob"
      );
    });

  const onDrop = React.useCallback(async (acceptedFiles: any) => {
    setError("");
    const file = acceptedFiles[0];
    setFileName(file.name);
    if (!file) {
      return;
    }
    const resizedFile = (await resizeFile(file)) as Blob;
    setImageURL(URL.createObjectURL(resizedFile));
    setFile(resizedFile);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
  });

  const [updateSetting] = useUpdateBotSettingMutation({
    variables: {
      id: botId as number,
      messageFieldColor,
      outgoingMessageColor,
      outgoingMessageTextColor,
      incommingMessageColor,
      incommingMessageTextColor,
      messageFieldTextColor,
      logo,
    },
    update: (cache, data) => {
      cache.evict({ fieldName: "getSettingById" });
    },
  });

  const [uploadLogo] = useUploadLogoMutation();

  if (loading) {
    return (
      <div className="h-screen mx-auto flex flex-col justify-center">
        {/* <MySidebar /> */}
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="overflow-y-auto h-[calc(100vh-96px)] p-4 w-full bg-white m-4 rounded-2xl">
      <div
        className="bg-[#00ba88]
           text-white
           leading-relaxed
           text-center
           text-xl
           py-4 px-10 
           rounded-xl 
           scale-75 
           fixed max-w-[505px] 
          lg:left-[50%] 
            md:left-1/2
            right-1
          hidden
           lg:translate-x-[-250px] 
           z-[1000]
           min-h-[90px]
           scale-in
          
           "
        ref={toasterRef}
      >
        <div className="flex items-center justify-center min-h-[65px]">
          Settings is updated!
        </div>
      </div>
      <div className="w-full">
        <h1 className="head-inner">Customize your Chatbot</h1>
        <p className="text-lg mb-8">
          Customize your bot to your liking. You can find your bot{" "}
          <a
            target="_blank"
            className="text-blue-500 hover:underline"
            href={
              process.env.NEXT_PUBLIC_BASE_URL +
              "/chat/" +
              data?.getSettingById.token
            }
          >
            <span className="">here</span>
          </a>
        </p>
        <div className="w-full">
          {data && (
            <div className="flex flex-col">
              <ColorPicker
                title="Message Field Color"
                active={active}
                setActive={setActive}
                type="messageFieldColor"
                color={messageFieldColor}
                setColor={setMessageFieldColor}
              />
              <ColorPicker
                title="Message Field Text Color"
                active={active}
                setActive={setActive}
                type="messageFieldTextColor"
                color={messageFieldTextColor}
                setColor={setMessageFieldTextColor}
              />
              <ColorPicker
                title="Incomming Message Color"
                active={active}
                setActive={setActive}
                type="incommingMessageColor"
                color={incommingMessageColor}
                setColor={setIncommingMessageColor}
              />
              <ColorPicker
                title="Outgoing Message Color"
                active={active}
                setActive={setActive}
                type="outgoingMessageColor"
                color={outgoingMessageColor}
                setColor={setOutgoingMessageColor}
              />
              <ColorPicker
                title="Incomming Message Text Color"
                active={active}
                setActive={setActive}
                type="incommingMessageTextColor"
                color={incommingMessageTextColor}
                setColor={setIncommingMessageTextColor}
              />
              <ColorPicker
                title="Outgoing Message Text Color"
                active={active}
                setActive={setActive}
                type="outgoingMessageTextColor"
                color={outgoingMessageTextColor}
                setColor={setOutgoingMessageTextColor}
              />
              <div className="flex justify-between mb-4 items-center w-full">
                <p>Logo : </p>
                {/* <input
                  type="text"
                  className="border-2 p-4 w-1/2 h-8"
                  value={logo}
                  placeholder="Enter Logo URL"
                  onChange={(e) => {
                    setLogo(e.target.value);
                  }}
                /> */}
                <div className="flex flex-col items-center">
                  <button
                    onMouseEnter={() => setPictureHover(true)}
                    onMouseLeave={() => setPictureHover(false)}
                    onClick={() => {
                      setModal(true);
                    }}
                    className=" relative w-20 h-20 rounded-full mb-4 md:mb-0"
                  >
                    <img
                      src={`${logo}`}
                      alt="profile picture"
                      className="w-20 h-20 object-cover rounded-full border-4 border-secondary  "
                    />
                    {pictureHover && (
                      <div className="absolute top-0 bg-black opacity-50 text-white w-20 h-20 rounded-full    flex items-center justify-center"></div>
                    )}
                    {pictureHover && (
                      <div className="absolute top-0 font-semibold text-white w-20 h-20 rounded-full   flex items-center justify-center">
                        Change Logo
                      </div>
                    )}
                  </button>
                  {/* <ProfileEventsList user={user} /> */}
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={async () => {
              setUpdateLoading(true);
              await updateSetting();
              toasterRef.current?.classList.remove("hidden");
              setTimeout(() => {
                toasterRef.current?.classList.add("hidden");
              }, 3000);

              setUpdateLoading(false);
            }}
            className="bg-secondary flex justify-center w-48 h-14 text-white hover:opacity-90 p-4 rounded-xl mt-8 items-center"
          >
            {updateLoading ? (
              <div>
                <FaSpinner className="animate-spin" />
              </div>
            ) : (
              <div className="flex">
                <div className="mr-2">
                  <FaRedo />
                </div>
                <div>Update Settings</div>
              </div>
            )}
          </button>
          {/* <button
            onClick={async () => {
              setUpdateLoading(true);
              await updateSetting(
                variables
              );
              toasterRef.current?.classList.remove("hidden");
              setTimeout(() => {
                toasterRef.current?.classList.add("hidden");
              }, 3000);

              setUpdateLoading(false);
            }}
            className="bg-secondary flex justify-center w-48 h-14 text-white hover:opacity-90 p-4 rounded-xl mt-8 items-center"
          >
            {updateLoading ? (
              <div>
                <FaSpinner className="animate-spin" />
              </div>
            ) : (
              <div className="flex">
                <div className="mr-2">
                  <FaRedo />
                </div>
                <div>Restore Settings</div>
              </div>
            )}
          </button> */}
        </div>
      </div>
      {modal && (
        <div className="">
          <div
            onClick={() => {
              setModal(false);
            }}
            className="absolute z-[65] top-0 left-0 h-screen w-full bg-black bg-opacity-50 flex justify-center items-center"
          >
            <div className="max-h-screen z-20 overflow-y-auto py-4">
              <div
                className=" rounded-xl min-h-[500px]  p-8 bg-white md:w-[500px] lg:w-[800px]"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="text-2xl text-center font-semibold mb-8">
                  Upload New Logo
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    console.log("1");
                    setError("");

                    setUpdateLogoLoading(true);

                    const formData = new FormData();
                    formData.append("files", file);
                    if (!file) {
                      return;
                    }
                    if (!botId) {
                      return;
                    }

                    console.log(2);

                    const response = await uploadLogo({
                      variables: {
                        file: file,
                        id: botId,
                        fileName: fileName,
                      },
                    });

                    if (!response.data?.uploadLogo) {
                      return;
                    }
                    // console.log(response.data);

                    // setImageID(response.data[0].id);
                    console.log(3, response.data?.uploadLogo);
                    setLogo(response.data?.uploadLogo);
                    setUpdateLogoLoading(false);
                    setModal(false);
                  }}
                >
                  <div className="m-4">
                    <div
                      {...getRootProps()}
                      className="w-full h-[300px] rounded-xl border-2 border-separate flex items-center justify-center"
                    >
                      <input {...getInputProps()} multiple />
                      {isDragActive ? (
                        <FaUpload className="w-10 h-10 text-secondary" />
                      ) : file ? (
                        <div className="flex flex-col items-center justify-center">
                          <img
                            src={imageURL}
                            alt="profile picture"
                            className="w-40 translate-x-4 h-40 mx-auto object-cover rounded-full border-4 border-secondary mb-4 md:mb-0 md:mr-8"
                          />

                          <div className="flex mt-4 text-center">
                            <FaImage className="w-5 h-5 mr-2" />
                            <p className="">{fileName}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex">
                          <FaUpload className="w-5 h-5 mr-2" />
                          <p>Drag your image here</p>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-center">
                      <button
                        type="submit"
                        className="bg-secondary hover:opacity-90 text-white text-xl p-4 w-[200px] rounded-xl flex justify-center mt-4"
                      >
                        {updateLogoLoading ? (
                          <div className="scale-95">
                            <FaSpinner className="animate-spin" />
                          </div>
                        ) : (
                          <p>Upload</p>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customization;
