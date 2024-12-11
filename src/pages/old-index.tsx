import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  FaAmericanSignLanguageInterpreting,
  FaArrowLeft,
  FaArrowRight,
  FaBrain,
  FaBusinessTime,
  FaCocktail,
  FaDatabase,
  FaDiscord,
  FaGlobe,
  FaInstagram,
  FaLink,
  FaLinkedin,
  FaMailBulk,
  FaPlay,
  FaSlideshare,
  FaSpinner,
  FaStickyNote,
  FaTwitter,
  FaVideo,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Link as ScrollLink, animateScroll } from "react-scroll";
// import { Carousel } from "react-responsive-carousel";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useAddEmailMutation, useMeQuery } from "@/generated/graphql";
import { withApollo } from "@/utils/withApollo";
import Script from "next/script";
// import { downloadFile } from "./utils/downloadFile";
// import { Link, useSearchParams } from "react-router-dom";

const API_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

const App = () => {
  const router = useRouter();
  const searchParam = router.query.section;
  const [addEmail] = useAddEmailMutation();

  // const [emailModal, setEmailModal] = useState(false);
  // const [name, setName] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);
  const emailErrorRef = useRef<HTMLInputElement>(null);
  const [emailLoading, setEmailLoading] = useState(false);
  const [heroAnimationImage, setHeroAnimationImage] = useState(1);
  const navRef = useRef<HTMLDivElement>(null);
  // const heroAnimationImage2Ref = useRef<HTMLImageElement>(null);
  const [visibleSection, setVisibleSection] = useState<String>();
  const [email, setEmail] = useState("");

  const { data, loading } = useMeQuery();

  useEffect(() => {
    if (!loading) {
      if (data?.me) {
        router.push("/dashboard");
      }
    }
  }, [data, loading, router]);

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
    { section: "tools", ref: useRef(null) },
    { section: "Leadership", ref: useRef(null) },
    { section: "Charter Members", ref: useRef(null) },
  ];

  useEffect(() => {
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
    const interval = setInterval(() => {
      setHeroAnimationImage((prev) => {
        if (prev === 4) return 1;

        return prev + 1;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    window.onscroll = () => {
      if (navRef) {
        navRef.current?.classList.toggle(
          "fade-white",
          window.scrollY > navRef.current?.offsetHeight
        );
      }
    };
  }, []);

  const CustomRightArrow = ({ onClick, ...rest }: any) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
    // onMove means if dragging or swiping in progress.
    return (
      <button
        onClick={() => onClick()}
        className="absolute right-0 bottom-[230px] -translate-y-1/2 z-[1000] bg-gray-300 hover:bg-gray-200 rounded-full shadow-lg p-2"
      >
        <FaArrowRight className="text-2xl text-secondary" />
      </button>
    );
  };

  const CustomLeftArrow = ({ onClick, ...rest }: any) => {
    const {
      onMove,
      carouselState: { currentSlide, deviceType },
    } = rest;
    // onMove means if dragging or swiping in progress.
    return (
      <button
        onClick={() => onClick()}
        className="absolute left-0 bottom-[230px] -translate-y-1/2 z-[1000] bg-gray-300 hover:bg-gray-200 rounded-full shadow-lg p-2"
      >
        <FaArrowLeft className="text-2xl text-secondary" />
      </button>
    );
  };

  const features = [
    // ...newGoals,
    {
      id: "1",
      attributes: {
        title: "Access to AI Models",
        description:
          "GPT3, GPT 3.5, GPT4 (new!), BERT, (and more coming soon), real time access to the internet ",
        icon: [<FaDatabase key={1} className="text-3xl text-secondary" />],
      },
    },
    {
      id: "2",
      attributes: {
        title: "Memory & Context",
        description:
          "Each agent has contextual memory from company resources by leveraging vector databases, removing the need to constantly provide new information.",
        icon: [<FaBrain key={2} className="text-3xl text-secondary" />],
      },
    },
    {
      id: "3",
      attributes: {
        title: "Comprehension",
        description:
          "Integration into Email, Slack, Whatsapp enables the AI Agent to receive, understand, parse conversations with NLP and update their model based on user conversation in real time, and optionally can send messages if desired.",
        icon: [<FaMailBulk key={3} className="text-3xl text-secondary" />],
      },
    },
    {
      id: "4",
      attributes: {
        title: "Action",
        description:
          "Agents will have access to powerful API’s to perform actions just like a person would (send payment, input items into quickbooks, make a post, update a google sheet)",
        icon: [<FaLink key={4} className="text-3xl text-secondary" />],
      },
    },
    {
      id: "5",
      attributes: {
        title: "Reinforcement Learning",
        description:
          "Gets more accurate with more training from multiple knowledge sources.",
        icon: [
          <FaAmericanSignLanguageInterpreting
            key={5}
            className="text-3xl text-secondary"
          />,
        ],
      },
    },
    {
      id: "6",
      attributes: {
        title: "Composable",
        description:
          "Modular, flexible interchangeability of memory and API components to achieve the outcome you need",
        icon: [<FaCocktail key={5} className="text-3xl text-secondary" />],
      },
    },

    // {},
  ];

  const support = [
    {
      id: "1",
      attributes: {
        title: "Website URLs, articles or blog posts",
        icon: [
          <div key={1} className="px-12">
            <FaGlobe className=" text-secondary" />
          </div>,
        ],
      },
    },
    {
      id: "2",
      attributes: {
        title: "Internal documentation and databases",
        icon: [
          <div key={2} className="px-12">
            <FaDatabase className=" text-secondary" />
          </div>,
        ],
      },
    },
    {
      id: "3",
      attributes: {
        title:
          "Slides, presentations, Excel spreadsheets, Word documents, PDFs",
        icon: [
          <div key={3} className="px-12">
            <FaSlideshare className=" text-secondary" />
          </div>,
        ],
      },
    },
    {
      id: "4",
      attributes: {
        title: "Notes in Evernote, Notion, OneNote, etc.",
        icon: [
          <div key={4} className="px-12">
            <FaStickyNote className=" text-secondary" />
          </div>,
        ],
      },
    },
    {
      id: "5",
      attributes: {
        title: "Example conversations",
        icon: [
          <div key={4} className="px-12">
            <FaMailBulk className=" text-secondary" />
          </div>,
        ],
      },
    },
    {
      id: "6",
      attributes: {
        title: "Video/audio transcripts",
        icon: [
          <div key={4} className="px-12">
            <FaVideo className=" text-secondary" />
          </div>,
        ],
      },
    },
  ];

  const examples = [
    {
      id: "1",
      attributes: {
        title: "Customer Service Chatbot",
        icon: [
          <div key={1} className="px-12">
            <FaGlobe className=" text-secondary" />
          </div>,
        ],
        link: "/ai-chat",
        description:
          "Just upload your documents or add a link to your website and get a ChatGPT-like chatbot for your data. Then add it as a widget to your website or chat with it through the a custom link.",
      },
    },
    {
      id: "2",
      attributes: {
        title: "Review Replier",
        icon: [
          <div key={2} className="px-12">
            <FaDatabase className=" text-secondary" />
          </div>,
        ],
        link: "/shopify-ai",
        description:
          "Reply to reviews on Shopify, Google Play, App Store, Amazon, custom e-commerce store, etc. Increase your interaction with customers.",
      },
    },
    {
      id: "3",
      attributes: {
        title: "English to SQL",
        icon: [
          <div key={3} className="px-12">
            <FaSlideshare className=" text-secondary" />
          </div>,
        ],
        link: "/ai-chat",
        description:
          "Translate English to SQL queries for your database. Enable your business executives to query the database in plain English. Increase your workplace productivity by 10x.",
      },
    },
  ];

  return (
    <div className="overflow-x-hidden">
      <Head>
        {/* <script id="1">
          {`
        window.chatbaseConfig = {
    chatbotId: "${process.env.NEXT_PUBLIC_CHATBASE_CHATBOT_ID}",
  }`}
        </script>
        <script
          src={process.env.NEXT_PUBLIC_WIDGET_FILE_URL}
          id={process.env.NEXT_PUBLIC_CHATBASE_CHATBOT_ID}
          defer
        ></script> */}
        <script
          src="https://agents.ai/widget-prod.js"
          id="0.4vljf010iel"
          defer
        ></script>
        <title>Cutting-Edge AI Agent Solutions | Agents.AI</title>

        {/* <!-- Google Tag Manager --> */}
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
                  Benefits
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
                  Training
                </button>
              </ScrollLink>
              <ScrollLink
                to="tools"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="w-full lg:w-fit"
              >
                <button
                  className={
                    "p-2 px-4 hover:text-primary font-semibold " +
                    (visibleSection === "tools" ? "text-primary" : "")
                  }
                >
                  Tools
                </button>
              </ScrollLink>
              <Link
                href="/login"
                className="w-full lg:w-fit p-2 px-4 hover:text-primary font-semibold "
              >
                Login
              </Link>
              {/* <Link
                href="/signup"
                className="w-full lg:w-fit p-2 px-4 hover:text-primary font-semibold "
              >
                Register &gt;
              </Link> */}
            </div>
          </div>
        </nav>

        <section
          ref={sectionRefs[0].ref}
          id="engineering-excellence-collective"
          className="w-full p-8 mt-10 mb-20 cut-off:mt-32 flex justify-center  max-w-7xl mx-auto"
        >
          <div className="">
            <div className="flex justify-center text-center w-full ">
              <div>
                {/* <p className="text-primary font-semibold mb-4">
                  Work with the best
                </p> */}
                <h1 className="head-text max-w-3xl">
                  Next Gen AI Agents For Your Business
                </h1>
                <div className="max-w-lg mx-auto base-text">
                  <ReactMarkdown>
                    Leverage a suite of **AI Agents** to increase business
                    productivity for smb’s, business owners, and enterprise.
                    Eliminate repetitive tasks like customer support or
                    copywriting to free up time for you and your team to focus
                    on high impact growth.
                  </ReactMarkdown>
                </div>{" "}
                <form
                  onSubmit={async (e) => {
                    e.preventDefault();
                    console.log("update");
                    setEmailLoading(true);
                    if (email.length > 0) {
                      await addEmail({
                        variables: {
                          email: email as string,
                        },
                      });
                    }
                    setEmailLoading(false);

                    router.push("/signup?email=" + email);
                  }}
                  className="w-full"
                >
                  <div className="md:flex items-center md:smooth-shadow rounded-xl mt-8">
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      type="email"
                      placeholder="Enter your email"
                      className=" w-full h-[60px] p-2 border border-gray-300 rounded-xl md:rounded-r-none"
                    />
                    <div className="flex justify-center mt-4 md:mt-0 ">
                      <button
                        type="submit"
                        className="bg-secondary h-full md:rounded-l-none md:shadow-none shadow-xl hover:opacity-90 pb-4 pr-4 text-white text-xl p-4 w-[250px] rounded-xl flex justify-center"
                      >
                        {
                          <p className="flex items-center">
                            {emailLoading ? (
                              <FaSpinner className="animate-spin" />
                            ) : (
                              <>
                                Sign Up <FaArrowRight className="ml-4" />
                              </>
                            )}
                          </p>
                        }
                      </button>

                      {/* <a
                      target="_blank"
                      href="https://www.youtube.com"
                      className="bg-gray-300 mt-8 hover:opacity-90 smooth-shadow text-black text-xl p-4 w-[200px] rounded-xl flex justify-center"
                    >
                      {
                        <p className="flex items-center">
                          <FaPlay className="mr-4" /> Watch Demo
                        </p>
                      }
                    </a> */}
                    </div>{" "}
                  </div>{" "}
                  {/* <div className="flex justify-center mt-14">
                    <a
                      className="bg-secondary items-center h-full shadow-xl hover:opacity-90 pb-4 pr-4 text-white text-xl p-4 w-[250px] rounded-xl flex justify-center"
                      href="https://discord.gg/Rpr2QD2TdP"
                      target="_blank"
                    >
                      {" "}
                      Join Our Discord
                      <FaArrowRight className="ml-4" />
                    </a>
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={sectionRefs[1].ref}
          id="goals"
          className="w-full p-8 mb-24 z-[49] pt-20 bg-[#fafafa]"
        >
          <h1 className="head-text text-center">Benefits</h1>
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
          <h1 className="sub-head text-center">
            Import Multiple Types of Knowledge Sources
          </h1>
          {/* <div className="flex justify-center mt-16 "> */}
          {/* <ul className="flex justify-between overflow-y-auto md:max-w-none grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-5 lg:gap-12"> */}
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            shouldResetAutoplay={true}
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
            autoPlaySpeed={6000}
            autoPlay={true}
            infinite={true}
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 4,
                slidesToSlide: 2, // optional, default to 1.
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                // slidesToSlide: 2, // optional, default to 1.
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                // slidesToSlide: 1, // optional, default to 1.
              },
            }}
            className="w-full"
          >
            {support.map((activity: any, _index: number) => (
              <div key={activity.id} className="max-w-lg flex justify-center">
                <div className="p-2 max-w-[230px]">
                  <div className="bg-[#dccbff]  mx-auto text-7xl px-8 p-2 rounded-md flex justify-center items-center h-64 mb-4">
                    {activity.attributes.icon}
                  </div>

                  <h2 className="second-head text-center">
                    {activity.attributes.title}
                  </h2>
                  <p className=" text-light">
                    {activity.attributes.description}
                  </p>
                </div>
              </div>
            ))}
          </Carousel>
          {/* </ul> */}
          {/* </div> */}
        </section>
        <section
          ref={sectionRefs[3].ref}
          id="membership"
          className="mb-32 p-8 max-w-7xl"
        >
          <div className="flex justify-between">
            <div>
              <h1 className="head-text"></h1>
              <p className="base-text lg:leading-[40px]">
                1,000+ Pre Made Business Prompt Models + GPT4 + Custom Knowledge
                + API Access = A Powerful AI Agent
                {/* <br /> Prompt example: draft an email asking about missing
                invoice data <br /> Action example: update quickbooks, send a
                payment to a vendor */}
              </p>
              <div className="flex justify-end mt-4">
                <p className="text-lg bg-primary p-2 px-4 text-white rounded-tr-2xl rounded-bl-2xl">
                  Prompt example: draft an email asking about missing invoice
                  data
                </p>
              </div>
              <div className="flex justify-start mt-4">
                <p className="text-lg bg-secondary p-2 px-4 text-white rounded-tl-2xl rounded-br-2xl">
                  Action example: update quickbooks, send a payment to a vendor
                </p>
              </div>
            </div>{" "}
            <div className="w-3/4 hidden md:flex justify-end pl-4 lg:pl-16">
              <FaBusinessTime className="text-[250px] text-secondary" />
            </div>
          </div>
        </section>
        <section
          ref={sectionRefs[3].ref}
          id="tools"
          className="w-full p-8 mb-32 max-w-5xl"
        >
          <h1 className="sub-head text-center">
            30+ Pre Built AI Copilot Tools in the Pipeline
          </h1>
          {/* <div className="flex mt-16 "> */}
          <Carousel
            swipeable={true}
            draggable={false}
            showDots={false}
            shouldResetAutoplay={true}
            // rewind={true}
            // rewindWithAnimation={true}
            customRightArrow={<CustomRightArrow />}
            customLeftArrow={<CustomLeftArrow />}
            autoPlaySpeed={2000}
            autoPlay={true}
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 3,
                slidesToSlide: 1, // optional, default to 1.
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                // slidesToSlide: 2, // optional, default to 1.
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                // slidesToSlide: 1, // optional, default to 1.
              },
            }}
            className="w-full "
          >
            {/* <ul className="flex justify-between md:max-w-xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-5 lg:gap-12"> */}
            {examples.map((activity: any, index: number) => (
              <div key={activity.id} className="max-w-xl flex justify-center">
                <div className="rounded-lg flex flex-col w-[300px] mr-8 h-[400px] border-2 p-4">
                  {/* <div className="bg-[#dccbff] p-2 rounded-md flex justify-center items-center h-64 mb-4">
                      {activity.attributes.icon}
                    </div> */}

                  <h2 className="second-head text-center">
                    {activity.attributes.title}
                  </h2>
                  <p className=" text-light">
                    {activity.attributes.description}
                  </p>
                  <div className="flex-grow"></div>
                  {index === 0 && (
                    <Link href={activity.attributes.link} className="underline">
                      Visit Page &gt;
                    </Link>
                  )}
                </div>
              </div>
            ))}
            {/* </ul> */}
          </Carousel>
          {/* </div> */}
        </section>
        {/* <section
          ref={sectionRefs[2].ref}
          id="activities"
          className="w-full p-8 mb-32 max-w-5xl"
        >
          <h1 className="head-text text-center">Industries Served</h1>
          <div className="flex mt-16 ">
            <ul className="flex justify-between md:max-w-xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full gap-5 lg:gap-12">
              {examples.map((activity: any, _index: number) => (
                <li key={activity.id} className="max-w-xl flex justify-center">
                  <div className="rounded-lg flex flex-col w-[300px] h-[400px] border-2 p-4">
                   

                    <h2 className="second-head text-center">
                      {activity.attributes.title}
                    </h2>
                    <p className=" text-light">
                      {activity.attributes.description}
                    </p>
                    <div className="flex-grow"></div>
                    <Link href={activity.attributes.link} className="underline">
                      Visit Page &gt;
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section> */}

        <section
          ref={sectionRefs[4].ref}
          id="membership"
          className="mb-32 p-8 max-w-7xl"
        >
          <div className="flex">
            <div>
              <h1 className="sub-head">Improve Customer Service</h1>
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
              <h1 className="sub-head">
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
                    href={"https://x.com/Agentsai_"}
                    target="_blank"
                    className="text-[#6b6d85] hover:cursor-pointer hover:text-primary"
                  >
                    {<FaTwitter className="text-2xl" />}
                  </a>
                </div>
                <div className="flex mx-2  justify-center">
                  <a
                    href={"https://discord.gg/Rpr2QD2TdP"}
                    target="_blank"
                    className="text-[#6b6d85] hover:cursor-pointer hover:text-primary"
                  >
                    {<FaDiscord className="text-2xl" />}
                  </a>
                </div>
                {/* <div className="flex mx-2  justify-center">
                  <a
                    href={"#"}
                    target="_blank"
                    className="text-[#6b6d85] hover:cursor-pointer hover:text-primary"
                  >
                    {<FaInstagram className="text-2xl" />}
                  </a>
                </div> */}
                {/* ))} */}
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default withApollo({
  ssr: true,
})(App);
