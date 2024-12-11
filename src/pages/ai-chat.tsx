import { useFetch } from "../hooks/useFetch";

import { Link as ScrollLink, animateScroll } from "react-scroll";
import ReactMarkdown from "react-markdown";
import Spinner from "../components/LoadingSpinner";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import {
  FaAdjust,
  FaFacebookMessenger,
  FaFilePdf,
  FaGlobe,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaReact,
  FaShopify,
  FaTwitter,
  FaWix,
  FaWordpress,
} from "react-icons/fa";
import Image from "next/image";
import Head from "next/head";
// import { downloadFile } from "./utils/downloadFile";
// import { Link, useSearchParams } from "react-router-dom";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

const App = () => {
  const router = useRouter();
  const searchParam = router.query.section;

  // const [emailModal, setEmailModal] = useState(false);
  // const [name, setName] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const emailErrorRef = useRef<HTMLInputElement>(null);
  const [emailLoading, _setEmailLoading] = useState(false);
  const [heroAnimationImage, setHeroAnimationImage] = useState(1);
  const navRef = useRef<HTMLDivElement>(null);
  const heroAnimationImage2Ref = useRef<HTMLImageElement>(null);
  const [visibleSection, setVisibleSection] = useState<String>();

  const getDimensions = (ele: any) => {
    const { height } = ele.getBoundingClientRect();
    const offsetTop = ele.offsetTop;
    const offsetBottom = offsetTop + height;
    return {
      height,
      offsetTop,
      offsetBottom,
    };
  };

  const sectionRefs = [
    { section: "Engineering Excellence Collective", ref: useRef(null) },
    { section: "Our Goals", ref: useRef(null) },
    { section: "Activities", ref: useRef(null) },
    { section: "Membership", ref: useRef(null) },
    { section: "Leadership", ref: useRef(null) },
    { section: "Charter Members", ref: useRef(null) },
  ];

  useEffect(() => {
    console.log("1-ran");
    if (!searchParam) {
      return;
    }
    console.log(searchParam.toString());
    if (searchParam.toString().includes("section=goals")) {
      if (sectionRefs[1].ref.current) {
        const { offsetTop } = getDimensions(sectionRefs[1].ref.current);
        animateScroll.scrollTo(offsetTop - 100);
      }
    }
    if (searchParam.toString().includes("section=activities")) {
      if (sectionRefs[2].ref.current) {
        const { offsetTop } = getDimensions(sectionRefs[2].ref.current);
        animateScroll.scrollTo(offsetTop - 100);
      }
    }
    if (searchParam.toString().includes("section=membership")) {
      if (sectionRefs[3].ref.current) {
        const { offsetTop } = getDimensions(sectionRefs[3].ref.current);
        animateScroll.scrollTo(offsetTop - 100);
      }
    }
    if (searchParam.toString().includes("section=leadership")) {
      if (sectionRefs[4].ref.current) {
        const { offsetTop } = getDimensions(sectionRefs[4].ref.current);
        animateScroll.scrollTo(offsetTop - 100);
      }
    }
    if (searchParam.toString().includes("section=charter-members")) {
      if (sectionRefs[5].ref.current) {
        const { offsetTop } = getDimensions(sectionRefs[5].ref.current);
        animateScroll.scrollTo(offsetTop - 100);
      }
    }
  }, [
    sectionRefs[1].ref.current,
    sectionRefs[2].ref.current,
    sectionRefs[3].ref.current,
    sectionRefs[4].ref.current,
    sectionRefs[5].ref.current,
  ]);

  useEffect(() => {
    console.log("2-ran");
    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(
        sectionRefs[0].ref.current
      );
      const scrollPosition = window.scrollY + headerHeight;
      const selected = sectionRefs.find(({ ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return (
            scrollPosition > offsetTop - 40 && scrollPosition < offsetBottom
          );
        }
      });
      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };
    if (sectionRefs[0].ref.current) {
      handleScroll();
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection, sectionRefs[0].ref.current]);

  useEffect(() => {
    console.log("3-ran");
    const interval = setInterval(() => {
      setHeroAnimationImage((prev) => {
        if (prev === 4) return 1;

        return prev + 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    console.log("4-ran");
    window.onscroll = () => {
      if (navRef) {
        navRef.current?.classList.toggle(
          "fade-white",
          window.scrollY > navRef.current?.offsetHeight
        );
      }
    };
  }, []);

  const features = [
    // ...newGoals,
    {
      id: "1",
      attributes: {
        title: "Upload PDFs",
        description:
          "Upload your data as a PDF file. This PDF will be scrapped of text and used to train your chatbot.",
        icon: [<FaFilePdf key={1} className="text-3xl text-secondary" />],
      },
    },
    {
      id: "2",
      attributes: {
        title: "Scrape your websites",
        description:
          "Add a link to your website and we will scrape all the links and text from it.",
        icon: [<FaGlobe key={2} className="text-3xl text-secondary" />],
      },
    },
    {
      id: "3",
      attributes: {
        title: "Add as a widget to your website",
        description:
          "Add just to lines of code to your website and we will do the rest. Your chatbot will be available to your users.",
        icon: [
          <FaFacebookMessenger key={3} className="text-3xl text-secondary" />,
        ],
      },
    },
    {
      id: "4",
      attributes: {
        title: "Your own custom link",
        description:
          "You can also interact with your chatbot through a custom link. Just share the link with your users and they can chat with your chatbot.",
        icon: [<FaLink key={4} className="text-3xl text-secondary" />],
      },
    },
    {
      id: "5",
      attributes: {
        title: "Customize your chatbot",
        description:
          "You can customize your chatbot by changing the name, color and icon of the chatbot.",
        icon: [<FaAdjust key={5} className="text-3xl text-secondary" />],
      },
    },

    // {},
  ];

  const support = [
    {
      id: "1",
      attributes: {
        title: "Wordpress",
        icon: [
          <div key={1} className="px-12">
            <FaWordpress className="text-9xl text-secondary" />
          </div>,
        ],
      },
    },
    {
      id: "2",
      attributes: {
        title: "Wix",
        icon: [
          <div key={2} className="px-12">
            <FaWix className="text-9xl text-secondary" />
          </div>,
        ],
      },
    },
    {
      id: "3",
      attributes: {
        title: "React",
        icon: [
          <div key={3} className="px-12">
            <FaReact className="text-9xl text-secondary" />
          </div>,
        ],
      },
    },
    {
      id: "4",
      attributes: {
        title: "Shopify",
        icon: [
          <div key={4} className="px-12">
            <FaShopify className="text-9xl text-secondary" />
          </div>,
        ],
      },
    },
  ];

  return (
    <div className="overflow-x-hidden">
      <Head>
        <script id="1">
          {`
        window.chatbaseConfig = {
    chatbotId: "${process.env.NEXT_PUBLIC_CHATBASE_CHATBOT_ID}",
  }`}
        </script>
        <script
          src={process.env.NEXT_PUBLIC_WIDGET_FILE_URL}
          id={process.env.NEXT_PUBLIC_CHATBASE_CHATBOT_ID}
          defer
        ></script>

        <title>Agents.AI - Chatbot</title>
      </Head>

      {/* <img
        src={logoUrl}
        alt="logo"
        className="fixed top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-30 z-0 fade-away opacity-0"
      ></img> */}
      <div
        className="bg-[#00ba88]
           text-white
           leading-relaxed
           text-center
           text-xl
           py-4 px-10 
           rounded-xl 
           scale-75 
           fixed max-w-[505px] 
          lg:left-[50%] 
            md:left-1/2
            right-1
          hidden
           lg:translate-x-[-250px] 
           z-[1000]
           min-h-[90px]
           fade-in
           "
        ref={emailRef}
      >
        <div className="flex items-center min-h-[65px]">
          Registration successful and Email has been sent to you!
        </div>
      </div>
      <div
        className="
          bg-[#ed2e7e]
          text-white
          leading-relaxed
          text-center
          text-xl
          py-4 px-10 
          rounded-xl 
          scale-75 
          fixed max-w-[505px] 
          lg:left-[50%] 
          md:left-1/2
          right-1
          hidden
          lg:translate-x-[-250px] 
          z-[1000]
          min-h-[90px]
          fade-in
        "
        ref={emailErrorRef}
      >
        <div className="flex items-center min-h-[65px]">
          You have already registered. Please Check your Email
        </div>
      </div>
      <div className="flex flex-col items-center">
        <nav ref={navRef} className=" w-full cut-off:fixed top-0 z-[55] py-6 ">
          <div className="max-w-7xl mx-auto flex justify-between items-center px-8">
            <ScrollLink
              to="engineering-excellence-collective"
              spy={true}
              smooth={true}
              offset={-150}
              duration={500}
              className="w-full lg:w-fit"
            >
              <div className="flex items-center hover:cursor-pointer">
                <img src="/logo.png" alt="logo" className="w-14 " />
                <p className="ml-4 font-semibold text-3xl md:text-4xl">
                  Agents.ai
                </p>
              </div>
            </ScrollLink>
            {
              <div className="hidden cut-off:flex justify-between items-center p-8 py-0">
                <ScrollLink
                  to="goals"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="w-full lg:w-fit"
                >
                  <button
                    className={
                      "p-2 px-4 hover:text-primary font-semibold " +
                      (visibleSection === "Our Goals" ? "text-primary" : "")
                    }
                  >
                    Features
                  </button>
                </ScrollLink>

                <ScrollLink
                  to="activities"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="w-full lg:w-fit"
                >
                  <button
                    className={
                      "p-2 px-4 hover:text-primary font-semibold " +
                      (visibleSection === "Activities" ? "text-primary" : "")
                    }
                  >
                    Platforms
                  </button>
                </ScrollLink>
                <ScrollLink
                  to="pricing"
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  className="w-full lg:w-fit"
                >
                  <button
                    className={
                      "p-2 px-4 hover:text-primary font-semibold " +
                      (visibleSection === "Membership" ? "text-primary" : "")
                    }
                  >
                    Pricing
                  </button>
                </ScrollLink>
                <Link
                  href="/login"
                  className="w-full lg:w-fit p-2 px-4 hover:text-primary font-semibold "
                >
                  Login
                </Link>
              </div>
            }
          </div>
        </nav>

        <section
          ref={sectionRefs[0].ref}
          id="engineering-excellence-collective"
          className="w-full p-8 mt-10 mb-20 cut-off:mt-32 hero-cut-off:mb-[700px] relative max-w-7xl mx-auto"
        >
          <div className="hidden absolute -top-[40px] -right-[180px] hero-cut-off:block z-[48]">
            <img src="/assests/heroBackground.svg" alt="hero-rectangle"></img>
          </div>
          <div className="absolute -top-[49px] right-[0px] hidden hero-cut-off:block z-[49]">
            <img src="/assests/mask.svg" alt="hero-mask"></img>
          </div>
          <div className="absolute top-[0px] -left-[5000px] hidden hero-cut-off:block z-[49] h-[700px] w-[5500px] bg-white">
            <p className="hidden">!</p>
          </div>
          <div className="absolute top-[0px] -right-[5681.335px] hidden hero-cut-off:block z-[49] h-[700px] w-[5500px] bg-white">
            <p className="hidden">!</p>
          </div>

          {heroAnimationImage === 1 && (
            <div className=" absolute slide-from-right top-[100px] -right-[100px] hidden hero-cut-off:block z-[48]">
              <Image
                width={600}
                height={600}
                src="/assests/heroani1.png"
                alt="hero-animation"
                className=""
              ></Image>
            </div>
          )}
          {heroAnimationImage === 2 && (
            <div
              ref={heroAnimationImage2Ref}
              className="clip-with-background slide-from-right absolute top-[70px] -right-[100px] hidden hero-cut-off:block z-[48]"
            >
              <Image
                width={600}
                height={600}
                src="/assests/heroani2.png"
                alt="hero-animation"
                className=""
              ></Image>
            </div>
          )}

          {heroAnimationImage === 3 && (
            <div className="absolute slide-from-right top-[90px] -right-[100px] hidden hero-cut-off:block z-[48]">
              <Image
                width={600}
                height={600}
                src="/assests/heroani3.png"
                alt="hero-animation"
                className=""
              ></Image>
            </div>
          )}

          {heroAnimationImage === 4 && (
            <div className=" absolute slide-from-right top-[100px] -right-[100px] hidden hero-cut-off:block z-[48]">
              <Image
                width={600}
                height={600}
                src="/assests/heroani4.png"
                alt="hero-animation"
                // className=""
              ></Image>
            </div>
          )}
          {/* 
            {heroAnimationImage === 1 && (
              <div className="slide-out-from-right absolute top-[225px] -right-[500px] hidden hero-cut-off:block z-[48]">
                <img
                  src={heroAnimation4}
                  alt="hero-animation"
                  className=""
                ></img>
              </div>
            )} */}
          <div className="hero-cut-off:absolute hero-cut-off:top-8 hero-cut-off:bottom-0 hero-cut-off:z-[50]">
            <div className="flex justify-start w-full ">
              <div>
                <p className="text-primary font-semibold mb-4">
                  Build your chatbot
                </p>
                <h1 className="head-text max-w-3xl">
                  Custom Chatbot with your Data
                </h1>
                <div className="max-w-lg base-text">
                  <ReactMarkdown>
                    Just upload your documents or add a link to your website and
                    get a **ChatGPT**-like chatbot for your data. Then add it as
                    a widget to your website or chat with it through the a
                    custom link.
                  </ReactMarkdown>

                  <div className="md:flex justify-between mt-4 pb-4 pr-4 rounded-md ">
                    <Link
                      href="/signup"
                      className="bg-secondary mt-8 hover:opacity-90 smooth-shadow text-white text-xl p-4 w-[200px] rounded-xl flex justify-center"
                    >
                      {<p>Sign Up</p>}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={sectionRefs[1].ref}
          id="goals"
          className="w-full p-8 mb-24 z-[49] pt-20 bg-[#fafafa]"
        >
          <h1 className="head-text text-center">Features</h1>
          <div className="flex justify-center mt-16">
            <ul className="list-none grid grid-cols-1 md:grid-cols-2 md:gap-x-40 lg:gap-x-48">
              {features.map((goal: any) => (
                <li key={goal.id} className="">
                  <div className="flex max-w-lg mb-14">
                    <div className="mr-2 w-[40px]">{goal.attributes.icon}</div>
                    <div className="w-[500px]">
                      <h2 className="second-head">{goal.attributes.title}</h2>
                      <p className="base-text">{goal.attributes.description}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          ref={sectionRefs[2].ref}
          id="activities"
          className="w-full p-8 mb-32 max-w-7xl"
        >
          <h1 className="head-text text-center">
            Supports your favourite platform.
          </h1>
          <div className="flex justify-center mt-16 ">
            <ul className="grid max-w-xl md:max-w-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-5 lg:gap-12">
              {support.map((activity: any, _index: number) => (
                <li key={activity.id} className="max-w-xl flex justify-center">
                  <div className="p-2">
                    <div className="bg-[#dccbff] p-2 rounded-md flex justify-center items-center h-64 mb-4">
                      {activity.attributes.icon}
                    </div>

                    <h2 className="second-head text-center">
                      {activity.attributes.title}
                    </h2>
                    <p className=" text-light">
                      {activity.attributes.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          ref={sectionRefs[3].ref}
          id="membership"
          className="mb-32 p-8 max-w-7xl"
        >
          <div className="flex">
            <div>
              <h1 className="head-text">Improve Customer Service</h1>
              <p className="base-text lg:leading-[40px]">
                Transform your customer service with our groundbreaking SaaS
                solution. Powered by ChatGPT, our chatbot revolutionizes
                interactions by delivering intelligent responses, resolving
                queries, and providing round-the-clock support. Elevate customer
                satisfaction, streamline operations, and boost efficiency with
                our ChatGPT-powered chatbot. Experience the future of customer
                service today!
              </p>
            </div>{" "}
            <div className="w-3/4 min-w-[350px] lg:min-w-[500px] hidden md:block pl-4 lg:pl-16">
              <img
                src="/assests/membership.svg"
                alt="membership image"
                className="w-full"
              ></img>
            </div>
          </div>
        </section>

        <section
          ref={sectionRefs[4].ref}
          id="leadership"
          className="mb-32 p-8 max-w-7xl"
        >
          <div className="flex">
            <div className="w-3/4 min-w-[350px] lg:min-w-[500px] lg:pr-16 hidden md:block pr-4">
              <img
                src="/assests/leadership.svg"
                alt="membership image"
                className="w-full"
              ></img>
            </div>
            <div>
              <h1 className="head-text">
                Increase Productivity of your Employees
              </h1>
              <p className="base-text lg:leading-[50px]">
                Supercharge employee productivity with our cutting-edge
                solution, empowering them to achieve more in less time. Our
                innovative technology optimizes workflows, streamlines tasks,
                and boosts efficiency across your organization.
              </p>
            </div>{" "}
          </div>
        </section>

        <footer className="bg-[#e7ecff] w-full pt-48 p-8 text-center overflow-hidden">
          <div className="flex flex-col items-center mb-28 relative">
            <p className="text-[#1d2d3f] max-w-2xl text-2xl leading-loose z-10">
              <ReactMarkdown className="text-base sm:text-2xl">
                At Agents.ai, we are committed to continuously improving our
                services to provide you with the best experience possible. Our
                dedicated team of experts is constantly innovating, enhancing
                features, and implementing customer feedback to ensure your
                success. Stay ahead of the curve with our evolving SaaS solution
                and unlock new levels of efficiency and productivity. Trust us
                as your partner in growth and watch your business thrive.
              </ReactMarkdown>
            </p>
            {/* <a
                target="_blank"
                href={`mailto:${MetaData.attributes.email}`}
                className="text-[#0278d5] text-2xl leading-loose hover:cursor-pointer z-10"
              >
                {MetaData.attributes.email}
              </a> */}
            <div className="bg-[#dcd7fe] h-[20px] w-96 absolute -bottom-5 -right-64 rotate-[35deg]">
              <span className="hidden">!</span>
            </div>
            <div className="border-[#dcd7fe] border-t-[20px] border-l-[20px] rounded-tl-[50px] h-[200px] w-[250px] absolute -top-[40px] -left-20 rotate-[35deg]">
              <span className="hidden">!</span>
            </div>
          </div>
          <div className=" absolute bottom-0 h-5"></div>
          <div className="max-w-7xl mx-auto px-8">
            <div className="mb-10 md:flex md:justify-between md:items-center ">
              <p className="text-[#6b6d85] font-semibold mb-2 md:mb-0 ">
                @ 2023 Agents.ai
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-0 lg:flex ">
                {/* {FooterButtons.map((footerButton: any, index: any) => ( */}
                <div className="flex mx-2  justify-center">
                  <a
                    href={"#"}
                    target="_blank"
                    className="text-[#6b6d85] hover:cursor-pointer hover:text-primary"
                  >
                    {<FaTwitter className="text-2xl" />}
                  </a>
                </div>
                <div className="flex mx-2  justify-center">
                  <a
                    href={"#"}
                    target="_blank"
                    className="text-[#6b6d85] hover:cursor-pointer hover:text-primary"
                  >
                    {<FaLinkedin className="text-2xl" />}
                  </a>
                </div>
                <div className="flex mx-2  justify-center">
                  <a
                    href={"#"}
                    target="_blank"
                    className="text-[#6b6d85] hover:cursor-pointer hover:text-primary"
                  >
                    {<FaInstagram className="text-2xl" />}
                  </a>
                </div>
                {/* ))} */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
