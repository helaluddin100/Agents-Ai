import FacebookIcon from "@/components/svgs/FacebookIcon";
import GoogleIcon from "@/components/svgs/GoogleIcon";
import WhatsAppIcon from "@/components/svgs/WhatsAppIcon";
import { useLoginMutation } from "@/generated/graphql";
import { withApollo } from "@/utils/withApollo";
import { useApolloClient } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

interface loginProps {}

const Login: React.FC<loginProps> = ({}) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [login] = useLoginMutation();
  const [passwordError, setpasswordError] = React.useState("");
  const [emailError, setemailError] = React.useState("");
  const apolloClient = useApolloClient();
  const router = useRouter();
  return (
    <section className="relative bg-primaryLight h-screen overflow-x-hidden flex items-center ">
      <div className="absolute bottom-0 left-8">
        <Image
          alt="Prop"
          height={400}
          width={400}
          src="/assests/heroani1.png"
        />
      </div>
      <div className="absolute top-0 right-8 -rotate-12">
        <Image
          alt="Prop"
          height={400}
          width={400}
          src="/assests/heroani2.png"
        />
      </div>
      <div className="flex overflow-x-hidden flex-col items-center justify-center px-6 py-8 mx-auto ">
        {/* <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          Ecommerce app
        </a> */}
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-secondary md:text-2xl ">
              Sign In
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={async (e) => {
                setemailError("");
                setpasswordError("");
                e.preventDefault();
                const response = await login({
                  variables: {
                    email,
                    password,
                  },
                });
                // console.log(response);
                if (response.data) {
                  if (response.data.login.errors) {
                    if (response.data.login.errors[0].field === "email") {
                      setemailError(response.data.login.errors[0].message);
                      return;
                    }
                    if (response.data.login.errors[0].field === "password") {
                      setpasswordError(response.data.login.errors[0].message);
                      return;
                    }
                  } else {
                    if (response.data.login.userToken) {
                      await apolloClient.resetStore();
                      localStorage.setItem(
                        "token",
                        response.data.login.userToken
                      );

                      router.push("/dashboard");
                      // console.log("login success", response.data.login.user);
                      return;
                    }
                  }
                }
              }}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="name@company.com"
                  required={true}
                />
                <p className="text-red-500 text-xs italic">{emailError}</p>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required={true}
                />
                <p className="text-red-500 text-xs italic">{passwordError}</p>
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
                <Link
                  href="/forgot-password"
                  className="text-sm text-primary font-medium text-primary-600 hover:underline "
                >
                  Forgot password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full bg-secondary text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                Sign In
              </button>
              <a
                href={process.env.NEXT_PUBLIC_API_URL + "/api/login/google"}
                className="w-full block bg-secondary text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
              >
                <div className="flex items-center justify-center">
                  <div className="mr-2 ">
                    <GoogleIcon />
                  </div>
                  <div>Sign in with Google</div>
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
                Don&apos;t have an account yet?{" "}
                <Link
                  href="/signup"
                  className="text-primary font-medium text-primary-600 hover:underline"
                >
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

//@ts-ignore
export default withApollo()(Login);
