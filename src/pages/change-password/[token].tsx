import {
  useForgotPasswordMutation,
  useChangePasswordMutation,
} from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaGoogle, FaSpinner } from "react-icons/fa";
import { withApollo } from "../../utils/withApollo";

interface loginProps {}

const Signup: React.FC<loginProps> = ({}) => {
  const router = useRouter();
  const { token } = router.query;
  const [changePassword] = useChangePasswordMutation();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const apolloClient = useApolloClient();

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
              Change your password
            </h1>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                setPasswordError("");
                setConfirmPasswordError("");
                setLoading(true);
                if (!password) {
                  setPasswordError("Password cannot be empty");
                  setLoading(false);
                  return;
                }

                if (password.length < 8) {
                  setPasswordError(
                    "Password must be atleast 8 characters long"
                  );
                  setLoading(false);
                  return;
                }

                if (password !== confirmPassword) {
                  setConfirmPasswordError("Passwords do not match");
                  setLoading(false);
                  return;
                }

                const response = await changePassword({
                  variables: {
                    token: token as string,
                    newPassword: password,
                  },
                });
                setLoading(false);
                if (response.data?.changePassword.userToken) {
                  await apolloClient.resetStore();
                  localStorage.setItem(
                    "token",
                    response.data?.changePassword.userToken
                  );
                  router.push("/dashboard");
                }
                if (response.data?.changePassword.errors) {
                  setConfirmPasswordError(
                    response.data?.changePassword.errors[0].message
                  );
                }
              }}
              className="space-y-4 md:space-y-6"
              action="#"
            >
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  name="password"
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="Enter a new passowrd"
                  required={true}
                />
                {<p className="text-red-600 text-sm">{passwordError}</p>}
              </div>
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                  name="password"
                  id="confirmPassword"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5  "
                  placeholder="Retype your password"
                  required={true}
                />
                {<p className="text-red-600 text-sm">{confirmPasswordError}</p>}
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
                  <p>Reset</p>
                )}
              </button>

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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default withApollo()(Signup as any);
