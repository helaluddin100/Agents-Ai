import React from "react";
import Image from "next/image";

interface ApprovedSuccessPageProps {}

const ActivationSuccessPage: React.FC<ApprovedSuccessPageProps> = ({}) => {
  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Image
        src="/assests/approvedCheck.svg"
        width={200}
        height={200}
        alt="approved check mark"
        className="mb-8 fade-in"
      ></Image>
      <h1 className="head-text mb-4">Email Sent</h1>
      <p className="text-2xl -translate-y-3 max-w-2xl p-4 text-center">
        An email with a link to reset your password has been sent to your email
        address.
      </p>
    </div>
  );
};

export default ActivationSuccessPage;
