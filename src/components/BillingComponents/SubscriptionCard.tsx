import React from "react";
import SubscriptionFeature from "./SubscriptionFeature";
import Link from "next/link";

interface SubscriptionCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  packageId: number;
}

const SubscriptionCard: React.FC<SubscriptionCardProps> = ({
  title,
  description,
  children,
  packageId,
}) => {
  const chekOut = () => {
    fetch(
      process.env.NEXT_PUBLIC_API_URL + "/api/stripe/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: [{ id: packageId, quantity: 1 }],
        }),
      }
    )
      .then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      })
      .then(({ url }) => {
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  return (
    <div className="bg-white shadow-lg rounded-md p-4">
      <h1 className="text-2xl font-bold mb-2">{title}</h1>
      <p className="text-gray-500 mb-8">{description}</p>
      {children}
      <div className="mt-8 w-full">
        {/* <Link href="/signup"> */}
        <button
          onClick={() => {
            chekOut();
          }}
          className="bg-secondary w-full text-white rounded-md px-4 py-2"
        >
          Upgrade
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default SubscriptionCard;
