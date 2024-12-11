import React, { useEffect, useState } from "react";
import Spinner from "../components/LoadingSpinner";
// import { Link } from "react-router-dom";
import Link from "next/link";
import Script from "next/script";
import queryString from "query-string";
import {
  useAddEmailMutation,
  useJoinShopifyWaitlistMutation,
  useJoinWaitlistMutation,
} from "@/generated/graphql";
import { withApollo } from "@/utils/withApollo";
import Select from "react-select";
import Slider from "@/components/Slider";
// import { useFetch } from "./hooks/useFetch";

interface RegitsterProps {}

const Register: React.FC<RegitsterProps> = ({}) => {
  const [emailLoading, setEmailLoading] = React.useState(false);
  const [joinWaitlist] = useJoinShopifyWaitlistMutation();
  const defaultValues = {
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    title: "",
    addOn: "",
    accuracyRating: 0,
    availabilityRating: 0,
    costRating: 0,
    languageRating: 0,
    trainingRating: 0,
    speedRating: 0,
    staffRating: 0,
  };
  const [noOfEmployees, setNoOfEmployees] = React.useState<null | {
    value: string;
    label: string;
  }>(null);
  const [customerSupportSpending, setCustomerSupportSpending] =
    React.useState<null | {
      value: string;
      label: string;
    }>(null);

  const emailRef = React.useRef<HTMLDivElement>(null);
  const emailErrorRef = React.useRef<HTMLDivElement>(null);
  const [error, setError] = React.useState("");
  const [regSuccess, setRegSuccess] = React.useState(false);
  const errorRef = React.useRef<HTMLDivElement>(null);
  const [token, setToken] = useState<String | null>(null);
  const [tokenLoading, setTokenLoading] = useState(false);

  useEffect(() => {
    const email = queryString.parse(window.location.search).email || "";

    setFormValues({
      ...formValues,
      email: email as string,
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
                Join The Waitlist
              </h1>
              <p className="base-text">
                <span className="text-white">
                  Get access to our cutting edge shopify AI chatbot once we have
                  more available spots.
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
                  will be notified within a week when you are able to complete
                  your registration! We are currently adding more space.
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
                  if (!formValues.firstName) {
                    setError("First Name is required");
                    activateError();
                    return;
                  }
                  if (!formValues.lastName) {
                    setError("Last Name is required");
                    activateError();
                    return;
                  }
                  //   if (!formValues.company) {
                  //     setError("Company is required");
                  //     activateError();
                  //     return;
                  //   }
                  if (!formValues.email) {
                    setError("Email is required");
                    activateError();
                    return;
                  }
                  //   if (!formValues.title) {
                  //     setError("Title is required");
                  //     activateError();
                  //     return;
                  //   }
                  if (!token) {
                    setError("Please verify you are not a robot");
                    activateError();
                    return;
                  }

                  setEmailLoading(true);

                  const response = await joinWaitlist({
                    variables: {
                      options: {
                        firstName: formValues.firstName,
                        lastName: formValues.lastName,
                        email: formValues.email,
                        company: formValues.company,
                        title: formValues.title,
                        noOfEmployees: noOfEmployees?.value,
                        accuracyRating: formValues.accuracyRating,
                        availabilityRating: formValues.availabilityRating,
                        costRating: formValues.costRating,
                        languageRating: formValues.languageRating,
                        trainingRating: formValues.trainingRating,
                        speedRating: formValues.speedRating,
                        staffRating: formValues.staffRating,
                        customerSupportSpending: customerSupportSpending?.value,
                        addOn: formValues.addOn,
                      },
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
                    setRegSuccess(false);
                    return;
                  }
                  if (response.data.joinShopifyWaitlist === true) {
                    setRegSuccess(true);
                    setEmailLoading(false);
                    emailRef.current!.classList.remove("hidden");
                    setTimeout(() => {
                      emailRef.current!.classList.add("hidden");
                    }, 3000);
                  } else {
                    setError(
                      "You have already joined the waitlist. We will send you updates on your inbox."
                    );
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
                <div className="md:flex w-full">
                  <div className="w-full">
                    <label className="mt-4 md:mt-8 block">First Name*</label>
                    <input
                      value={formValues.firstName}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          firstName: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Enter your First Name"
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                  <div className="md:ml-8 w-full">
                    <label className="mt-4 md:mt-8 block">Last Name*</label>
                    <input
                      value={formValues.lastName}
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          lastName: e.target.value,
                        })
                      }
                      type="text"
                      placeholder="Enter your Last Name"
                      className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                    />
                  </div>
                </div>{" "}
                <div className="mt-4">
                  <label className="block">Email*</label>
                  <input
                    value={formValues.email}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        email: e.target.value,
                      })
                    }
                    type="email"
                    placeholder="Enter your Email"
                    className="mt-2 w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
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
                    How much do you currently spend monhly on customer support?
                    &#40;Optional&#41;
                  </label>
                  <Select
                    options={[
                      {
                        value: "<$1,000",
                        label: "<$1,000",
                      },
                      {
                        value: "$1,000 - $10,000",
                        label: "$1,000 - $10,000",
                      },
                      {
                        value: "$10,000+",
                        label: "$10,000+",
                      },
                    ]}
                    components={{ Option: CustomOption }}
                    // defaultValue={dinnerEvent}
                    value={customerSupportSpending}
                    onChange={setCustomerSupportSpending}
                  />
                </div>
                <p className="mt-8">
                  Rank each on a scale of 1-5 how big of a pain point this issue
                  is &#40;5 being very painful&#41;?
                </p>
                {/* -Lack of accuracy-Not available online all the time/Scheduling issues-Expensive-Language barrier-Have to Constantly train them-Slow replies-Not enough staff */}
                <Slider
                  value={formValues.accuracyRating}
                  onChange={(value) => {
                    setFormValues({
                      ...formValues,
                      accuracyRating: value,
                    });
                  }}
                  label="Lack of Accuracy"
                />
                <Slider
                  value={formValues.availabilityRating}
                  onChange={(value) => {
                    setFormValues({
                      ...formValues,
                      availabilityRating: value,
                    });
                  }}
                  label="Not available online all the time/Scheduling issues"
                />
                <Slider
                  value={formValues.costRating}
                  onChange={(value) => {
                    setFormValues({
                      ...formValues,
                      costRating: value,
                    });
                  }}
                  label="Expensive"
                />
                <Slider
                  value={formValues.languageRating}
                  onChange={(value) => {
                    setFormValues({
                      ...formValues,
                      languageRating: value,
                    });
                  }}
                  label="Language barrier"
                />
                <Slider
                  value={formValues.trainingRating}
                  onChange={(value) => {
                    setFormValues({
                      ...formValues,
                      trainingRating: value,
                    });
                  }}
                  label="Have to Constantly train them"
                />
                <Slider
                  value={formValues.speedRating}
                  onChange={(value) => {
                    setFormValues({
                      ...formValues,
                      speedRating: value,
                    });
                  }}
                  label="Slow replies"
                />
                <Slider
                  value={formValues.staffRating}
                  onChange={(value) => {
                    setFormValues({
                      ...formValues,
                      staffRating: value,
                    });
                  }}
                  label="Not enough staff"
                />
                <div className="mt-8">
                  <label className="block">
                    Anything you want to add or say? &#40;Optional&#41;
                  </label>
                  <textarea
                    value={formValues.addOn}
                    onChange={(e) =>
                      setFormValues({
                        ...formValues,
                        addOn: e.target.value,
                      })
                    }
                    // type="text"
                    placeholder="Type in your answer..."
                    className="mt-2 w-full min-h-[100px] p-2 border border-gray-300 rounded-md"
                  />
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
                <div className="flex items-center mt-4 ">
                  {tokenLoading ? (
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
                </div>
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
