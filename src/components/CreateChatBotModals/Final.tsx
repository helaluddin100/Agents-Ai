import Link from "next/link";
import React from "react";
import Script from "../Script";

interface FinalProps {
  token: string;
  id: number | null;
}

const Final: React.FC<FinalProps> = ({ token, id }) => {
  return (
    <div className="h-full min-h-[400px] bg-gray-200 flex justify-center items-center w-full">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold">Congratulations!</h1>
        <p className="text-xl text-center">
          Your chatbot has been succesfully created.
        </p>
        <Link
          target="_blank"
          href={`/chat/${token}`}
          className="mt-4 bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded-md"
        >
          Try your chatbot
        </Link>
        <Link
          target="_blank"
          href={`/data-feed/${id}`}
          className="mt-4 bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded-md"
        >
          Reconfigure your chatbot
        </Link>
        <div className="p-8">
          <Script token={token} />
        </div>
        <Link
          href={`/dashboard`}
          className="mt-4 bg-primary hover:opacity-90 text-white font-bold py-2 px-4 rounded-md"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default Final;
