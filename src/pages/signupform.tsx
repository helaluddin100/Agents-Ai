import React, { useEffect, useState } from "react";
import Spinner from "../components/LoadingSpinner";
// import { Link } from "react-router-dom";
import Link from "next/link";
import Script from "next/script";
import queryString from "query-string";
import {
  useAddEmailMutation,
  useEnterUserDetailsMutation,
  useJoinWaitlistMutation,
} from "@/generated/graphql";
import { withApollo } from "@/utils/withApollo";
import Select from "react-select";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";
// import { useFetch } from "./hooks/useFetch";

interface RegitsterProps {}

const Register: React.FC<RegitsterProps> = ({}) => {
  let validityToken: any = "";

  const apolloClient = useApolloClient();

  if (typeof window !== "undefined") {
    validityToken = queryString.parse(window.location.search).token || "";
  }
  const [emailLoading, setEmailLoading] = React.useState(false);
  const [enterUserDetails] = useEnterUserDetailsMutation();
  const defaultValues = {
    company: "",
    title: "",
    operations: "",
  };
  const [noOfEmployees, setNoOfEmployees] = React.useState<null | {
    value: string;
    label: string;
  }>(null);
  const [stageOfAIAdoption, setStageOfAIAdoption] = React.useState<null | {
    value: string;
    label: string;
  }>(null);
  const [whereDidYouHearAboutUs, setWhereDidYouHearAboutUs] =
    React.useState<null | {
      value: string;
      label: string;
    }>(null);
  const [otherText, setOtherText] = React.useState("");
  const emailRef = React.useRef<HTMLDivElement>(null);
  const emailErrorRef = React.useRef<HTMLDivElement>(null);
  const [error, setError] = React.useState("");
  const [regSuccess, setRegSuccess] = React.useState(false);
  const errorRef = React.useRef<HTMLDivElement>(null);
  const [token, setToken] = useState<String | null>(null);
  const [tokenLoading, setTokenLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setFormValues({
      ...formValues,
    });
  }, []);

  const [formValues, setFormValues] = React.useState(defaultValues);

  // console.log("dinnerEvent", dinnerEvent);

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
    <div className="lg:flex">
      <Script src="https://www.google.com/recaptcha/api.js?render=6LfB_B8mAAAAALrZP9PSm9xnteroNfgh2y7ZJi9V"></Script>
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
          Registration successful. Keep checking your emails for updates!
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
        ref={emailErrorRef}
      >
        <div className="flex items-center min-h-[65px]">
          You have already registered. Please Check your Email
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
      <div className="hidden lg:block h-screen bg-register bg-cover bg-right-top w-1/2">
        <div className="flex flex-col h-screen">
          <div className="flex-1"></div>
          <div className="p-8 flex-1 flex mr-20">
            <div className="flex-grow"></div>
            <div className="max-w-md absolute bottom-28 left-8">
              <h1 className="head-text text-white max-w-lg">
                Please enter more details
              </h1>
              <p className="base-text">
                <span className="text-white">
                  Don&apos;t miss out. Join the AI revolution. Get access to 30+
                  AI tools that will help your business.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen overflow-y-auto lg:w-1/2">
        <div className="pt-8 pl-8 w-full max-w-2xl">
          <Link href="/">
            <div className="flex items-center hover:cursor-pointer">
              <img src="/logo.png" alt="logo" className="w-10 " />
              <p className="ml-4 font-semibold text-2xl md:text-3xl">
                Agents.ai
              </p>
            </div>
          </Link>
          <div className="mt-10 w-full pr-8 mb-10">
            {regSuccess ? (
              <div className="base-text">
                <h2 className="text-2xl font-semibold text-black mb-10">
                  Thank you for registering to the Agents.ai waiting list!
                </h2>
                <p className="mb-4">
                  We are excited to have you as part of our early adoptors. You
                  will receive updates when we launch new products.
                </p>
                <p className="mb-4">
                  If you have any questions or need assistance, feel free to
                  contact our{" "}
                  <a href="mailto:support@agents.ai">support team</a>.
                </p>
                <p>Best regards,</p>
                <p>Agensts.ai Team</p>

                {/* <p className="mt-8">
                  <a href="https://engineeringx.org/docs/engineering-excellence-collective-v2.pdf">
                    Download whitepaper
                  </a>
                </p> */}
                <div className="mt-8">
                  <Link href="/">
                    <button
                      type="submit"
                      className="bg-secondary hover:opacity-90 text-white text-xl p-4 w-[260px] rounded-xl flex justify-center"
                    >
                      Back to homepage
                    </button>
                  </Link>
                </div>
              </div>
            ) : (
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  const activateError = () => {
                    errorRef.current!.classList.remove("hidden");
                    setTimeout(() => {
                      errorRef.current!.classList.add("hidden");
                    }, 3000);
                  };

                  // if (!token) {
                  //   setError("Please verify you are not a robot");
                  //   activateError();
                  //   return;
                  // }

                  setEmailLoading(true);

                  const response = await enterUserDetails({
                    variables: {
                      options: {
                        company: formValues.company,
                        title: formValues.title,
                        noOfEmployees: noOfEmployees?.value,
                        operations: formValues.operations,
                        stageOfAIAdoption: stageOfAIAdoption?.value,
                        whereDidYouHearAboutUs:
                          whereDidYouHearAboutUs?.value === "Other"
                            ? otherText
                            : whereDidYouHearAboutUs?.value,
                      },
                      token: validityToken as string,
                    },
                  });
                  if (!response.data) {
                    setError("Something Went wrong");
                    setToken("");
                    setEmailLoading(false);
                    errorRef.current!.classList.remove("hidden");
                    setTimeout(() => {
                      errorRef.current!.classList.add("hidden");
                    }, 3000);
                    /* register failed */
                    // setRegSuccess(false);
                    return;
                  }
                  if (response.data.enterUserDetails.userToken) {
                    await apolloClient.resetStore();
                    localStorage.setItem(
                      "token",
                      response.data.enterUserDetails.userToken
                    );
                    router.push("/dashboard");
                    // setRegSuccess(true);
                    setEmailLoading(false);
                    emailRef.current!.classList.remove("hidden");
                    // setTimeout(() => {
                    //   emailRef.current!.classList.add("hidden");
                    // }, 3000);
                  } else {
                    setError("Something went wrong!!");
                    setToken("");
                    setEmailLoading(false);
                    errorRef.current!.classList.remove("hidden");
                    setTimeout(() => {
                      errorRef.current!.classList.add("hidden");
                    }, 3000);
                    /* register failed */
                    setRegSuccess(false);
                  }
                }}
              >
                <h1 className="text-4xl font-semibold">Register Now</h1>
                <div className="md:flex w-full"></div>{" "}
                <div className="mt-4">
                  <label className="block">
                    Company URL: &#40;Optional&#41;
                  </label>
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
                  <label className="block">Title &#40;Optional&#41;</label>
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
                    No of Employees &#40;Optional&#41;
                  </label>
                  <Select
                    options={[
                      {
                        value: "1-10",
                        label: "1-10",
                      },
                      {
                        value: "10-100",
                        label: "10-100",
                      },
                      {
                        value: "100+",
                        label: "100+",
                      },
                    ]}
                    components={{ Option: CustomOption }}
                    // defaultValue={dinnerEvent}
                    value={noOfEmployees}
                    onChange={setNoOfEmployees}
                  />
                </div>
                <div className="mt-4">
                  <label className="block">
                    What operations would you like to automate with AI:
                    &#40;Optional&#41;
                  </label>
                  <textarea
                    value={formValues.operations}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        operations: e.target.value,
                      })
                    }
                    // type="text"
                    placeholder="Type in your answer..."
                    className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mt-4">
                  <label className="block">
                    Stage of AI Adoption &#40;Optional&#41;
                  </label>
                  <Select
                    options={[
                      {
                        value: "Early",
                        label: "Early",
                      },
                      {
                        value: "Research Phase",
                        label: "Research Phase",
                      },
                      {
                        value: "Decision Phase",
                        label: "Decision Phase",
                      },
                      {
                        value: "Currently Integrating",
                        label: "Currently Integrating",
                      },
                    ]}
                    components={{ Option: CustomOption }}
                    // defaultValue={dinnerEvent}
                    value={stageOfAIAdoption}
                    onChange={setStageOfAIAdoption}
                  />
                </div>
                <div className="mt-4">
                  <label className="block">
                    Where did you hear from us: &#40;Optional&#41;
                  </label>
                  <Select
                    options={[
                      {
                        value: "Search Engine",
                        label: "Search Engine",
                      },
                      {
                        value: "Advertisement",
                        label: "Advertisement",
                      },
                      {
                        value: "Social (like Twitter)",
                        label: "Social (like Twitter)",
                      },
                      {
                        value: "Youtube",
                        label: "Youtube",
                      },
                      {
                        value: "Referral",
                        label: "Referral",
                      },
                      {
                        value: "Other",
                        label: "Other",
                      },
                    ]}
                    components={{ Option: CustomOption }}
                    // defaultValue={dinnerEvent}
                    value={whereDidYouHearAboutUs}
                    onChange={setWhereDidYouHearAboutUs}
                  />
                  {whereDidYouHearAboutUs?.label === "Other" && (
                    <input
                      value={otherText}
                      onChange={(e) => setOtherText(e.target.value)}
                      type="text"
                      placeholder="Enter your answer"
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                    />
                  )}
                </div>
                <div className="mt-8">
                  <p>You will be notified of updates.</p>
                  <p>
                    Email us if you have any questions:{" "}
                    <a
                      target="_blank"
                      href={`mailto:support@agents.ai`}
                      className="font-bold"
                    >
                      support@agents.ai
                    </a>
                  </p>
                </div>
                {/* <div className="flex items-center mt-4 "> */}
                {/* {tokenLoading ? (
                    <div className="scale-90">
                      <Spinner />
                    </div>
                  ) : (
                    <input
                      id="default-checkbox"
                      type="checkbox"
                      checked={!!token}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setTokenLoading(true);
                          // @ts-ignore
                          window.grecaptcha.ready(function () {
                            // @ts-ignore
                            window.grecaptcha
                              .execute(process.env.NEXT_PUBLIC_SITE_KEY, {
                                action: "submit",
                              })
                              .then(function (token: any) {
                                setToken(token);
                                setTokenLoading(false);
                              });
                          });
                        } else {
                          setToken(null);
                        }
                      }}
                      className="w-5 hover:cursor-pointer h-5 text-secondary bg-secondary border-secondary rounded focus:ring-secondary focus:ring-2 "
                    />
                  )}
                  <label
                    htmlFor="default-checkbox"
                    className="ml-2 text-md font-medium text-light hover:cursor-pointer"
                  >
                    I am not a robot.
                  </label>
                </div> */}
                <div className="mt-8">
                  <button
                    type="submit"
                    className="bg-secondary hover:opacity-90 text-white text-xl p-4 w-[200px] rounded-xl flex justify-center"
                  >
                    {emailLoading ? (
                      <div className="scale-95">
                        <Spinner />
                      </div>
                    ) : (
                      <p>Submit</p>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default withApollo()(Register as any);
