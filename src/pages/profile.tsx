import React, { useEffect } from "react";
import Select from "react-select";
import Link from "next/link";
import { useDropzone } from "react-dropzone";
import { FaImage, FaSpinner, FaUpload } from "react-icons/fa";
import axios from "axios";
import Resizer from "react-image-file-resizer";
import {
  useMeQuery,
  useUploadProfilePictureMutation,
} from "@/generated/graphql";
import { useRouter } from "next/router";
import { withApollo } from "@/utils/withApollo";
import SubscriptionFeature from "@/components/BillingComponents/SubscriptionFeature";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const { data: UserData, loading: UserLoading } = useMeQuery();
  const [uploadProfilePicture] = useUploadProfilePictureMutation();

  //   useEffect(() => {
  //     console.log(UserData?.me);
  //     if (!loading && !UserData?.me) {
  //       // console.log(data);
  //       router.replace("/login");
  //       // console.log(data.me);
  //     }
  //   }, [UserData, UserLoading, router]);

  useEffect(() => {
    if (UserData) {
      if (UserData.me) {
        document.title = `Profile | ${UserData.me.fullName}`;
      }
    }
  }, [UserData]);

  const CustomOption = ({ innerProps, isDisabled, value, label }: any) => {
    return !isDisabled ? (
      <div {...innerProps}>
        <div className="p-4 hover:bg-[#dccbff] border-b-2">
          <p className="">{label}</p>
          <a
            target="_blank"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="text-secondary"
            href={`/events/${value}`}
          >
            View Event &gt;
          </a>
        </div>
      </div>
    ) : null;
  };

  const CustomOptionWebinar = ({
    innerProps,
    isDisabled,
    value,
    label,
  }: any) => {
    return !isDisabled ? (
      <div {...innerProps}>
        <div className="p-4 hover:bg-[#dccbff] border-b-2">
          <p className="">{label}</p>
          <a
            target="_blank"
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="text-secondary"
            href={`/webinars/${value}`}
          >
            View Event &gt;
          </a>
        </div>
      </div>
    ) : null;
  };

  const defaultValues = {
    fullName: "",
    company: "",
    email: "",
    title: "",
    noOfEmployees: "",
    stageOfAIAdoption: "",
    whereDidYouHearAboutUs: "",
    operations: "",
  };

  const [pictureHover, setPictureHover] = React.useState(false);
  const [emailLoading, setEmailLoading] = React.useState(false);
  const [formValues, setFormValues] = React.useState(defaultValues);
  //   const [webinar]
  const [error, setError] = React.useState("");
  const emailRef = React.useRef<HTMLDivElement>(null);
  const errorRef = React.useRef<HTMLDivElement>(null);
  const [file, setFile] = React.useState<any>(null);
  const [modal, setModal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [tab, setTab] = React.useState<"profile" | "subscription">("profile");

  const [dinnerEvent, setDinnerEvent] = React.useState<null | {
    value: number;
    label: string;
  }>(null);
  const [webinar, setWebinar] = React.useState<null | {
    value: number;
    label: string;
  }>(null);

  const [imageURL, setImageURL] = React.useState("");
  const [mainImageURL, setMainImageURL] = React.useState(
    "https://res.cloudinary.com/infrastructure-ambulance/image/upload/v1688123065/heroani1_wcle97.webp"
  );
  const [imageID, setImageID] = React.useState(34);
  const [fileName, setFileName] = React.useState("");

  useEffect(() => {
    // console.log(user);
    if (UserData) {
      if (UserData.me) {
        setFormValues({
          fullName: UserData.me.fullName,
          company: UserData.me.company || "",
          email: UserData.me.email,
          title: UserData.me.title || "",
          noOfEmployees: UserData.me.noOfEmployees || "",
          stageOfAIAdoption: UserData.me.stageOfAIAdoption || "",
          whereDidYouHearAboutUs: UserData.me.whereDidYouHearAboutUs || "",
          operations: UserData.me.operations || "",
        });

        if (UserData.me.picture) {
          //   setImageID(UserData.me.picture);
          setMainImageURL(UserData.me.picture);
        }
      }
    }
  }, [UserData]);

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

  //   useEffect(() => {
  //   if (logo) {
  //     setImageURL(URL.createObjectURL(logo));
  //   }
  // }, [logo]);

  // const onDrop = useCallback(
  //   (acceptedFiles: any) => {
  //     // setError("");
  //     const file = acceptedFiles[0];
  //     if (!file) {
  //       return;
  //     }
  //     // console.log(file);

  //     // const myRenamedFile = new File([file], file.name.replace(/ /g, "_"), {
  //     //   type: file.type,
  //     // });

  //     // file = myRenamedFile;
  //     // console.log(file);

  //     setImageURL(URL.createObjectURL(file));

  //     setLogo(file);

  //     console.log(logo, file);
  //   },

  //   [setLogo, logo]
  // );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
    },
  });

  if (UserLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <FaSpinner className="animate-spin" />
      </div>
    );
  }

  if (!UserLoading && !UserData?.me) {
    return <div>You are not signed in.</div>;
  }

  return (
    <div
      className={
        "max-w-6xl mx-auto " +
        (modal
          ? " h-screen overflow-hidden"
          : " overflow-x-hidden overflow-auto h-full")
      }
    >
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
           fade-in
           "
        ref={emailRef}
      >
        <div className="flex items-center min-h-[65px]">
          Your Profile has been succefully updated!!
        </div>
      </div>

      <div
        className="
          bg-[#ed2e7e]
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
        ref={errorRef}
      >
        <div className="flex items-center min-h-[65px]">{error}</div>
      </div>
      <nav className=" w-full cut-off:fixed top-0 z-[55] py-6 bg-white max-w-7xl mx-auto">
        <div className=" flex justify-between items-center px-8">
          <Link href="/" className="w-full lg:w-fit">
            <div className="flex items-center hover:cursor-pointer">
              <img src="/logo.png" alt="logo" className="w-14" />
              <p className="ml-4 font-semibold text-3xl md:text-4xl">
                Agents.ai
              </p>
            </div>
          </Link>
        </div>
      </nav>
      <div className="p-8 mt-20">
        <div className="flex  mb-4 font-semibold">
          <button
            className={
              " py-2 px-4 text-sm hover:opacity-80 " +
              (tab === "profile"
                ? "border-b-2 border-primary font-semibold"
                : "font-normal")
            }
            onClick={() => setTab("profile")}
          >
            My Profile
          </button>
          <button
            className={
              " py-2 px-4 text-sm hover:opacity-80 " +
              (tab === "subscription"
                ? "border-b-2 border-primary font-semibold"
                : "font-normal")
            }
            onClick={() => setTab("subscription")}
          >
            My Subscriptions
          </button>
        </div>

        {tab === "profile" && (
          <div className="mt-12">
            <h1 className="head-text">Update Profile</h1>
            <div className="md:flex mt-8">
              {" "}
              <div className="flex flex-col items-center md:mr-12">
                <button
                  onMouseEnter={() => setPictureHover(true)}
                  onMouseLeave={() => setPictureHover(false)}
                  onClick={() => {
                    setModal(true);
                  }}
                  className=" relative w-60 h-60 rounded-full mb-4 md:mb-0 md:mr-8"
                >
                  <img
                    src={`${mainImageURL}`}
                    alt="profile picture"
                    className="w-60 h-60 object-cover rounded-full border-4 border-secondary mb-4 md:mb-0 md:mr-8"
                  />
                  {pictureHover && (
                    <div className="absolute top-0 bg-black opacity-50 text-white w-60 h-60 rounded-full  mb-4 md:mb-0 md:mr-8 flex items-center justify-center"></div>
                  )}
                  {pictureHover && (
                    <div className="absolute top-0 font-semibold text-white w-60 h-60 rounded-full  mb-4 md:mb-0 md:mr-8 flex items-center justify-center">
                      Change Picture
                    </div>
                  )}
                </button>
                {/* <ProfileEventsList user={user} /> */}
              </div>
              <div className="w-full">
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    const activateError = () => {
                      errorRef.current!.classList.remove("hidden");
                      setTimeout(() => {
                        errorRef.current!.classList.add("hidden");
                      }, 3000);
                    };
                    if (!formValues.fullName) {
                      setError("Name is required");
                      activateError();
                      return;
                    }

                    if (!formValues.email) {
                      setError("Email is required");
                      activateError();
                      return;
                    }

                    setEmailLoading(true);
                    // console.log(webinar && webinar.value);

                    // const response = await sendEmail(
                    //   {
                    //     ...formValues,
                    //     dinner_event: dinnerEvent && dinnerEvent.value,
                    //     dinnerEventLabel: dinnerEvent && dinnerEvent.label,
                    //     webinar: webinar && webinar.value,
                    //     webinarLabel: webinar && webinar.label,
                    //   },
                    //   token
                    // );

                    const response = await axios.put(
                      `${process.env.NEXT_PUBLIC_API_URL}/api/update-profile`,
                      {
                        formValues: {
                          ...formValues,
                          id: UserData?.me?.id,
                        },
                        pictureUrl: imageURL,
                      }
                    );

                    if (response.data === true) {
                      setEmailLoading(false);
                      emailRef.current!.classList.remove("hidden");
                      setTimeout(() => {
                        emailRef.current!.classList.add("hidden");
                      }, 3000);
                      //reload window
                      window.location.reload();
                      /* register succeeded */
                      //   setRegSuccess(true);
                    } else {
                      setError(response.data);
                      //   setToken("");
                      setEmailLoading(false);
                      errorRef.current!.classList.remove("hidden");
                      setTimeout(() => {
                        errorRef.current!.classList.add("hidden");
                      }, 3000);
                      /* register failed */
                      //   setRegSuccess(false);
                    }
                  }}
                >
                  <div className="md:flex w-full">
                    <div className="w-full">
                      <label className="block">Full Name*</label>
                      <input
                        value={formValues.fullName}
                        onChange={(e) =>
                          setFormValues({
                            ...formValues,
                            fullName: e.target.value,
                          })
                        }
                        type="text"
                        placeholder="Enter your First Name"
                        className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <label className="block">Company</label>
                    <input
                      value={formValues.company}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          company: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Enter your Company"
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block">Job Title*</label>
                    <input
                      value={formValues.title}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          title: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Enter your Title"
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block">
                      Email &#40;Cannot be changed&#41;
                    </label>
                    <input
                      value={formValues.email}
                      //   onChange={(e) =>
                      //     setFormValues({
                      //       ...formValues,
                      //       email: e.target.value,
                      //     })
                      //   }
                      type="email"
                      placeholder="Enter your Email"
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    {/* noOfEmployees: "",
    stageOfAIAdoption: "",
    whereDidYouHearAboutUs: "",
    operations: "", */}
                    <label className="block">
                      No of Employees in your current company
                    </label>
                    <input
                      value={formValues.noOfEmployees}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          noOfEmployees: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Enter your Linkedin URL"
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block">Stage of AI adoption</label>
                    <input
                      value={formValues.stageOfAIAdoption}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          stageOfAIAdoption: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Enter your Dietary Restrictions"
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="block">
                      Where did you hear about us?
                    </label>
                    <input
                      value={formValues.whereDidYouHearAboutUs}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          whereDidYouHearAboutUs: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Enter your Dietary Restrictions"
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block">
                      In what operations do you use AI?
                    </label>
                    <input
                      value={formValues.operations}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          operations: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Enter your Dietary Restrictions"
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>

                  {/* <div
                    className="g-recaptcha"
                    data-sitekey={SITE_KEY}
                    // data-callback="onSubmit"
                    // data-size="invisible"
                  ></div> */}

                  <div className="mt-8">
                    <button
                      type="submit"
                      className="bg-secondary hover:opacity-90 text-white text-xl p-4 w-[200px] rounded-xl flex justify-center"
                    >
                      {emailLoading ? (
                        <div className="scale-95">
                          <FaSpinner className="animate-spin" />
                        </div>
                      ) : (
                        <p>Update</p>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        {tab === "subscription" && (
          <div className="mt-12">
            <h1 className="head-text">Your Subscriptions</h1>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h2 className="text-2xl font-semibold">Chatbot Subscription</h2>
                {UserData?.me?.subscription === "Intern" && (
                  <div className="bg-white shadow-lg rounded-md p-4">
                    <h1 className="text-2xl font-bold mb-2">Intern</h1>
                    <p className="text-gray-500 mb-8">
                      For non commercial usage and testing
                    </p>
                    <SubscriptionFeature title="Price" value="Free" />
                    <SubscriptionFeature title="No of Bots" value="1" />
                    <SubscriptionFeature
                      title="Messages per month"
                      value="50"
                    />
                    <SubscriptionFeature
                      title="No of Embeds"
                      value="Unlimited"
                    />
                    <SubscriptionFeature title="No of Data Sources" value="1" />
                    <SubscriptionFeature
                      title="Multiple Languages"
                      value="No"
                    />
                    <SubscriptionFeature
                      title="No Code Web AI Builder"
                      value="Yes"
                    />
                    <SubscriptionFeature
                      title="Knowledge Base Edits"
                      value="Limited"
                    />
                    <SubscriptionFeature
                      title="AI Retraining"
                      value="Limited"
                    />
                    <div className="mt-8">
                      <Link href="/billingAndPricing">
                        <button className="bg-secondary text-white rounded-md px-4 py-2 w-40">
                          Upgrade
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
                {UserData?.me?.subscription === "Supervised" && (
                  <div className="bg-white shadow-lg rounded-md p-4">
                    <h1 className="text-2xl font-bold mb-2">Supervised</h1>
                    <p className="text-gray-500 mb-8">
                      Great fo small businesses or client projects
                    </p>
                    <SubscriptionFeature title="Price" value="$19/month" />
                    <SubscriptionFeature title="No of Bots" value="5" />
                    <SubscriptionFeature
                      title="Messages per month"
                      value="2000"
                    />
                    <SubscriptionFeature
                      title="No of Embeds"
                      value="Unlimited"
                    />
                    <SubscriptionFeature
                      title="No of Data Sources"
                      value="10"
                    />
                    <SubscriptionFeature
                      title="Multiple Languages"
                      value="No"
                    />
                    <SubscriptionFeature
                      title="No Code Web AI Builder"
                      value="Yes"
                    />
                    <SubscriptionFeature
                      title="Knowledge Base Edits"
                      value="Unlimited"
                    />
                    <SubscriptionFeature
                      title="AI Retraining"
                      value="Unlimited"
                    />
                    <div className="mt-8">
                      <Link href="/billingAndPricing">
                        <button className="bg-secondary text-white rounded-md px-4 py-2 w-40">
                          Upgrade
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
                {UserData?.me?.subscription === "Unsupervised" && (
                  <div className="bg-white shadow-lg rounded-md p-4">
                    <h1 className="text-2xl font-bold mb-2">Unsupervised</h1>
                    <p className="text-gray-500 mb-8">
                      Perfect for businesses who are scaling up
                    </p>
                    <SubscriptionFeature title="Price" value="$49/month" />
                    <SubscriptionFeature title="No of Bots" value="10" />
                    <SubscriptionFeature
                      title="Messages per month"
                      value="5000"
                    />
                    <SubscriptionFeature
                      title="No of Embeds"
                      value="Unlimited"
                    />
                    <SubscriptionFeature
                      title="No of Data Sources"
                      value="Unlimited"
                    />
                    <SubscriptionFeature
                      title="Multiple Languages"
                      value="Yes"
                    />
                    <SubscriptionFeature
                      title="No Code Web AI Builder"
                      value="Yes"
                    />
                    <SubscriptionFeature
                      title="Knowledge Base Edits"
                      value="Unlimited"
                    />
                    <SubscriptionFeature
                      title="AI Retraining"
                      value="Unlimited"
                    />
                    <div className="mt-8">
                      <Link href="/billingAndPricing">
                        <button className="bg-secondary text-white rounded-md px-4 py-2 w-40">
                          Upgrade
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
                {UserData?.me?.subscription === "Singularity" && (
                  <div className="bg-white shadow-lg rounded-md p-4">
                    <h1 className="text-2xl font-bold mb-2">Singularity</h1>
                    <p className="text-gray-500 mb-8">
                      Perfect for companies with a lot of trafic
                    </p>
                    <SubscriptionFeature title="Price" value="$99/month" />
                    <SubscriptionFeature title="No of Bots" value="Unlimited" />
                    <SubscriptionFeature
                      title="Messages per month"
                      value="10000"
                    />
                    <SubscriptionFeature
                      title="No of Embeds"
                      value="Unlimited"
                    />
                    <SubscriptionFeature
                      title="No of Data Sources"
                      value="Unlimited"
                    />
                    <SubscriptionFeature
                      title="Multiple Languages"
                      value="Yes"
                    />
                    <SubscriptionFeature
                      title="No Code Web AI Builder"
                      value="Yes"
                    />
                    <SubscriptionFeature
                      title="Knowledge Base Edits"
                      value="Unlimited"
                    />
                    <SubscriptionFeature
                      title="AI Retraining"
                      value="Unlimited"
                    />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-2xl font-semibold">
                  Auto Agent Subscription
                </h2>
                {UserData?.me?.subscription === "Intern" && (
                  <div className="bg-white shadow-lg rounded-md p-4">
                    <h1 className="text-2xl font-bold mb-2">Starter</h1>
                    <p className="text-gray-500 mb-8">
                      For non commercial usage and testing
                    </p>
                    <SubscriptionFeature title="Price" value="$29" />

                    <SubscriptionFeature title="Agents/mo" value="1" />
                    <SubscriptionFeature
                      title="Multiple Languages"
                      value="No"
                    />
                    <SubscriptionFeature title="Tasks/Agent/month" value="20" />
                    <SubscriptionFeature
                      title="Enhanced Search"
                      value="Not Available"
                    />
                    <SubscriptionFeature
                      title="Read/Write Files"
                      value="Not Available"
                    />
                    <SubscriptionFeature
                      title="Early Access"
                      value="Not Available"
                    />

                    <div className="mt-8">
                      <Link href="/billing-auto-agent">
                        <button className="bg-secondary text-white rounded-md px-4 py-2 w-40">
                          Upgrade
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
                {UserData?.me?.subscription === "Pro" && (
                  <div className="bg-white shadow-lg rounded-md p-4">
                    <h1 className="text-2xl font-bold mb-2">Pro</h1>
                    <p className="text-gray-500 mb-8">
                      For professionals and small businesses
                    </p>
                    <SubscriptionFeature title="Price" value="Free" />
                    <SubscriptionFeature title="GPT Verstion" value="GPT-4" />
                    <SubscriptionFeature title="Agents/month" value="20" />
                    <SubscriptionFeature title="Tasks/Agent/month" value="50" />
                    {/* <SubscriptionFeature
                      title="Document Conversation/month"
                      value="20"
                    />
                    <SubscriptionFeature
                      title="Chats Conversation/month"
                      value="100"
                    /> */}
                    <SubscriptionFeature
                      title="Enhanced Search"
                      value="Available"
                    />
                    <SubscriptionFeature
                      title="Read/Write Files"
                      value="Available"
                    />
                    <SubscriptionFeature
                      title="Early Access"
                      value="Available"
                    />
                    <div className="mt-8">
                      <Link href="/billing-auto-agent">
                        <button className="bg-secondary text-white rounded-md px-4 py-2 w-40">
                          Upgrade
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
                {UserData?.me?.subscription === "Elite" && (
                  <div className="bg-white shadow-lg rounded-md p-4">
                    <h1 className="text-2xl font-bold mb-2">Elite</h1>
                    <p className="text-gray-500 mb-8">
                      For commercial usage and large businesses
                    </p>
                    <SubscriptionFeature title="Price" value="$99" />
                    <SubscriptionFeature title="GPT Verstion" value="GPT-4" />
                    <SubscriptionFeature title="Agents/month" value="60" />
                    <SubscriptionFeature
                      title="Tasks/Agent/month"
                      value="100"
                    />
                    {/* <SubscriptionFeature
                      title="Document Conversation/month"
                      value="60"
                    />
                    <SubscriptionFeature
                      title="Chats Conversation/month"
                      value="200"
                    /> */}
                    <SubscriptionFeature
                      title="Enhanced Search"
                      value="Available"
                    />
                    <SubscriptionFeature
                      title="Read/Write Files"
                      value="Available"
                    />
                    <SubscriptionFeature
                      title="Early Access"
                      value="Available"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
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
                  Upload Profile Picture
                </div>

                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    setError("");

                    setLoading(true);

                    const formData = new FormData();
                    formData.append("files", file);
                    if (!file) {
                      return;
                    }
                    if (!UserData?.me?.id) {
                      return;
                    }

                    const response = await uploadProfilePicture({
                      variables: {
                        file: file,
                        id: UserData?.me?.id,
                        fileName: fileName,
                      },
                    });
                    if (!response.data?.uploadProfilePicture) {
                      return;
                    }
                    // console.log(response.data);

                    // setImageID(response.data[0].id);
                    setMainImageURL(response.data?.uploadProfilePicture);
                    setLoading(false);
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
                        {loading ? (
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

// export default Profile;

export default withApollo({ ssr: false })(Profile as any);
