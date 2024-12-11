import {
  GetBotsQuery,
  useCreateDataFeedWithPdfMutation,
  useCreateDataFeedWithScrappingMutation,
  useCreateDataFeedWithTextMutation,
  useDeleteDataFeedMutation,
  useGetLinksMutation,
} from "@/generated/graphql";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import React from "react";
import { useDropzone } from "react-dropzone";
import {
  FaAd,
  FaDownload,
  FaFilePdf,
  FaPlus,
  FaSpinner,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";
import Image from "next/image";
import DataFeedList from "./DataFeedList";
import Link from "next/link";
import { useRouter } from "next/router";

interface DataFeedListProps {
  data: GetBotsQuery | undefined;
  loading: Boolean;
}

const ChatbotList: React.FC<DataFeedListProps> = ({ data }) => {
  // // if(!data.me) {
  const router = useRouter();

  return (
    <div className="overflow-y-auto p-4  w-full max-w-7xl mx-auto">
      {data && data.getBots.length !== 0 && (
        <h1 className="text-3xl font-bold mb-4 mt-8 text-primary">
          Your Chat Bots
        </h1>
      )}

      <div className="w-full">
        {data && data.getBots.length === 0 && (
          <div className="flex flex-col">
            <div className="h-full flex justify-center items-center min-h-[500px] rounded-2xl flex-grow w-full bg-primaryLight">
              <button
                onClick={() => {
                  router.push("/dashboard/chatbots/create");
                }}
                className="font-bold text-2xl bg-secondary text-white rounded-xl px-4 p-2"
              >
                <div className="md:flex items-center">
                  <FaPlus className="mr-2" />
                  <p>Create Your first bot</p>
                </div>
              </button>
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-16">
          {data &&
            data.getBots.map((bot) => {
              console.log(bot.logo);
              return (
                <Link
                  href={"/data-feed/" + bot.id}
                  key={bot.id}
                  style={{
                    backgroundColor: bot.messageFieldColor,
                  }}
                  className="text-white min-h-[200px] mb-2 hover:opacity-90 rounded-xl p-8 flex justify-between items-center"
                >
                  <div className="flex w-full items-center">
                    <img
                      className="h-20 w-20 bg-cover"
                      src={bot.logo}
                      alt={bot.name}
                    ></img>
                    <div className="text-3xl ml-4 font-bold mb-2">
                      {bot.name}
                    </div>
                  </div>
                </Link>
              );
            })}

          {data && data?.getBots.length > 0 && (
            <Link
              className="bg-primaryLight min-h-[200px] hover:opacity-90 text-secondary rounded-xl flex justify-center items-center"
              href="/dashboard/chatbots/create"
            >
              <FaPlus className=" w-20 h-20" />{" "}
            </Link>
          )}
        </div>
      </div>
      {/* <button
        onClick={() => {
          setModal(true);
        }}
        disabled={loading}
        className="bg-secondary text-white hover:opacity-90 p-4 rounded-xl mt-8 flex items-center justify-center"
      >
        {loading ? (
          <div className="w-56 h-6 flex items-center justify-center">
            <FaSpinner className="animate-spin w-5 h-5" />
          </div>
        ) : (
          <div className="flex items-center w-56 h-6">
            <div className="mr-2">
              <FaPlus />{" "}
            </div>
            <div>Add New Knowledge Base</div>
          </div>
        )}
      </button> */}

      {/* {modal && (
        <div className="">
          <div
            onClick={() => {
              setModal("");
            }}
            className="fixed top-0 left-0 h-screen overflow-hidden w-full bg-black bg-opacity-50 flex justify-center items-center"
          >
            <div className="max-h-screen overflow-y-auto py-4">
              <div
                className=" rounded-xl min-h-[500px]  p-8 bg-white md:w-[500px] lg:w-[800px]"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
              </div>
            </div>
          </div>
        </div>
      )} */}

      {/* {knowledgeBaseModal && (
        <div className="">
          <div
            onClick={() => {
              setModal("");
            }}
            className="absolute top-0 left-0 h-screen overflow-hidden w-full bg-black bg-opacity-50 flex justify-center items-center"
          >
            <div className="max-h-screen overflow-y-auto py-4">
              <div
                className=" rounded-xl min-h-[500px]  p-8 bg-white md:w-[500px] lg:w-[800px]"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <div className="text-2xl font-bold mb-4">
                  Add New Knowledge Base
                </div>

                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="uploadType"
                >
                  Upload Type
                </label>

                <select
                  id="uploadType"
                  value={uploadType}
                  onChange={(e) => {
                    setUploadType(e.target.value as any);
                  }}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 "
                >
                  <option value="URL">URL</option>
                  <option value="PDF">PDF</option>
                  <option value="Text">Text</option>
                </select>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setError("");
                    if (!name) {
                      console.log("name");
                      setError("Name is required");
                      return;
                    }
                    if (uploadType === "URL" && !url) {
                      setError("Url is required");
                      return;
                    }
                    if (uploadType === "PDF" && !file) {
                      setError("Please Select a file");
                      return;
                    }

                    if (uploadType === "Text" && !text) {
                      setError("Please Enter Text");
                      return;
                    }

                    setLoading(true);

                    if (uploadType === "URL") {
                      createDataFeedWithScrapping();
                    }

                    if (uploadType === "PDF") {
                      createDataFeedWithPDF({
                        variables: {
                          name,
                          pdf: file,
                        },
                      });
                    }

                    if (uploadType === "Text") {
                      createDataFeedWithText({
                        variables: {
                          name,
                          text,
                        },
                      });
                    }

                    setModal("");
                  }}
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="username"
                    >
                      Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="username"
                      type="text"
                      placeholder="Name"
                      value={name}
                      onChange={(e) => {
                        setError("");
                        setName(e.target.value);
                      }}
                    />
                  </div>
                  {uploadType === "URL" && (
                    <div className="mb-4">
                      <div>
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="username"
                        >
                          Url
                        </label>
                        <input
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Url"
                          value={url}
                          onChange={(e) => {
                            setError("");
                            setUrl(e.target.value);
                          }}
                        />
                      </div>
                      <button
                        type="button"
                        className="bg-secondary text-white hover:opacity-90 p-4 rounded-xl mt-2 w-full text-center flex items-center"
                        onClick={async () => {
                          setError("");
                          if (!url) {
                            setError("Url is required");
                            return;
                          }
                          setFetchUrlLoading(true);
                          const res = await getLinks();
                          if (res.data) {
                            if (res.data.getLinks.length > 0) {
                              //reverse the array
                              const reversedLinks = res.data.getLinks.reverse();

                              for (let i = 0; i < reversedLinks.length; i++) {
                                const link = reversedLinks[i];

                                if (!urls.includes(link)) {
                                  setUrls((oldUrls) => [link, ...oldUrls]);
                                }
                              }
                            }
                            if (!urls.includes(url)) {
                              setUrls((oldUrls) => [url, ...oldUrls]);
                            }
                          }
                          setUrl("");
                          setFetchUrlLoading(false);
                        }}
                      >
                        {fetchUrlLoading ? (
                          <div className="w-full flex justify-center">
                            <FaSpinner className="animate-spin w-5 h-5 mr-2" />
                          </div>
                        ) : (
                          // <div className="flex justify-center w-full">
                          //   <div className="scale-50">
                          //     <LoadingSpinner />
                          //   </div>
                          // </div>
                          <div className="flex items-center justify-center w-full">
                            <FaDownload />
                            <p className="w-full text-center">
                              <span className="text-center">
                                {urls.length === 0 ? (
                                  <span>Fetch All Links</span>
                                ) : (
                                  <span>Fetch More Links</span>
                                )}
                              </span>
                            </p>
                          </div>
                        )}
                      </button>
                      {error && (
                        <div className="text-red-500 pt-2">{error}</div>
                      )}

                      <ul ref={parent} className="mt-4">
                        {urls.map((url, index) => {
                          console.log(url);
                          return (
                            <li
                              key={index}
                              className="text-white flex bg-primary mb-2 rounded-xl p-2"
                            >
                              <input
                                className="text-white bg-primary w-full"
                                value={url}
                                onChange={() => {}}
                              />
                              <button
                                type="button"
                                className="ml-2"
                                onClick={() => {
                                  setUrls((urls) => {
                                    return urls.filter((u) => u !== url);
                                  });
                                }}
                              >
                                <FaTrash />
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                  {uploadType === "PDF" && (
                    <div className="mb-4">
                      <div
                        {...getRootProps()}
                        className="w-full h-24 border-2 border-separate flex items-center justify-center"
                      >
                        <input {...getInputProps()} multiple />
                        {isDragActive ? (
                          <FaUpload className="w-10 h-10 text-secondary" />
                        ) : file ? (
                          <div className="flex">
                            <FaFilePdf className="w-5 h-5 mr-2" />
                            <p className="">{file.name}</p>
                          </div>
                        ) : (
                          <div className="flex">
                            <FaUpload className="w-5 h-5 mr-2" />
                            <p>Drag your PDF here</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {uploadType === "Text" && (
                    <div>
                      <div className="mb-4">
                        <label
                          className="block text-gray-700 text-sm font-bold mb-2"
                          htmlFor="text"
                        >
                          Text
                        </label>
                        <textarea
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-64"
                          id="text"
                          placeholder="Put your text here"
                          value={text}
                          onChange={(e) => {
                            setError("");
                            setText(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {uploadType !== "URL" && error && (
                    <div className="text-red-500 ">{error}</div>
                  )}
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-secondary text-white hover:opacity-90 p-4 rounded-xl mt-2 flex items-center"
                    >
                      <div className="mr-2">
                        <FaPlus />{" "}
                      </div>
                      {loading ? (
                        <div>
                          <LoadingSpinner />
                        </div>
                      ) : (
                        <div>Add New Knowledge Base</div>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ChatbotList;
