import { useLogoutMutation, MeQuery } from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FaEye, FaUser } from "react-icons/fa";

interface NavbarProps {
  token: string;
  user: MeQuery;
}

const Navbar: React.FC<NavbarProps> = ({ token, user }) => {
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const [menu, setMenu] = useState(false);
  const router = useRouter();

  return (
    <div className="p-4 pb-0 flex items-center text-gray-700 justify-end">
      <Link
        href={`/chat/${token}`}
        target="_blank"
        className="flex items-center bg-white  px-4 rounded-xl w-fit mr-2 md:mr-4 lg:mr-6"
      >
        <FaEye className="mr-2" /> Preview
      </Link>
      <div className="relative">
        <button
          className=" font-semibold p-2 py-1 rounded-full flex items-center"
          onClick={(e) => {
            setMenu(!menu);
            e.stopPropagation();
          }}
        >
          <img
            src={user.me?.picture || "./assests/ProfileAvatarIcon.svg"}
            alt="user"
            className="w-8 min-h-[15px] md:h-8 rounded-full mr-2"
          ></img>
          {/* {user.firstName} */}
        </button>
        {menu && (
          <div className="absolute top-12 w-64 right-4 z-20">
            <div className="bg-white rounded-md shadow-md">
              <div className="flex items-center px-4 py-2">
                <img
                  src={
                    user.me?.picture ||
                    process.env.NEXT_PUBLIC_BASE_URL + "./assests/avatar.png"
                  }
                  alt="user"
                  className="w-8 h-8 rounded-full mr-2"
                ></img>
                <p className="p-1 text-center font-semibold">
                  {user.me?.fullName}
                </p>
              </div>
              <Link
                href="/profile"
                className="flex px-4 py-2 items-center text-center text-sm  text-gray-700 hover:bg-[#f5e7ff]"
              >
                <img
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    "/assests/ProfileAvatarIcon.svg"
                  }
                  className="mr-2"
                ></img>
                My Profile
              </Link>

              <Link
                href="/my-subscriptions"
                className="flex px-4 py-2 items-center text-center text-sm  text-gray-700 hover:bg-[#f5e7ff]"
              >
                My Profile
              </Link>

              <button
                className="flex px-4 py-2 w-full text-center text-sm text-gray-700 hover:bg-[#f5e7ff]"
                onClick={async () => {
                  // window.localStorage.removeItem("token");
                  // setUser(false);
                  await logout({});
                  await apolloClient.resetStore();
                  localStorage.removeItem("token");
                  router.push("/");
                  //reload page
                  window.location.reload();
                }}
              >
                <img
                  src={
                    process.env.NEXT_PUBLIC_BASE_URL +
                    "/assests/SignOutIcon.svg"
                  }
                  className="mr-2 ml-1"
                ></img>
                <p className="text-center ">Sign Out</p>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
