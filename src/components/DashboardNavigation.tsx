import { useLogoutMutation, useMeQuery } from "@/generated/graphql";
import { useApolloClient } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MeQuery } from "@/generated/graphql";

const DashboardNavigation = ({ user }: { user: MeQuery }) => {
  const router = useRouter();
  const location = router.pathname;
  const [logout] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const [menu, setMenu] = useState(false);

  return (
    <div className="flex justify-between w-full">
      <div className="mr-8 lg:mr-16">
        {/* <Link href="/dashboard/chatbots">
          <p
            className={
              "text-lg " +
              (location === "/dashboard/chatbots" ? "text-primary" : "")
            }
          >
            Chatbots
          </p>
        </Link> */}
      </div>
      {/* <div>
        <Link href="/billingAndPricing">
          <p
            className={
              "text-lg " +
              (location === "/billingAndPricing" ? "text-primary" : "")
            }
          >
            Billing and Pricing
          </p>
        </Link>
      </div> */}

      <div className="relative">
        <button
          className=" font-semibold p-4 py-1 rounded-full flex items-center"
          onClick={(e) => {
            setMenu(!menu);
            e.stopPropagation();
          }}
        >
          <img
            src={user.me?.picture || "./assests/ProfileAvatarIcon.svg"}
            alt="user"
            className="w-10 min-h-[30px] md:h-10 rounded-full mr-2"
          ></img>
          {/* {user.firstName} */}
        </button>
        {menu && (
          <div className="absolute top-12 w-64 right-4">
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

              <button
                className="flex px-4 py-2 w-full text-center text-sm text-gray-700 hover:bg-[#f5e7ff]"
                onClick={async () => {
                  // window.localStorage.removeItem("token");
                  // setUser(false);
                  await logout({});
                  await apolloClient.resetStore();
                  localStorage.removeItem("token");
                  router.push("/");
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

      {/* <div>
        <button
          onClick={async () => {
            //clear cache
          }}
          className="hover:text-secondary ml-4"
        >
          <p
            className={
              "text-lg" +
              (location === "/dashboard/billing" ? "text-primary" : "")
            }
          >
            Logout
          </p>
        </button>
      </div> */}
    </div>
  );
};

export default DashboardNavigation;
