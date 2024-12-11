import { useRegisterMutation } from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaGoogle, FaSpinner } from "react-icons/fa";
import { withApollo } from "../utils/withApollo";
import queryString from "query-string";

interface loginProps {}

const Signup: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const [register] = useRegisterMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setemailError] = useState("");
  const [passwordError, setpasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [fullNameError, setFullNameError] = useState("");
  const apolloClient = useApolloClient();

  useEffect(() => {
    const email = queryString.parse(window.location.search).email || "";

    setEmail(email as string);
  }, []);

  return (
    <section className="bg-primaryLight h-screen flex items-center relative">
      <div className="absolute hidden md:block bottom-0 left-8">
        <Image
          alt="Prop"
          height={200}
          width={300}
          src="/assests/heroani1.png"
        />
      </div>
      <div className="absolute top-0 right-8 -rotate-12">
        <Image
          alt="Prop"
          height={200}
          width={200}
          src="/assests/heroani2.png"
        />
      </div>
      <div className="z-10 flex flex-col items-center justify-center px-6 py-8 mx-auto ">
        {/* <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Ecommerce app
        </a> */}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-secondary md:text-2xl ">
              Sign up
            </h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setemailError("");
                setpasswordError("");
                setLoading(true);
                const response = await register({
                  variables: {
                    options: {
                      email: email,
                      password: password,
                      fullName: fullName,
                    },
                  },
                });
                if (response.data?.register.errors) {
                  response.data?.register.errors.map((err) => {
                    if (err.field === "email") {
                      setemailError(err.message);
                    }
                    if (err.field === "password") {
                      setpasswordError(err.message);
                    }
                  });
                }

                // console.log(response.data);
                setLoading(false);

                if (response.data?.register.created) {
                  await apolloClient.resetStore();
                  router.push("/confirm-email");
                }
              }}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="fullName"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                  }}
                  name="fullName"
                  id="fullName"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="Enter your full name"
                  required={true}
                />
                {<p className="text-red-600 text-sm">{fullNameError}</p>}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="name@company.com"
                  required={true}
                />
                {<p className="text-red-600 text-sm">{emailError}</p>}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required={true}
                />
                {<p className="text-red-600 text-sm">{passwordError}</p>}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  {/* <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required={true}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="remember"
                      className="text-gray-500 dark:text-gray-300"
                    >
                      Remember me
                    </label>
                  </div> */}
                </div>
                <a
                  href="#"
                  className="text-sm text-primary font-medium text-primary-600 hover:underline "
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full bg-secondary text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                {loading ? (
                  <p className="text-center flex justify-center">
                    <FaSpinner className="animate-spin text-center" />
                  </p>
                ) : (
                  <p>Sign Up</p>
                )}
              </button>
              <a
                href={process.env.NEXT_PUBLIC_API_URL + "/api/login/google"}
                className="w-full block bg-secondary text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                <div className="flex items-center justify-center">
                  <div className="mr-2 ">
                    <FaGoogle />
                  </div>
                  <div>Sign up with Google</div>
                </div>
              </a>
              {/* <button
                type="submit"
                className="w-full bg-gray-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                <div className="flex items-center justify-center">
                  <div className="mr-2 ">
                    <FacebookIcon />
                  </div>
                  <div>Sign up with Facebook</div>
                </div>
              </button> */}

              <p className="text-sm font-light text-gray-500 ">
                Already have an account yet?{" "}
                <Link
                  href="/login"
                  className="text-primary font-medium text-primary-600 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withApollo()(Signup as any);
