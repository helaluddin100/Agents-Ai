import { useEffect, useRef, useState } from "react";
import axios from "axios";
import autoAnimate from "@formkit/auto-animate";
import { useRouter } from "next/router";
import {
  useGetSettingByTokenQuery,
  useSettingQuery,
} from "@/generated/graphql";

function ChatPreview({ token }: { token: string }) {
  const router = useRouter();

  const { data: settingData, loading } = useGetSettingByTokenQuery({
    variables: {
      token: token as string,
    },
  });

  const data = settingData
    ? {
        getSettingByToken: settingData.getSettingByToken.setting,
      }
    : null;
  // const location = router.pathname;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { message: string; from: "us" | "them" }[]
  >([
    {
      message: "Hi, I'm a bot. How can I help you?",
      from: "them",
    },
  ]);
  const [fetched, setFetched] = useState(false);
  const messageDivRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputBoxRef = useRef<HTMLInputElement>(null);
  // console.log(location.search);
  const queryParams = router.query;
  const parent = useRef(null);
  const messageParent = useRef(null);

  const apiURL = "https://chat.witlingo.com/api/";
  // const apiURL = "https://chat-dev.witlingo.com/api/";

  // const backgroundColor = queryParams.get("backgroundColor") || "#fff";

  // const messageFieldColor = queryParams.get("messageFieldColor") || "#fff";
  // const incommingMessageColor =
  //   queryParams.get("incommingMessageColor") || "#fff";
  // const incommingMessageTextColor =
  //   queryParams.get("incommingMessageTextColor") || "#fff";
  // const outgoingMessageColor =
  //   queryParams.get("outgoingMessageColor") || "#fff";
  // const outgoingMessageTextColor =
  //   queryParams.get("outgoingMessageTextColor") || "#fff";
  // const messageFieldTextColor =
  //   queryParams.get("messageFieldTextColor") || "#ffffff";

  const [backgroundColor, setBackgroundColor] = useState("ffffff");
  const [messageFieldColor, setMessageFieldColor] = useState("194850");
  const [incommingMessageColor, setIncommingMessageColor] = useState("134f9c");
  const [incommingMessageTextColor, setIncommingMessageTextColor] =
    useState("ffffff");
  const [outgoingMessageColor, setOutgoingMessageColor] = useState("194850");
  const [outgoingMessageTextColor, setOutgoingMessageTextColor] =
    useState("ffffff");
  const [answering, setAnswering] = useState(false);
  const [messageFieldTextColor, setMessageFieldTextColor] = useState("ffffff");
  const [sidebarCustomization, setSidebarCustomization] = useState({
    background_color: "#E6F5F7",
    // background_color: "#FFFFFF",
    logo: "https://witlingo.com/wp-content/uploads/2019/07/witlingo_logo.png",
    text_color: "#000000",
    // logo: "",
    links: [
      {
        name: "Launch your custom ChatGPT based Chatbot",
        url: "https://witlingo.com/chatgpt/",
      },
      {
        name: "Power up your current bot with ChatGPT capabilities",
        url: "https://witlingo.com/ivr/",
      },
      {
        name: "Pricing",
        url: "https://witlingo.com/pricing/",
      },
    ],
  });

  const botId = "0f21c204-9784-4bbe-9b20-e03eba2075cc";
  // const [ID, setID] = useState(crypto.randomUUID());

  const getData = async () => {
    const response = await axios.get(apiURL + "chat/" + botId + "/");
    return response.data.data;
  };

  const getSidebarData = async () => {
    const response2 = await axios.get(apiURL + "chat/" + botId + "/");

    const response = {
      data: {
        background_color: response2.data.data.background_color,
        logo: response2.data.data.avatar,
        links: response2.data.data.urls as { name: string; url: string }[],
        text_color: response2.data.data.text_color,
      },
    };

    let link = document.querySelector("link[rel~='icon']");
    if (!link) {
      link = document.createElement("link");
      //@ts-ignore
      link.rel = "icon";
      document.getElementsByTagName("head")[0].appendChild(link);
    }
    //@ts-ignore
    link.href = response.data.logo;

    return response.data;
  };

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--vh",
      window.innerHeight * 0.01 + "px"
    );
  }, []);

  // useEffect(() => {
  //   const data = getData();
  //   data.then((data) => {
  //     // console.log(data);
  //     if (data.settings) {
  //       setMessageFieldColor(data.settings.messageFieldColor);
  //       setIncommingMessageColor(data.settings.incommingMessageColor);
  //       setIncommingMessageTextColor(data.settings.incommingMessageTextColor);
  //       setOutgoingMessageColor(data.settings.outgoingMessageColor);
  //       setOutgoingMessageTextColor(data.settings.outgoingMessageTextColor);
  //       setMessageFieldTextColor(data.settings.messageFieldTextColor);
  //       setBackgroundColor(data.settings.backgroundColor);
  //     }
  //     // console.log("data", data);
  //   });
  //   const sidebarData = getSidebarData();
  //   sidebarData.then((data) => {
  //     setSidebarCustomization(data);
  //     // console.log(data);
  //     setFetched(true);
  //     parent.current && autoAnimate(parent.current);
  //   });
  // }, []);

  useEffect(() => {
    console.log("ran useeffect");
    if (!loading && data) {
      setMessageFieldColor(data.getSettingByToken.messageFieldColor);
      setIncommingMessageColor(data.getSettingByToken.incommingMessageColor);
      setIncommingMessageTextColor(
        data.getSettingByToken.incommingMessageTextColor
      );
      setOutgoingMessageColor(data.getSettingByToken.outgoingMessageColor);
      setOutgoingMessageTextColor(
        data.getSettingByToken.outgoingMessageTextColor
      );
      setMessageFieldTextColor(data.getSettingByToken.messageFieldTextColor);
      setSidebarCustomization({
        background_color: data.getSettingByToken.messageFieldColor,
        logo: data.getSettingByToken.logo,
        links: [],
        text_color: "#000000",
      });
      setFetched(true);
      parent.current && autoAnimate(parent.current);

      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        //@ts-ignore
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      //@ts-ignore
      link.href = data.getSettingByToken.logo;
      // setBackgroundColor(data.setting.backgroundColor);
    }
  }, [loading]);

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderMessages = () => {
    return messages.map((message, index) => (
      <ul
        key={index}
        ref={messageParent}
        className={`flex items-center ${
          message.from === "us" ? "justify-end" : "justify-start"
        }`}
      >
        <li className="flex items-center">
          {message.from === "them" && (
            <img
              src={sidebarCustomization.logo}
              alt="avatar"
              className={`w-8 h-8 mr-1 rounded-full`}
            ></img>
          )}
          <div
            className={`fadeIn text-md  py-2 px-4 mb-2 max-w-1/2 ${
              message.from === "us" ? "rounded-3xl" : "max-w-lg rounded-3xl"
            }`}
            style={
              message.from === "us"
                ? {
                    backgroundColor: outgoingMessageColor,
                    color: "#ffffff",
                  }
                : {
                    backgroundColor: "#f1f1f1",
                    color: "#000000",
                  }
            }
          >
            <p className="w-full md:text-justify text-left max-w-full">
              {message.message}
            </p>
          </div>
        </li>
      </ul>
    ));
  };
  // bottomRef.current?.scrollIntoView();

  return (
    <div
      style={{
        backgroundColor: "#" + backgroundColor,
      }}
      className=" min-w-[400px] w-1/2"
    >
      <style>
        {`
        input::placeholder {
          color: #${backgroundColor};
        }
        `}
      </style>
      <div className="flex" ref={parent}>
        {fetched && (
          <div className="flex-grow h-[calc(100vh-62px)] p-4 bg-blank flex flex-col justify-end items-end">
            {/* {fetched && (
              <div
                className="md:hidden w-full h-20 flex justify-center items-center"
                style={{
                  backgroundColor: sidebarCustomization.background_color,
                }}
              >
                {sidebarCustomization.logo && (
                  <img
                    className="h-12"
                    src={sidebarCustomization.logo}
                    alt="logo"
                  />
                )}
              </div>
            )} */}
            {/* <div className=" bg-black min-h-full"></div> */}

            <div className="bg-white rounded-t-2xl  relative bottom-0 flex-grow flex flex-col w-full justify-end overflow-auto">
              {messages.length == 1 && (
                <div>
                  <div className="text-2xl font-semibold pl-4 absolute top-6">
                    Preview
                  </div>
                  <div className="text-gray-400 absolute top-1/2 text-xl w-full font-semibold">
                    <p className="text-center">
                      This is a preview of your chat application
                    </p>
                  </div>
                </div>
              )}
              <div
                // id="message-box"
                ref={messageDivRef}
                className="w-full px-4 pt-4 md:pb-0 overflow-y-auto no-scrollbar max-h-full overflow-x-hidden"
              >
                {renderMessages()}
                {answering && (
                  <div className="w-full p-2 fade-in">
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
                            backgroundColor: "#" + backgroundColor,
                          }}
                        ></div>
                      </div>
                      <div className="container  relative">
                        <div
                          className="bouncing-ball2  "
                          style={{
                            backgroundColor: "#" + backgroundColor,
                          }}
                        ></div>
                      </div>
                      <div className="container  relative">
                        <div
                          className="bouncing-ball "
                          style={{
                            backgroundColor: "#" + backgroundColor,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} className="h-6"></div>{" "}
              </div>{" "}
            </div>

            {/* <div className="md:hidden p-4 w-full flex justify-between">
            {sidebarCustomization.links.map((link, index) => (
              <div className="flex-1 flex justify-center p-2">
                <a
                  key={index}
                  className="text-center font-bold"
                  style={{
                    color: "#008ea4",
                  }}
                  href={link.url}
                >
                  {link.name}
                </a>
              </div>
            ))}
          </div> */}

            <form
              className="w-full bottom-0 relative flex"
              onSubmit={async (e) => {
                e.preventDefault();
                if (message === "") return;
                setMessages([
                  ...messages,
                  {
                    message,
                    from: "us",
                  },
                ]);
                messageParent.current && autoAnimate(messageParent.current);
                setAnswering(true);
                bottomRef.current?.scrollIntoView();
                const prevMessage = message;
                setMessage("");
                const bodyFormData = new FormData();
                bodyFormData.append("message", prevMessage);
                // const query = `query Serve { \n serve(message: "${prevMessage}") { \n } \n }`;

                const response = await axios.post(
                  process.env.NEXT_PUBLIC_API_URL + "/graphql",
                  {
                    query:
                      'query Serve {\n    serve(message: "' +
                      prevMessage +
                      '" token: "' +
                      token +
                      '"sessionId: "' +
                      settingData?.getSettingByToken.sessionId +
                      '" )\n}',
                    variables: {},
                    operationName: "Serve",
                  }
                );
                // console.log(response.data.data.serve);

                bottomRef.current?.scrollIntoView();
                setAnswering(false);

                setMessages([
                  ...messages,
                  {
                    message: prevMessage,
                    from: "us",
                  },
                  {
                    message: response.data.data.serve,
                    from: "them",
                  },
                ]);
                messageParent.current && autoAnimate(messageParent.current);

                bottomRef.current?.scrollIntoView();
              }}
            >
              <div className="flex w-full rounded-2xl">
                <input
                  autoFocus
                  ref={inputBoxRef}
                  value={message}
                  placeholder="Type your message..."
                  onChange={(e) => setMessage(e.target.value)}
                  style={{
                    backgroundColor: messageFieldColor,
                    color: messageFieldTextColor,
                  }}
                  className="h-16 p-4 flex-grow rounded-bl-2xl"
                ></input>
                <button
                  type="submit"
                  style={{
                    backgroundColor: messageFieldColor,
                    color: messageFieldTextColor,
                  }}
                  className="p-4 rounded-br-2xl"
                >
                  <svg
                    fill={"#" + backgroundColor}
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
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatPreview;
