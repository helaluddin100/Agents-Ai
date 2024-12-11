import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ApprovedSuccessPageProps {}

const ActivationSuccessPage: React.FC<ApprovedSuccessPageProps> = ({}) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Image
        src="/assests/crossmark.png"
        width={200}
        height={200}
        alt="approved check mark"
        className="mb-8 fade-in"
      ></Image>
      <h1 className="head-text mb-4">Canceled</h1>
      <p className="text-2xl -translate-y-3 max-w-2xl p-4 text-center">
        Your payment has been canceled.
      </p>
      <Link
        href="/dashboard"
        className="bg-secondary  text-white rounded-md px-4 py-2 mt-8 text-lg"
      >
        Got to Dashboard
      </Link>
    </div>
  );
};

export default ActivationSuccessPage;
