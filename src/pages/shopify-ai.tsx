import BotConvo from "@/components/ShopifyLandingPage/botConvo/BotConvo";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import {
  FaArrowRight,
  FaBook,
  FaClock,
  FaDollarSign,
  FaFastForward,
  FaGlobe,
  FaInstagram,
  FaLanguage,
  FaLinkedin,
  FaMousePointer,
  FaReact,
  FaShopify,
  FaTwitter,
  FaWix,
  FaWordpress,
} from "react-icons/fa";
import ReactMarkdown from "react-markdown";
import { Link as ScrollLink, animateScroll } from "react-scroll";

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

  const features = [
    {
      id: "1",
      attributes: {
        title: "One Click Knowledge Training",
        description: "Scan your entire site instantly",
        icon: [<FaMousePointer key={1} className="text-3xl text-secondary" />],
      },
    },
    {
      id: "2",
      attributes: {
        title: "Works 24/7",
        description:
          "Does not shut down at night. Your chatbot will be available to your users 24/7.",
        icon: [<FaClock key={2} className="text-3xl text-secondary" />],
      },
    },
    {
      id: "3",
      attributes: {
        title: "Real time AI",
        description:
          "Connects to your existing inventory. Your chatbot will be able to answer questions about your products in real time.",
        icon: [<FaBook key={3} className="text-3xl text-secondary" />],
      },
    },
    {
      id: "4",
      attributes: {
        title: "Significantly Cheaper",
        description:
          "90% cheaper than real agents, free up their time to focus on the most important requests",
        icon: [<FaDollarSign key={3} className="text-3xl text-secondary" />],
      },
    },
    {
      id: "5",
      attributes: {
        title: "Fast response speed",
        description:
          "Replies instantly in 1-2 seconds instead of minutes. Your chatbot will be able to answer questions about your products in real time.",
        icon: [<FaFastForward key={4} className="text-3xl text-secondary" />],
      },
    },
    {
      id: "6",
      attributes: {
        title: "Limitless Scalability",
        description:
          "Helps an unlimited amount of customers at the same time. Your chatbot will be able to answer questions about your products in real time.",
        icon: [<FaGlobe key={5} className="text-3xl text-secondary" />],
      },
    },
    {
      id: "7",
      attributes: {
        title: "Multi-lingual",
        description:
          "Helps an unlimited amount of customers at the same time multilingual in 200+ languages. Your chatbot will be able to answer questions about your products in real time.",
        icon: [<FaLanguage key={5} className="text-3xl text-secondary" />],
      },
    },
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
        title: "Comming soon..",
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

        <title>Agents.AI - Shopify</title>

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
                    Steps
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
                    Features
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
                    Examples
                  </button>
                </ScrollLink>
                <ScrollLink
                  to="testimonials"
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
                    Testimonials
                  </button>
                </ScrollLink>
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
                src="/assests/shopify1.png"
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
                src="/assests/shopify2.png"
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
            <div className="hidden absolute slide-from-right top-[100px] -right-[100px]  hero-cut-off:block z-[48]">
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
                  Get more Customers
                </p>
                <h1 className="head-text max-w-3xl">
                  Shopify AI Sales & Customer Support Bot
                </h1>
                <div className="max-w-lg base-text">
                  <ReactMarkdown>
                    Increase your sales with our **Shopify AI** Sales & Customer
                    Support Bot, built by a team of ex Google and Microsoft
                    engineers.
                  </ReactMarkdown>

                  <div className="md:flex justify-between mt-4 pb-4 pr-4 rounded-md ">
                    <Link
                      href="/waitlist-shopify"
                      className="bg-secondary mt-8 hover:opacity-90 smooth-shadow text-white text-xl p-4 w-[200px] rounded-xl flex justify-center"
                    >
                      {<p>Join the Waitlist</p>}
                    </Link>
                  </div>
                  <p className="text-sm mt-4">
                    We are at max capacity, sign up to the waitlist and we will
                    notify you when there’s more space
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={sectionRefs[1].ref}
          id="goals"
          className="w-full p-8 mb-24 z-[49] pt-20 bg-white"
        >
          <h1 className="head-text text-center">Just 3 Simple Steps</h1>
          <div className="flex justify-center mt-16 max-w-7xl mx-auto">
            {/* <ul className="list-none grid grid-cols-1 md:grid-cols-2 md:gap-x-40 lg:gap-x-48"> */}
            <div className="flex flex-col">
              <div className="w-full p-4 flex justify-start my-8">
                <div className="md:w-2/3">
                  <div className="md:flex">
                    {" "}
                    <p className="bg-secondary hidden md:block md:w-[280px] mt-0 h-fit font-semibold  p-1 px-2 pl-4 text-white rounded-l-full mr-4">
                      Step 1 <FaArrowRight className="inline scale-75" />
                    </p>
                    <div className="w-full">
                      <h3 className="text-xl font-semibold ">Enter your URL</h3>
                      <p className="base-text">
                        Enter your websites URL to initiate the crawling
                        process. By providing your website &apos;s address, you
                        enable the bot to analyze and extract valuable
                        information from your site, helping it understand your
                        content better.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full p-4 flex justify-end my-8">
                <div className="md:w-2/3">
                  <div className="flex">
                    {" "}
                    <p className="bg-secondary hidden md:block w-[400px]  mt-0 h-fit font-semibold  p-1 px-2 pl-4 text-white rounded-l-full mr-4">
                      Step 2 <FaArrowRight className="inline scale-75" />
                    </p>
                    <div>
                      <h3 className="text-xl font-semibold ">
                        The bot will crawl your site
                        <br /> and learn from it
                      </h3>
                      <p className="base-text">
                        Our advanced bot technology will meticulously crawl
                        through your website, exploring its pages and gathering
                        relevant data. By analyzing the structure, content, and
                        interactions on your site, the bot learns about your
                        business, products, or services, enabling it to provide
                        accurate and personalized assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full p-4 flex justify-start my-8">
                <div className="md:w-2/3">
                  <div className="flex">
                    {" "}
                    <p className="bg-secondary hidden md:block h-fit w-[450px] mt-0 font-semibold p-1 px-2 pl-4 text-white rounded-l-full mr-4">
                      Step 3 <FaArrowRight className="inline scale-75" />
                    </p>
                    <div className="flex-2">
                      <h3 className="text-xl font-semibold ">
                        Deploy the bot to your site
                      </h3>
                      <p className="base-text">
                        Once the bot has successfully learned from your website,
                        it&apos;s ready to be deployed back onto your site. By
                        integrating the bot into your web pages, you empower
                        your visitors with a seamless and interactive
                        experience. The bot becomes a valuable resource,
                        assisting users, answering queries, and guiding them
                        through their journey on your website.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* </ul> */}
          </div>
        </section>

        <section
          ref={sectionRefs[2].ref}
          id="activities"
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
          className="max-w-5xl md:h-[1800px] w-full mx-auto pt-28"
          ref={sectionRefs[3].ref}
          id="pricing"
        >
          <h1 className="head-text text-center mb-16">Examples</h1>
          <div className="md:rotate-6 mt-32">
            <BotConvo
              key={1}
              header="Where can I find X product?"
              body="You can find X product on our website's product page. Simply navigate to our online store and use the search bar or browse through the relevant category to locate and explore X product. If you need any assistance, feel free to ask!"
            />
          </div>
          <div className="w-full flex md:justify-end md:ml-8 md:-translate-y-32 md:rotate-12">
            <BotConvo
              key={2}
              header="Where's my order?"
              body="To track your order, please visit the 'Order Status' section on our website. You'll need to provide the order number and your email address used during the purchase. Our system will then provide you with real-time updates on the status and estimated delivery of your order."
            />
          </div>
          <div className="md:-translate-y-[440px] md:-rotate-[25deg] md:-translate-x-12">
            <BotConvo
              key={3}
              header="What's your refund policy?"
              body="Our refund policy allows for returns and refunds within 30 days of purchase, provided the item is unused and in its original packaging. To initiate a refund, please visit our 'Returns' page on the website. There, you'll find detailed instructions on how to proceed with the return process."
            />
          </div>
          <div className="w-full md:flex md:justify-end md:ml-8 md:-translate-y-[500px]">
            <BotConvo
              key={4}
              header="Any coupon codes or deals?"
              body="Absolutely! We frequently offer special coupon codes and deals to provide our customers with exciting discounts. To stay updated on our current promotions, please visit our 'Offers' or 'Promotions' page on the website. You can also sign up for our newsletter to receive exclusive deals directly in your inbox."
            />
          </div>
          <div className="md:-translate-y-[800px] md:-rotate-12">
            <BotConvo
              key={5}
              header="Any free samples?"
              body="We occasionally offer free samples to our valued customers. To check if there are any ongoing free sample promotions, please visit our 'Free Samples' page on the website. Keep in mind that availability may vary, so it's best to regularly check for any new offers and claim them while they're available."
            />
          </div>
        </section>

        <section
          ref={sectionRefs[4].ref}
          id="testimonials"
          className="max-w-7xl mx-auto pt-28 760:mt-[1000px] 850:mt-[800px] 885:mt-[600px] lg:mt-0 w-full relative p-8"
        >
          {/* "My Shopify store's customer support has undergone a remarkable transformation, delivering swift and accurate responses that save time and elevate the overall customer experience."


"By enhancing the response time for customer inquiries, the AI chat bot on my Shopify store ensures timely assistance, eliminating the frustration of waiting for a human agent."

"This has helped my store overcome the challenges of providing 24/7 support by offering instant responses and helpful information, making sure my customers feel supported even outside of regular hours." */}

          <h1 className="head-text text-center">Testimonials</h1>
          <div className="z-10">
            <div className="bg-blank md:w-2/3 p-8 rounded-3xl md:rounded-full my-4">
              My Shopify store&apos;s customer support has undergone a
              remarkable transformation, delivering swift and accurate responses
              that save time and elevate the overall customer experience.
            </div>
            <div className="flex justify-end">
              <div className="bg-blank md:w-2/3 p-8 rounded-3xl md:rounded-full my-4">
                By enhancing the response time for customer inquiries, the AI
                chat bot on my Shopify store ensures timely assistance,
                eliminating the frustration of waiting for a human agent.
              </div>
            </div>
            <div className="bg-blank md:w-2/3 p-8 rounded-3xl md:rounded-full my-4">
              This has helped my store overcome the challenges of providing 24/7
              support by offering instant responses and helpful information,
              making sure my customers feel supported even outside of regular
              hours.
            </div>
          </div>

          <img
            className="absolute -z-10 top-0 right-6 opacity-[5%] right-34"
            src="/assests/testimonial.svg"
            alt="testimonial"
          ></img>
        </section>

        <section className="w-full max-w-6xl p-8 mx-auto mt-48 ">
          <p className="base-text font-semibold text-xl text-center mb-4">
            AI Agents are 90% cheaper and more accurate than Human Agents
          </p>
          <p className="base-text mb-24 text-center">
            Helps an unlimited amount of customers at the same time multilingual
            in 200+ languages. Your chatbot will be able to answer questions
            about your products in real time.
          </p>
          <table className="w-full comparison-table rounded-2xl">
            <tr className="">
              <th className=""></th>
              <th>
                <p className="text-white text-2xl">Normal Agent</p>
              </th>
              <th className="">
                <p className="text-white text-2xl">AI Agent</p>
              </th>
            </tr>
            <tr>
              <td>Knowledge</td>
              <td>Varies</td>
              <td>Instant</td>
            </tr>
            <tr>
              <td>Time to Train</td>
              <td>1+ hour</td>
              <td>Instant</td>
            </tr>
            <tr>
              <td>Response Speed</td>
              <td>Up to 5 minutes</td>
              <td>Instant</td>
            </tr>
            <tr>
              <td>Cost</td>
              <td>$3,500/month</td>
              <td>$35/month</td>
            </tr>
            <tr>
              <td>Working Hours</td>
              <td>24/7</td>
              <td>24/7</td>
            </tr>
            <tr>
              <td>Scalability</td>
              <td>1 agent handles 5 customers</td>
              <td>Infinite</td>
            </tr>
            <tr>
              <td>Performance Benefit</td>
              <td>-</td>
              <td>100% better</td>
            </tr>
            <tr>
              <td className="rounded-bl-3xl">Cost Savings</td>
              <td>-</td>
              <td>90% cheaper</td>
            </tr>
          </table>
        </section>

        <section
          ref={sectionRefs[3].ref}
          id="membership"
          className="mb-32 p-8 max-w-7xl mt-32"
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
              <h1 className="head-text">Increase Sales</h1>
              <p className="base-text lg:leading-[50px]">
                Boost your sales with our cutting-edge SaaS solution. Powered by
                ChatGPT, our chatbot revolutionizes interactions by delivering
                intelligent responses, resolving queries, and providing
                round-the-clock support. Elevate customer satisfaction,
                streamline operations, and boost efficiency with our
                ChatGPT-powered chatbot. Experience the future of customer
                service today!
              </p>
            </div>{" "}
          </div>
        </section>

        <footer className="bg-[#e7ecff] w-full pt-48 p-8 text-center overflow-hidden">
          <div className="flex flex-col items-center mb-28 relative">
            <p className="text-[#1d2d3f] max-w-2xl text-2xl leading-loose z-10">
              <ReactMarkdown>
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
