import { SettingQuery, useUpdateSettingMutation } from "@/generated/graphql";
import React, { useEffect } from "react";
import { FaRedo } from "react-icons/fa";
import ColorPicker from "../ColorPicker";
import Image from "next/image";
import LoadingSpinner from "../LoadingSpinner";

interface DataFeedListProps {
  data: SettingQuery | undefined;
  loading: boolean;
}

const Customization: React.FC<DataFeedListProps> = ({
  data: data2,
  loading,
}) => {
  const data = {
    getSettingByToken: data2!.getSettingByToken!.setting,
  };
  const [modal, setModal] = React.useState(false);
  const [messageFieldColor, setMessageFieldColor] = React.useState("#fff");
  const [incommingMessageColor, setIncommingMessageColor] =
    React.useState("#fff");
  const [outgoingMessageColor, setOutgoingMessageColor] =
    React.useState("#fff");
  const [incommingMessageTextColor, setIncommingMessageTextColor] =
    React.useState("#fff");
  const [outgoingMessageTextColor, setOutgoingMessageTextColor] =
    React.useState("#fff");
  const [messageFieldTextColor, setMessageFieldTextColor] =
    React.useState("#fff");
  const [logo, setLogo] = React.useState("");

  const [active, setActive] = React.useState("");

  const [updateSetting] = useUpdateSettingMutation({
    variables: {
      id: 1,
      messageFieldColor,
      outgoingMessageColor,
      outgoingMessageTextColor,
      incommingMessageColor,
      incommingMessageTextColor,
      messageFieldTextColor,
      logo,
    },
  });
  // // if(!data.me) {

  useEffect(() => {
    if (!data) {
      return;
    }
    setMessageFieldColor(data.getSettingByToken.messageFieldColor);
    setIncommingMessageColor(data.getSettingByToken.incommingMessageColor);
    setOutgoingMessageColor(data.getSettingByToken.outgoingMessageColor);
    setIncommingMessageTextColor(
      data.getSettingByToken.incommingMessageTextColor
    );
    setOutgoingMessageTextColor(
      data.getSettingByToken.outgoingMessageTextColor
    );
    setMessageFieldTextColor(data.getSettingByToken.messageFieldTextColor);
    setLogo(data.getSettingByToken.logo);
  }, [data]);

  if (loading) {
    return (
      <div className="h-screen mx-auto flex flex-col justify-center">
        {/* <MySidebar /> */}
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div
      className="min-h-screen overflow-y-auto p-4  w-full"
      onClick={() => {
        setActive("");
      }}
    >
      <h1 className="text-3xl font-bold mb-4 mt-8">Customize your Chatbot</h1>
      <p className="text-lg mb-8">
        Customize your bot to your liking. You can find your bot{" "}
        <a
          target="_blank"
          className="text-blue-500 hover:underline"
          href={process.env.NEXT_PUBLIC_BASE_URL + "/chat"}
        >
          <span className="">here</span>
        </a>
      </p>
      <div className="w-full flex items-center justify-between">
        {data && (
          <div className="flex w-1/3 flex-col">
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
            <div className="flex justify-between mb-4 items-center">
              <p>Logo : </p>
              <input
                type="text"
                className="border-2 p-4 w-1/2 h-8"
                value={logo}
                placeholder="Enter Logo URL"
                onChange={(e) => {
                  setLogo(e.target.value);
                }}
              />
            </div>
          </div>
        )}
        <div className="ml-2 hidden  w-[32rem] h-64 lg:block ">
          <div className="flex">
            <div
              className="h-64 w-[10.667rem] p-2 flex justify-center items-center"
              style={{
                backgroundColor: messageFieldColor,
              }}
            >
              <Image
                width={300}
                height={300}
                src={logo}
                alt="logo"
                className=""
              ></Image>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex-grow"></div>

              <div className="flex justify-end">
                <div
                  className="fadeIn w-fit scale-75 text-md  py-2 px-4 max-w-1/2 rounded-br-xl rounded-tl-xl"
                  style={{
                    backgroundColor: outgoingMessageColor,
                    color: outgoingMessageTextColor,
                  }}
                >
                  <p className="w-full md:text-justify text-left max-w-full">
                    Hello
                  </p>
                </div>
              </div>
              <div className="flex justify-start pl-2">
                <div
                  className="fadeIn scale-75 -translate-x-8 w-fit text-md p-2 max-w-lg rounded-bl-xl rounded-tr-xl"
                  style={{
                    backgroundColor: incommingMessageColor,
                    color: incommingMessageTextColor,
                  }}
                >
                  <p className="w-full md:text-justify text-left max-w-full">
                    Hello! How can I assist you today?
                  </p>
                </div>
              </div>
              <div className="flex justify-end">
                <div
                  className="fadeIn w-fit scale-75 text-md  py-2 px-4 max-w-1/2 rounded-br-xl rounded-tl-xl"
                  style={{
                    backgroundColor: outgoingMessageColor,
                    color: outgoingMessageTextColor,
                  }}
                >
                  <p className="w-full md:text-justify text-left max-w-full">
                    What is ChatGPT?
                  </p>
                </div>
              </div>

              <div className="w-full p-1 scale-75  -translate-x-10 fade-in">
                <div
                  className="flex justify-start w-fit p-2 rounded-full"
                  style={{
                    backgroundColor: messageFieldColor,
                  }}
                >
                  <div className="container relative">
                    <div
                      className="bouncing-ball "
                      style={{
                        backgroundColor: "#ffffff",
                      }}
                    ></div>
                  </div>
                  <div className="container  relative">
                    <div
                      className="bouncing-ball2  "
                      style={{
                        backgroundColor: "#ffffff",
                      }}
                    ></div>
                  </div>
                  <div className="container  relative">
                    <div
                      className="bouncing-ball "
                      style={{
                        backgroundColor: "#ffffff",
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              <div
                className=" h-10 w-full flex items-center"
                style={{
                  backgroundColor: messageFieldColor,
                }}
              >
                <div
                  className="w-full text-xs"
                  style={{
                    color: messageFieldTextColor,
                  }}
                >
                  Type your message here...
                </div>
                <div className="flex px-2 justify-between items-center">
                  <svg
                    fill={messageFieldTextColor}
                    height="20px"
                    width="20px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512.662 512.662"
                    xmlSpace="preserve"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <g>
                        {" "}
                        <g>
                          {" "}
                          <path d="M505.021,5.868c-0.064-0.043-0.085-0.107-0.128-0.149c-0.128-0.107-0.256-0.128-0.384-0.235 c-1.131-0.981-2.475-1.621-3.797-2.325c-0.427-0.213-0.747-0.576-1.195-0.768c-0.064-0.021-0.107-0.021-0.149-0.043 c-0.469-0.192-0.853-0.533-1.323-0.704c-1.771-0.661-3.648-0.875-5.547-1.045c-0.576-0.043-1.131-0.299-1.707-0.299 c-2.475-0.021-4.971,0.384-7.403,1.259L14.055,172.225c-7.445,2.709-12.779,9.323-13.867,17.173 c-1.045,7.851,2.304,15.637,8.768,20.245l141.888,101.355l20.032,140.309c1.237,8.533,7.488,15.488,15.851,17.643 c1.749,0.448,3.541,0.661,5.291,0.661c6.592,0,12.971-3.072,17.045-8.533l50.347-67.093l132.032,113.237 c3.947,3.371,8.875,5.141,13.909,5.141c2.389,0,4.779-0.405,7.125-1.216c7.168-2.56,12.48-8.768,13.845-16.277l85.995-468.928 C513.725,18.262,510.738,10.71,505.021,5.868z M240.125,348.396l-1.536,2.219l-32.747,43.669l-12.395-86.827l185.109-160.448 L240.125,348.396z"></path>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => {
          updateSetting();
        }}
        className="bg-secondary text-white hover:opacity-90 p-4 rounded-xl mt-8 flex items-center"
      >
        <div className="mr-2">
          <FaRedo />
        </div>
        <div>Update Settings</div>
      </button>
    </div>
  );
};

export default Customization;
