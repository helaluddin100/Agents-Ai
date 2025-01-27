import { useEffect, useState, useRef } from "react";
import ConversationsBar from "../../components/ConversationsBar";
import io, { Socket } from "socket.io-client";
import { FaTachometerAlt } from "react-icons/fa";
import { MenuItem, Menu } from "react-pro-sidebar";
import MySidebar from "@/components/Sidebar";
import { useRouter } from "next/router";

const socket = io(process.env.NEXT_PUBLIC_API_URL as string, {
  transports: ["websocket", "polling", "flashsocket"],
});

let wasLastMessageVoice = false;
let uuids: string[] = [];

function SendMessage() {
  // let socket: ReturnType<typeof io>;

  const messageDivRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { id } = router.query;
  const messageInputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");

  const [senders, setSenders] = useState<
    {
      name: string | null;
      number: string | null;
      messages: { id: string; message: string; from: "us" | "them" }[];
    }[]
  >([]);
  const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(false);
  const [toggled, setToggled] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [newRecipient, setNewRecipient] = useState("");
  const [transcript, setTranscript] = useState("");
  const [language, setLanguage] = useState<"en-US" | "ne-NP">("en-US");
  const [listening, setListening] = useState(false);
  const [finalTranscript, setFinalTranscript] = useState<string | null>(null);
  const [isSpeechRecognitionStarted, setSpeechRecognitionStarted] =
    useState(false);

  const [selectedSender, setSelectedSender] = useState<{
    name: string | null;
    number: string | null;
    messages: { message: string; from: "us" | "them" }[];
  } | null>(null);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };

  const handleImageChange = (checked: any) => {
    setImage(checked);
  };

  const handleToggleSidebar = (value: any) => {
    setToggled(value);
  };

  useEffect(() => {
    if (senders.length > 0) {
      setSelectedSender(senders[0]);
    }
    if (id) {
      socket.on("connect", () => {
        setIsConnected(true);
        console.log("connected", "bot id", id);
        socket.emit("join-room", id, localStorage.getItem("token"));
      });

      socket.on("disconnect", () => {
        setIsConnected(false);
      });

      socket.on(
        "message",
        (data: {
          message: string;
          sessionId: string;
          from: "them" | "us";
          id: string;
        }) => {
          // console.log(uuids, data.id);
          // if (uuids.includes(data.id)) {
          //   console.log("duplicate message");
          //   return;
          // }

          // uuids = [...uuids, data.id];

          // console.log("message------------------", data.message);
          setSenders((senders) => {
            if (senders.length === 0) {
              const messages = [];
              messages.push({
                message: data.message,
                from: data.from,
                id: data.id,
              });

              const newSender = {
                name: null,
                number: data.sessionId,
                messages: [...new Set([...messages])],
              } as {
                name: string | null;
                number: string | null;
                messages: {
                  message: string;
                  from: "us" | "them";
                  id: string;
                }[];
              };

              const newSenders = senders;
              newSenders.unshift(newSender);
              setSelectedSender(newSender);
              return newSenders;
            }
            const sender = senders.find(
              (sender) => sender.number === data.sessionId
            );
            if (sender) {
              //   // put the senders at top
              const newSenders = senders.filter(
                (sender) => sender.number !== data.sessionId
              );
              const messages = sender.messages;
              messages.push({
                message: data.message,
                from: data.from,
                id: data.id,
              });
              const newSender = {
                ...sender,
                messages: [...new Set([...messages])],
              } as {
                name: string | null;
                number: string | null;
                messages: {
                  message: string;
                  from: "us" | "them";
                  id: string;
                }[];
              };

              newSenders.unshift(newSender);
              if (selectedSender?.number === data.sessionId) {
                // console.log("selected sender", selectedSender);
                setSelectedSender(newSender);
              }
              return newSenders;
            } else {
              // create new sender at tup
              const messages = [];
              messages.push({
                message: data.message,
                from: data.from,
                id: data.id,
              });
              const newSender = {
                name: null,
                number: data.sessionId,
                messages: [...new Set(messages)],
              } as {
                name: string | null;
                number: string | null;
                messages: {
                  message: string;
                  from: "us" | "them";
                  id: string;
                }[];
              };

              const newSenders = senders;
              newSenders.unshift(newSender);

              return newSenders;
            }
          });
        }
      );

      // socket.on(
      //   'commune-message',
      //   (message: {
      //     name: string | null;
      //     number: string | null;
      //     messages: { message: string; from: 'us' | 'them' }[];
      //   }) => {
      //     const newSender = senders.filter(
      //       (sender) => sender.number !== message.number
      //     );
      //     newSender.unshift(message);
      //     setSenders(newSender);
      //   }
      // );

      return () => {
        socket.off("connect");
        socket.off("disconnect");
        socket.off("commune-message");
      };
    }
  }, [id]);

  useEffect(() => {
    if (messageDivRef) {
      const myDiv = messageDivRef.current;
      if (myDiv) {
        myDiv.scrollTop = myDiv.scrollHeight;
      }
    }
  }, [selectedSender, listening]);

  const emit = (message: string) => {
    const sentMessage = {
      message,
      from: "us" as "us",
      id: Math.random().toString(),
    };

    socket.emit(
      "commune-message",
      {
        message,
        recipient: selectedSender!.number,
      },
      async (message: {
        name: string | null;
        number: string | null;
        message: { message: string; from: "us" | "them"; id: string };
      }) => {
        // find the sender with the number
        const sender = senders.find(
          (sender) => sender.number === message.number
        );
        if (selectedSender) {
          if (message.number === selectedSender.number) {
            setSelectedSender({
              ...selectedSender,
              messages: [
                ...selectedSender.messages,
                sentMessage,
                message.message,
              ],
            });
            if (wasLastMessageVoice) {
              const utterance = new SpeechSynthesisUtterance();
              utterance.lang = language;
              utterance.rate = 1;
              utterance.pitch = 1;
              utterance.volume = 1;
              utterance.text = message.message.message;
              speechSynthesis.speak(utterance);
              wasLastMessageVoice = false;
              // startRecording();
            }
          }
        }

        let newSender;
        // add the message to the sender if the sender exists
        if (sender) {
          if (sender.messages) {
            sender.messages.push(sentMessage, message.message);
            newSender = senders.filter(
              (sender) => sender.number !== message.number
            );

            newSender.unshift(sender);
          } else {
            sender.messages = [sentMessage, message.message];
            newSender = senders.filter(
              (sender) => sender.number !== message.number
            );
            newSender.unshift(sender);
          }
        } else {
          newSender = senders.filter(
            (sender) => sender.number !== message.number
          );
          newSender.unshift({
            name: message.name,
            number: message.number,
            messages: [sentMessage, message.message],
          });
        }
        // add the sender to the top of the list

        setSenders(newSender);
        // console.log(selectedSender);
      }
    );
  };

  const handleMessageSubmit = (message: string) => {
    if (selectedSender) {
      const newSenders = senders.filter(
        (sender) => sender.number !== selectedSender!.number
      );
      if (selectedSender.messages) {
        newSenders.unshift({
          ...selectedSender!,
          messages: [...selectedSender.messages, { message, from: "us" }],
        });

        setSelectedSender({
          ...selectedSender!,
          messages: [...selectedSender.messages, { message, from: "us" }],
        });
      } else {
        newSenders.unshift({
          ...selectedSender!,
          messages: [{ message, from: "us" }],
        });
        setSelectedSender({
          ...selectedSender!,
          messages: [{ message, from: "us" }],
        });
      }
      setSenders(newSenders);
    }
    emit(message);
    // socket.send(message);
    setMessage("");
  };

  const startRecording = () => {
    if (window !== undefined) {
      setListening(true);
      const recognition = new (window as any).webkitSpeechRecognition();

      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = language;
      recognition.start();
      recognition.onstart = () => {
        setSpeechRecognitionStarted(true);
        console.log("started");
      };

      let finalTranscript = "";

      recognition.onresult = (event: any) => {
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            recognition.stop();
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        if (interimTranscript !== "") {
          finalTranscript = interimTranscript;

          setTranscript(interimTranscript);
        }
      };

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.onend = () => {
        console.log("Speech recognition ended.");
        setListening(false);
        if (finalTranscript !== "") {
          wasLastMessageVoice = true;
          handleMessageSubmit(finalTranscript);
        }
        setTranscript("");
      };
    }
  };

  const renderMessages = () => {
    if (selectedSender) {
      if (selectedSender.messages) {
        return selectedSender.messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-center ${
              message.from === "us" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`py-1 px-4 mb-2 max-w-1/2 ${
                message.from === "us"
                  ? "bg-primary text-gray-300 rounded-tl-lg rounded-br-lg"
                  : "bg-secondary max-w-lg rounded-tr-lg rounded-bl-lg"
              }`}
            >
              <p className="w-full text-justify max-w-full">
                {message.message}
              </p>
            </div>
          </div>
        ));
      }
    }
  };

  const sidebarContent = (
    <div className="py-2">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSenders([
            ...senders,
            { name: null, number: newRecipient, messages: [] },
          ]);
          setSelectedSender({ name: null, number: newRecipient, messages: [] });
          setNewRecipient("");
          if (messageInputRef) {
            const myInput = messageInputRef.current;
            if (myInput) {
              myInput.focus();
            }
          }
        }}
      >
        <div className="p-2 flex">
          <input
            className="w-full"
            type="text"
            value={newRecipient}
            onChange={(e) => setNewRecipient(e.target.value)}
            placeholder="New Conversation"
          ></input>
        </div>
      </form>
      {senders.map((sender) => (
        <div
          key={sender.number}
          onClick={() => {
            setSelectedSender(sender);
            if (messageInputRef) {
              const myInput = messageInputRef.current;
              if (myInput) {
                myInput.focus();
              }
            }
          }}
          className={`flex items-center p-2 hover:bg-gray-700 ${
            selectedSender!.number === sender.number
              ? "bg-gray-900 hover:bg-gray-900"
              : ""
          }`}
        >
          <div className="w-10 h-10 bg-gray-500 rounded-full"></div>
          <div className="ml-2">
            <div className="text-sm font-semibold text-gray-200">
              {sender.name ? sender.name : sender.number}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className={`app ${toggled ? "toggled" : ""}`}>
      <div className="h-screen w-full flex">
        <MySidebar id={id} />
        <div className="flex flex-col w-full h-screen">
          {senders.length === 0 ? (
            <div className="text-semibold text-gray-500 text-xl m-auto">
              No Messages Yet
            </div>
          ) : (
            <div className="flex flex-col h-screen justify-end items-end">
              <div
                ref={messageDivRef}
                // id="message-box"
                className="w-full p-2 overflow-y-auto overflow-x-hidden"
              >
                {renderMessages()}
                {listening && (
                  <div className="py-1 px-4 mb-2 max-w-1/2 bg-gray-800 max-w-lg rounded-tr-lg rounded-bl-lg">
                    <span className="font-bold pr-2">Listening:</span>
                    {transcript}
                    <span className="pl-2">...</span>
                  </div>
                )}
              </div>
              <form
                className="w-full"
                onSubmit={(e) => {
                  e.preventDefault();
                  handleMessageSubmit(message);
                }}
              >
                <div className="flex">
                  <input
                    ref={messageInputRef}
                    value={message}
                    placeholder="Type your message..."
                    onChange={(e) => setMessage(e.target.value)}
                    className="h-16 w-full bg-gray-700 rounded-none focus:border-gray-700"
                  ></input>
                  <button
                    onClick={startRecording}
                    className="h-16 w-16 rounded-none bg-gray-700"
                    type="button"
                  >
                    <svg
                      height="30px"
                      width="30px"
                      version="1.1"
                      id="Layer_1"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 278.163 278.163"
                      xmlSpace="preserve"
                      fill="#e5e7eb"
                      stroke="#e5e7eb"
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
                            <path
                              style={{ fill: "#15803d" }}
                              d="M225.235,94.987h-25.17V69.762c0-29.47-23.281-53.436-51.902-53.436 c-28.594,0-51.875,23.965-51.875,53.436v25.225H69.283c-3.834,0-6.957,3.177-6.957,7.148v50.067 c0,45.794,34.4,83.454,78.004,87.097v24.568h-20.596c-3.834,0-6.929,3.177-6.929,7.148c0,3.944,3.095,7.148,6.929,7.148h54.12 c3.834,0,6.957-3.204,6.957-7.148c0-3.971-3.122-7.148-6.957-7.148h-19.665v-24.568c43.603-3.643,77.976-41.302,77.976-87.097 v-50.067C232.165,98.165,229.07,94.987,225.235,94.987z M218.279,152.203c0,40.316-31.853,73.128-71.019,73.128 s-71.047-32.812-71.047-73.128v-42.918h20.076v41.713c0,29.443,23.281,53.436,51.875,53.436c28.621,0,51.902-23.993,51.902-53.436 v-41.713h18.214C218.279,109.284,218.279,152.203,218.279,152.203z"
                            ></path>{" "}
                            <g id="XMLID_18_">
                              {" "}
                              <g>
                                {" "}
                                {/* <path
                                  style={{ fill: '#e5e7eb' }}
                                  d="M169.852,114.513v20.158c0,21.582-17.036,39.139-38.016,39.139 c-20.952,0-37.988-17.556-37.988-39.139v-20.158h7.176c3.807,0,6.929-3.204,6.929-7.149c0-3.944-3.122-7.148-6.929-7.148h-7.176 V63.433h7.176c3.807,0,6.929-3.204,6.929-7.149s-3.122-7.149-6.929-7.149h-6.929c2.082-19.556,18.214-34.839,37.742-34.839 c19.556,0,35.688,15.283,37.769,34.839h-7.258c-3.834,0-6.929,3.205-6.929,7.149s3.095,7.149,6.929,7.149h7.505v36.783h-7.505 c-3.834,0-6.929,3.204-6.929,7.148s3.095,7.149,6.929,7.149C162.348,114.513,169.852,114.513,169.852,114.513z"
                                ></path>{' '} */}
                                <path
                                  style={{ fill: "#e5e7eb" }}
                                  d="M53.458,137.824L53.458,137.824c-4.18,0-7.359,3.659-6.907,7.814 c1.137,10.443,4.073,20.331,8.474,29.336c1.175,2.407,3.607,3.949,6.286,3.949h0.063c5.122,0,8.526-5.368,6.253-9.956 c-3.782-7.625-6.302-16.02-7.272-24.888C59.968,140.532,57.026,137.824,53.458,137.824z"
                                ></path>{" "}
                                <path
                                  style={{ fill: "#e5e7eb" }}
                                  d="M208.909,78.661h-25.17V53.436C183.738,23.965,160.458,0,131.836,0 c-28.594,0-51.875,23.965-51.875,53.436v25.225H52.956c-3.834,0-6.957,3.177-6.957,7.149v40.818 c0,3.834,3.109,6.943,6.943,6.943l0,0c3.834,0,6.943-3.109,6.943-6.943v-33.67h20.076v41.713 c0,29.443,23.281,53.436,51.875,53.436c28.621,0,51.902-23.993,51.902-53.436V92.958h18.214v42.918 c0,40.316-31.853,73.128-71.019,73.128c-20.528,0-39.048-9.016-52.025-23.401c-1.364-1.512-3.265-2.427-5.302-2.427l0,0 c-6.023,0-9.304,7.138-5.302,11.638c14.07,15.825,33.708,26.321,55.701,28.159v24.568h-20.596c-3.834,0-6.929,3.177-6.929,7.148 c0,3.944,3.095,7.149,6.929,7.149h54.12c3.834,0,6.957-3.204,6.957-7.149c0-3.971-3.122-7.148-6.957-7.148h-19.665v-24.568 c43.603-3.643,77.976-41.302,77.976-87.097V85.809C215.838,81.838,212.743,78.661,208.909,78.661z M169.852,100.216h-7.505 c-3.834,0-6.929,3.204-6.929,7.148s3.095,7.149,6.929,7.149h7.505v20.158c0,21.582-17.036,39.139-38.016,39.139 c-20.952,0-37.988-17.556-37.988-39.139v-20.158h7.176c3.807,0,6.929-3.204,6.929-7.149c0-3.944-3.122-7.148-6.929-7.148h-7.176 V63.433h7.176c3.807,0,6.929-3.204,6.929-7.149s-3.122-7.149-6.929-7.149h-6.929c2.082-19.556,18.214-34.839,37.742-34.839 c19.556,0,35.688,15.283,37.769,34.839h-7.258c-3.834,0-6.929,3.205-6.929,7.149s3.095,7.149,6.929,7.149h7.505v36.783H169.852z "
                                ></path>{" "}
                              </g>{" "}
                            </g>{" "}
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
        <ConversationsBar
          image={image}
          collapsed={false}
          toggled={true}
          handleToggleSidebar={() => {}}
          handleCollapsedChange={() => {}}
          sidebarContent={sidebarContent}
        />
      </div>
    </div>
  );
}

export default SendMessage;
