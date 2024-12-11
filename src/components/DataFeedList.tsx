import {
  GetDataFeedsQuery,
  useCreateDataFeedWithPdfMutation,
  useCreateDataFeedWithScrappingMutation,
  useCreateDataFeedWithTextMutation,
  useDeleteDataFeedMutation,
  useGetLinksMutation,
  useTrainBotMutation,
} from "@/generated/graphql";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import React from "react";
import { useDropzone } from "react-dropzone";
import {
  FaDownload,
  FaFilePdf,
  FaPlay,
  FaPlus,
  FaSpinner,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import LoadingSpinner from "./LoadingSpinner";
//@ts-ignore
import Select from "react-select";

interface DataFeedListProps {
  data: GetDataFeedsQuery | undefined;
  loading: boolean;
  botId: number | null;
}

const DataFeedList: React.FC<DataFeedListProps> = ({
  data,
  loading: dataLoading,
  botId,
}) => {
  const [modal, setModal] = React.useState(false);
  const [name, setName] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [depth, setDepth] = React.useState(5);
  const [maxNoUrls, setMaxNoUrls] = React.useState(50);
  const [urls, setUrls] = React.useState<string[]>([]);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [fetchUrlLoading, setFetchUrlLoading] = React.useState(false);
  const [training, setTraining] = React.useState(false);
  const [uploadType, setUploadType] = React.useState<"URL" | "PDF" | "Text">(
    "URL"
  );
  // const [parent] = useAutoAnimate<any>();
  const [file, setFile] = React.useState<File | null>(null);
  const [text, setText] = React.useState<string>("");

  const onDrop = React.useCallback((acceptedFiles: any) => {
    setError("");
    const file = acceptedFiles[0];
    if (!file) {
      return;
    }
    setFile(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "application/pdf": [".pdf"],
    },
  });

  const clearForm = () => {
    setName("");
    setUrl("");
    setError("");
    setUrls([]);
    setFile(null);
    setText("");
  };

  const [createDataFeedWithScrapping] = useCreateDataFeedWithScrappingMutation({
    variables: {
      name,
      urls: urls,
      botId: botId as number,
    },
    update: (cache: any, data: any) => {
      // console.log(data);
      if (!data) {
        setLoading(false);
        return null;
      }
      clearForm();
      cache.evict({ fieldName: "getDataFeeds" });
      setLoading(false);
      // cache.writeQuery<GetDataFeedsQuery>({
      //   query: GetDataFeedsDocument,
      //   data: {
      //     getDataFeeds: [
      //       ...data.getDataFeeds,
      //       {
      //         id: data.createDataFeedWithScrapping.id,
      //         name: data.create.name,
      //       },
      //     ],
      //   },
      // });
    },
  });
  const [createDataFeedWithText] = useCreateDataFeedWithTextMutation({
    update: (cache: any, data: any) => {
      if (!data) {
        setLoading(false);
        return null;
      }
      clearForm();
      cache.evict({ fieldName: "getDataFeeds" });
      setLoading(false);
    },
  });
  const [createDataFeedWithPDF] = useCreateDataFeedWithPdfMutation({
    context: {
      headers: {
        "apollo-require-preflight": true,
      },
    },
    update: (cache: any, data: any) => {
      console.log(data);
      if (!data) {
        setLoading(false);
        return null;
      }
      clearForm();
      cache.evict({ fieldName: "getDataFeeds" });
      setLoading(false);
    },
  });

  const [deleteDataFeed] = useDeleteDataFeedMutation({
    update: (cache: any, data: any) => {
      if (!data) {
        return null;
      }
      cache.evict({ fieldName: "getDataFeeds" });
    },
  });

  const [getLinks] = useGetLinksMutation({
    variables: {
      url,
      depth,
      maxNoUrls,
    },
  });

  const [trainBot] = useTrainBotMutation({
    variables: {
      botId: botId as number,
    },
  });

  const trainRef = React.useRef<HTMLDivElement>(null);

  if (dataLoading) {
    return (
      <div className="h-screen mx-auto flex flex-col justify-center">
        {/* <MySidebar /> */}
        <LoadingSpinner />
      </div>
    );
    // return (
    //   // <div className="p-2">An error occured. Check you network connection.</div>
    // );
  }
  // // if(!data.me) {

  const CustomOption = ({ innerProps, isDisabled, value, label }: any) => {
    return !isDisabled ? (
      <div {...innerProps}>
        <div className="p-4 hover:bg-[#dccbff] border-b-2">
          <p className="">{label}</p>
        </div>
      </div>
    ) : null;
  };

  return (
    <div className="overflow-y-auto p-4 w-full bg-white m-4 rounded-2xl h-[calc(100vh-90px)] pb-8">
      <div
        className="
          bg-[#00ba88]
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
          fade-in
        "
        ref={trainRef}
      >
        <div className="flex items-center min-h-[65px]">
          Training successful. You can now test your bot.
        </div>
      </div>
      <h1 className="head-inner">Knowledge Base</h1>
      <p className="text-lg mb-8">
        This is your knowledge base. You can upload urls or pdfs here which will
        be used to train your bot.
      </p>
      <div className="w-full">
        {data &&
          data.getDataFeeds.map((feed: any) => {
            return (
              <div
                key={feed.id}
                className="text-gray-700 bg-[#f1f1f1] mb-2 rounded-xl p-8 flex justify-between items-center"
              >
                <div>
                  <div className="text-xl font-bold mb-2">{feed.name}</div>
                  {!feed.url && !feed.fileName && feed.descriptionSnippet && (
                    <div className="text-sm">
                      Text: {feed.descriptionSnippet}
                    </div>
                  )}
                  {feed.fileName && (
                    <div className="flex">
                      <FaFilePdf className="w-5 h-5 mr-2" />
                      <p className="">{feed.fileName}</p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => {
                    deleteDataFeed({
                      variables: {
                        id: feed.id,
                      },
                    });
                  }}
                  className="hover:opacity-90"
                >
                  <FaTrash className="text-red-500 " />
                </button>
              </div>
            );
          })}
      </div>
      <button
        onClick={() => {
          setModal(true);
        }}
        disabled={loading}
        className="bg-secondary w-full text-white hover:opacity-90 p-4 rounded-xl  flex items-center justify-center"
      >
        {loading ? (
          <div className="w-56 h-6 flex items-center justify-center">
            <FaSpinner className="animate-spin w-5 h-5" />
          </div>
        ) : (
          <div className="flex items-center h-2">
            <div className="mr-2">
              <FaPlus />{" "}
            </div>
            <div>Add New Knowledge Base</div>
          </div>
        )}
      </button>

      <button
        onClick={async () => {
          setTraining(true);
          const response = await trainBot();
          if (response.data?.trainBot) {
            trainRef.current?.classList.remove("hidden");
          }
          setTimeout(() => {
            trainRef.current?.classList.add("hidden");
          }, 3000);
          setTraining(false);
        }}
        disabled={training}
        className="bg-secondary w-full text-white hover:opacity-90 p-4 rounded-xl mt-4 flex items-center justify-center"
      >
        {training ? (
          <div className="w-56 h-6 flex items-center justify-center">
            <FaSpinner className="animate-spin w-5 h-5" />
          </div>
        ) : (
          <div className="flex items-center h-2">
            <div className="mr-2">
              <FaPlay />{" "}
            </div>
            <div>Train Bot</div>
          </div>
        )}
      </button>

      {modal && (
        <div className="">
          <div
            onClick={() => {
              setModal(false);
            }}
            className="absolute z-10 top-0 left-0 h-screen overflow-hidden w-full bg-black bg-opacity-50 flex justify-center items-center"
          >
            <div className="max-h-screen z-20 overflow-y-auto py-4">
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

                <Select
                  className="shadow border rounded w-full text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 "
                  options={[
                    {
                      //@ts-ignore
                      value: "URL",
                      label: "URL - A website to scrape",
                    },
                    {
                      //@ts-ignore
                      value: "PDF",
                      label: "PDF - A PDF file",
                    },
                    {
                      //@ts-ignore
                      value: "Text",
                      label: "Text - Text input to train your bot",
                    },
                  ]}
                  components={{ Option: CustomOption }}
                  // defaultValue={dinnerEvent}
                  value={{
                    value: uploadType,
                    label: uploadType,
                  }}
                  //@ts-ignore
                  onChange={(e) => {
                    setUploadType(e!.value);
                  }}
                />
                {/* <select
                  id="uploadType"
                  value={uploadType}
                  onChange={(e) => {
                    setUploadType(e.target.value as any);
                  }}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-4 "
                >
                  <option value="URL">URL</option>
                  <option value="PDF">PDF</option>
                  <option value="Text">Text</option>
                </select> */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setError("");
                    if (!name) {
                      console.log("name");
                      setError("Name is required");
                      return;
                    }
                    if (uploadType === "URL" && urls.length === 0) {
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
                          botId: botId as number,
                        },
                      });
                    }

                    if (uploadType === "Text") {
                      createDataFeedWithText({
                        variables: {
                          name,
                          text,
                          botId: botId as number,
                        },
                      });
                    }

                    setModal(false);
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
                      <div className="flex">
                        <div className="w-1/2 mr-2">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                            htmlFor="depth"
                          >
                            Depth
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="depth"
                            type="number"
                            placeholder="Depth"
                            value={depth}
                            onChange={(e) => {
                              setError("");
                              setDepth(parseInt(e.target.value));
                            }}
                          />
                        </div>
                        <div className="w-1/2">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2 mt-4"
                            htmlFor="maxNoUrls"
                          >
                            Max No. Urls
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="maxNoUrls"
                            type="number"
                            placeholder="Max No. Urls"
                            value={maxNoUrls}
                            onChange={(e) => {
                              setError("");
                              setMaxNoUrls(parseInt(e.target.value));
                            }}
                          />
                        </div>
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
                              const reversedLinksOld =
                                res.data.getLinks.reverse();
                              //select upto maxNoUrls
                              const reversedLinks = reversedLinksOld.slice(
                                0,
                                maxNoUrls
                              );
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

                      <ul className="mt-4">
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
      )}
    </div>
  );
};

export default DataFeedList;
