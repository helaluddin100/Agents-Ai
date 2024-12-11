import React from "react";

interface AnalyticsProps {
  token: string;
}

const Script: React.FC<AnalyticsProps> = ({ token }) => {
  const copiedRef = React.useRef<HTMLDivElement>(null);
  return (
    <div className="bg-white relative h-[calc(100vh-96px)] w-full m-4 p-8 pt-4 rounded-2xl">
      <div
        className="bg-[#00ba88]
           text-white
           leading-relaxed
           text-center
           text-xl
           py-4 px-10 
           rounded-xl 
           scale-75 
           max-w-[505px] 
          lg:left-[50%] 
            md:left-1/2
            right-1
          hidden
           lg:translate-x-[-250px] 
           absolute
           z-[1000]
           min-h-[90px]
           fade-in
           "
        ref={copiedRef}
      >
        <div className="flex text-center items-center min-h-[65px]">
          <p className="w-full text-center">Code copied to clipboard!</p>
        </div>
      </div>
      <h1 className="head-inner">Embed Bot into your website</h1>
      <p className="base-text">
        Embed the following code into the head tag in your website and you are
        all set. The chatbot will appear at the corner in your website.
      </p>
      <div className="bg-[#F5F5F5] p-4 rounded-xl mt-8 md:flex items-center">
        <p className="base-text">
          {`<script
          src="${process.env.NEXT_PUBLIC_WIDGET_FILE_URL}"
          id="${token}"
          defer
        ></script>`}
        </p>
        <button
          className="bg-primary h-fit text-white rounded-xl px-4 py-2 ml-4"
          onClick={() => {
            navigator.clipboard.writeText(
              `<script
            src="${process.env.NEXT_PUBLIC_WIDGET_FILE_URL}"
            id="${token}"
            defer
          ></script>`
            );
            copiedRef.current?.classList.remove("hidden");
            setTimeout(() => {
              copiedRef.current?.classList.add("hidden");
            }, 2000);
          }}
        >
          Copy
        </button>
      </div>
    </div>
  );
};

export default Script;
