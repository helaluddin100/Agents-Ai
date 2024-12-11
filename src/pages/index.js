import Aos from "aos";
import "aos/dist/aos.css";
import { init } from "ityped";
import React, { useEffect, useRef, useState } from "react";

function App() {
  useEffect(() => {
    Aos.init({
      easing: "ease-out-cubic",
      once: true,
      offset: 50,
    });
  }, []);

  const [activeCollapse, setActiveCollapse] = useState("");

  const toggleCollapse = (collapseId) => {
    setActiveCollapse(activeCollapse === collapseId ? '' : collapseId);
  };

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const textRef = useRef(); // Creating a reference to the HTML element where the typing effect will be applied

  useEffect(() => {
    const myElement = textRef.current;
    const instance = init(myElement, {
      strings: [
        "LAM Agent for your Personal or Business Use Case",
        
      ],
      typeSpeed: 100,
      backSpeed: 50,
      startDelay: 500,
      backDelay: 500,
      loop: true,
    });
  
    // Check if instance is available before calling destroy
    if (instance && typeof instance.destroy === 'function') {
      return () => {
        instance.destroy();
      };
    } else {
      // Handle case where instance or destroy method is not available
      console.error('Instance or destroy method not available');
    }
  }, []);
   // Empty dependency array to ensure the effect runs only once after initial render

  const [showVideos, setShowVideos] = useState(false);
  const toggleVideos = () => {
    setShowVideos((prevShowVideos) => !prevShowVideos);
  };
  return (
    <div className="App">
      {/* BANNER SECTION HEADER */}
      <div className="banner-section-outer">
        <div className="overlay" id="overlay" />
        {/* MAIN HEADER */}
        <header className="header">
          <div className="main-header">
            <div className="container">
              <nav className="navbar navbar-expand-lg navbar-light p-0">
                <a className="navbar-brand d-lg-none d-block" href="index.html">
                  <figure className="navbar-logo mb-0">
                    <img
                      className="img-fluid"
                      src="assets/images/logo.svg"
                      alt=""
                    />
                  </figure>
                </a>
                <button
                  className={`navbar-toggler ${isOpen ? "" : "collapsed"}`}
                  type="button"
                  onClick={toggleMenu}
                  aria-controls="navbarSupportedContent"
                  aria-expanded={isOpen ? "true" : "false"}
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                  <span className="navbar-toggler-icon"></span>
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav m-auto align-items-lg-center">
                    <li className="nav-item active">
                      <a className="nav-link scroll" href="/">
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link scroll" href="#about">
                        About
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link scroll" href="#reward">
                        Reward
                      </a>
                    </li>
                    <li className="nav-item navbar-logo-outer d-lg-block d-none">
                      <a className="navbar-logo" href="index.html">
                        <figure className="mb-0">
                          <img
                            className="img-fluid"
                            src="assets/images/logo.svg"
                            alt=""
                          />
                        </figure>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link scroll" href="#referal">
                        Referral
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link scroll" href="#faq">
                        FAQ
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link scroll download" href={"/"}>
                        Join Waitlist
                      </a>
                    </li>
                  </ul>
                </div>
              </nav>
            </div>
          </div>
        </header>
        {/* BANNER */}
        <section className="banner-section">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <div className="heading-outer">
                  <ul className="social-icons list-unstyled mb-0 position-absolute d-sm-block d-none">
                    <li>
                      <a href="https://x.com/AgentsAi_">
                        <figure className="mb-0">
                          <img
                            className="img-fluid"
                            src="assets/images/twitter-icon.svg"
                            alt=""
                          />
                        </figure>
                      </a>
                    </li>
                    <li>
                      <a href="https://t.me/agents_ai_chat">
                        <figure className="mb-0">
                          <img
                            className="img-fluid"
                            src="assets/images/telegram-icon.svg"
                            alt=""
                          />
                        </figure>
                      </a>
                    </li>
                    <li>
                      <a href="https://discord.gg/p58YHuVuwV">
                        <figure className="mb-0">
                          <img
                            className="img-fluid"
                            src="assets/images/discord-icon.svg"
                            alt=""
                          />
                        </figure>
                      </a>
                    </li>
                    <li>
                      <a href="https://linktr.ee/agentsai_">
                        <figure className="mb-0">
                          <img
                            className="img-fluid"
                            src="assets/images/linktree-icon.svg"
                            alt=""
                          />
                        </figure>
                      </a>
                    </li>
                  </ul>
                  <h1>
                    <span className="ityped" ref={textRef}>
                      {/* LAM Agent for your Personal or Business Use Case */}
                    </span>

                    <span className="ityped-cursor"></span>
                  </h1>
                  <p>
                    Meet the first LAM browser-based AI agent powered as an
                    extension.
                  </p>
                  <div className="email-form">
                    <form
                      id="signup-form"
                      action="https://agents.ai/en/signup"
                      method="GET"
                    >
                      <div className="field-input">
                        <input
                          id="email-input"
                          className="form-input"
                          type="email"
                          name="email"
                          placeholder="Enter Your Email Address"
                          required
                        />
                        <button type="submit" className="form-submit">
                          Join Waitlist
                        </button>
                        <figure className="rotate-icon mb-0">
                          <img
                            className="img-fluid"
                            src="assets/images/banner-form-rotate-icon.svg"
                            alt=""
                          />
                        </figure>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="video-box position-relative"
                  data-aos="fade-left"
                >
                  <figure
                    className="icon-1 mb-0 position-absolute"
                    data-aos="zoom-in"
                  >
                    <img
                      className="img-fluid"
                      src="assets/images/banner-icon-1.svg"
                      alt=""
                    />
                  </figure>
                  <figure
                    className="icon-2 mb-0 position-absolute"
                    data-aos="zoom-in"
                  >
                    <img
                      className="img-fluid"
                      src="assets/images/banner-icon-2.svg"
                      alt=""
                    />
                  </figure>
                  <figure className="circle-icon-1 mb-0 position-absolute">
                    <img
                      className="img-fluid"
                      src="assets/images/banner-circle-icon.svg"
                      alt=""
                    />
                  </figure>
                  <figure className="circle-icon-2 mb-0 position-absolute">
                    <img
                      className="img-fluid"
                      src="assets/images/banner-circle-icon.svg"
                      alt=""
                    />
                  </figure>
                  <figure className="video-image mb-0">
                    <img
                      src="assets/images/banner-video-img.svg"
                      alt="image"
                      className="img-fluid"
                    />
                  </figure>
                  <div
                    className="video-icon"
                    id="showVideos"
                    onClick={toggleVideos}
                  >
                    <figure className="mb-0">
                      <img
                        className="thumb img-fluid"
                        style={{ cursor: "pointer" }}
                        src="./assets/images/banner-video-icon.svg"
                        alt="image"
                      />
                    </figure>
                  </div>
                  <div
                    className="container-fluid video-container"
                    style={{ display: showVideos ? "block" : "none" }}
                  >
                    <div className="row">
                      <div className="col-12">
                        <div className="card centered-card w-100 custom-popup">
                          <div className="card-body">
                            <span className="cross" onClick={toggleVideos}>
                              X
                            </span>
                            <div
                              className="d-flex align-items-center justify-content-center mobile-wrap"
                              style={{ gap: "20px" }}
                            >
                              <div>
                                <video controls width="100%">
                                  <source
                                    src="assets/video/agents_ai_demo1.mp4"
                                    type="video/mp4"
                                  />
                                </video>
                                <span>Demo 1</span>
                              </div>
                              <div>
                                <video controls width="100%">
                                  <source
                                    src="assets/video/agents_ai_demo2.mp4"
                                    type="video/mp4"
                                  />
                                </video>
                                <span>Demo 2</span>
                              </div>
                              <div>
                                <video controls width="100%">
                                  <source
                                    src="assets/video/agents_ai_demo3.mp4"
                                    type="video/mp4"
                                  />
                                </video>
                                <span>Demo 3</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <figure
                    className="icon-3 mb-0 position-absolute"
                    data-aos="zoom-in"
                  >
                    <img
                      className="img-fluid"
                      src="assets/images/banner-icon-3.svg"
                      alt=""
                    />
                  </figure>
                  <figure className="circle-icon-3 mb-0 position-absolute">
                    <img
                      className="img-fluid"
                      src="assets/images/banner-circle-icon.svg"
                      alt=""
                    />
                  </figure>
                  <figure className="circle-icon-4 mb-0 position-absolute">
                    <img
                      className="img-fluid"
                      src="assets/images/banner-circle-icon.svg"
                      alt=""
                    />
                  </figure>
                  <figure className="client-img mb-0 position-absolute">
                    <img
                      className="img-fluid"
                      src="assets/images/banner-clients-img.svg"
                      alt=""
                    />
                  </figure>
                  <figure className="video-shape-img mb-0 position-absolute">
                    <img
                      className="img-fluid"
                      src="assets/images/banner-video-shape.png"
                      alt=""
                    />
                  </figure>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 text-center"></div>
            </div>
          </div>
        </section>
      </div>

      {/* <!-- POWER SECTION --> */}
      <section className="generic-section power-section overflow-hidden" id="about">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 col-md-6 col-12 order-md-1 order-2 d-flex align-items-center text-md-left text-center"
              data-aos="slide-right"
            >
              <div className="content-box">
                <h5 className="d-inline-block">Harness the power of LAM</h5>
                <h2>LAM Powered Agent</h2>
                <ul className="list-unstyled mb-0">
                  <li className="d-flex">
                    <i className="fa-solid fa-circle"></i>
                    <p className="mb-0">
                      Large Action Models (LAMs) are designed for orchestrating
                      sequences of actions to achieve specific goals
                    </p>
                  </li>
                  <li className="d-flex">
                    <i className="fa-solid fa-circle"></i>
                    <p className="mb-0">
                      Unlike Large Language Models (LLMs), LAMs focus on
                      executing tasks like appointment booking or form
                      completion directly within applications or systems.
                    </p>
                  </li>
                  <li className="d-flex">
                    <i className="fa-solid fa-circle"></i>
                    <p className="mb-0">
                      LLMs excel in understanding and generating natural
                      language, while LAMs extend this capability to practical
                      task completion.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            <div
              className="col-lg-6 col-md-6 col-12 order-md-2 order-1 d-flex align-items-xl-end align-items-center justify-content-md-end justify-content-center"
              data-aos="slide-left"
            >
              <div className="image-box">
                <figure className="mb-0">
                  <img
                    className="img-fluid"
                    src="assets/images/power-section-img.svg"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- ADVANTAGE SECTION --> */}

      <section
        className="generic-section advantage-section overflow-hidden"
        data-aos="fade-up"
      >
        <div className="container-fluid">
          <div className="advantage-inner-box">
            <div className="row">
              <div className="col-lg-6 col-md-6 col-12 d-flex align-items-center text-md-left text-center justify-content-md-start justify-content-center">
                <div className="image-box">
                  <figure className="mb-0">
                    <img
                      className="img-fluid"
                      src="assets/images/advantage-section-img.svg"
                      alt=""
                    />
                  </figure>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-12 order-md-1 order-2 text-md-left text-center">
                <div className="content-box">
                  <h5 className="d-inline-block">Limitless possibilities</h5>
                  <h2>API-less Advantage</h2>
                  <p className="mb-0">
                    The LAM Agent operates independently of API connections,
                    granting it unrestricted access to all resources. This
                    capability enables the agent to perform tasks seamlessly
                    across various platforms without limitations. By eliminating
                    the reliance on APIs, the LAM Agent ensures unparalleled
                    versatility and efficiency in executing tasks.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- BROWSE SECTION --> */}
      <section className="generic-section browse-section overflow-hidden">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 col-md-6 col-12 order-md-1 order-2 d-flex align-items-center text-md-left text-center"
              data-aos="slide-right"
            >
              <div className="content-box">
                <h5 className="d-inline-block">Earn passive daily rewards</h5>
                <h2>Browse-2-Earn</h2>
                <p className="mb-0">
                  Introducing Browse-2-Earn, users can earn AGNT Points by
                  automatically sharing their browsing data via browser
                  extension to contribute to the training of our LAM. Through
                  participation in AGENTS.AI, users not only receive rewards but
                  also actively fuel the advancement of artificial intelligence.
                  This collective effort directly enhances the capabilities and
                  performance of the LAM Agent, ultimately improving user
                  experiences across various tasks and interactions.
                </p>
              </div>
            </div>
            <div
              className="col-lg-6 col-md-6 col-12 order-md-2 order-1 d-flex align-items-center justify-content-center"
              data-aos="slide-left"
            >
              <div className="image-box">
                <figure className="mb-0">
                  <img
                    className="img-fluid"
                    src="assets/images/browse-section-img.svg"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- REWARD SECTION --> */}
      <section
        className="advantage-section reward-section overflow-hidden"
        id="reward"
      >
        <div className="container-fluid">
          <div className="advantage-inner-box" data-aos="fade-up">
            <div className="row">
              <div className="col-12">
                <div className="heading text-center">
                  <h2 className="mb-0 text-white">
                    How to get rewarded for your data
                  </h2>
                </div>
              </div>
            </div>
            <div className="content-outer d-lg-flex">
              <div className="left-box order-lg-1 order-2" data-aos="slide-right">
                <p className="text-white text-lg-right text-center">
                  <b>Valuable Contribution:</b> Your data plays a crucial role
                  in enhancing the accuracy of our LAM.
                </p>
                <p className="mb-0 text-white text-lg-right text-center">
                  <b>Earn AGNT Points</b> Receive rewards for voluntarily
                  sharing your browsing data through our Browse-2-Earn program.
                </p>
              </div>
              <div
                className="image-box d-flex align-items-end order-lg-2 order-3"
                data-aos="fade-up"
              >
                <figure className="mb-0">
                  <img
                    className="img-fluid"
                    src="assets/images/reward-section-img.svg"
                    alt=""
                  />
                </figure>
              </div>
              <div className="right-box order-lg-3 order-2" data-aos="slide-left">
                <p className="text-white text-lg-left text-center">
                  <b>Secure Data Sharing:</b> Install our Chrome extension to
                  securely share your browsing data and contribute to the AI
                  revolution.
                </p>
                <p className="mb-0 text-white text-lg-left text-center">
                  <b>Stake in the Future:</b> By participating, you&apos;ll earn a
                  stake in shaping the future of AI technology and its
                  advancements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- PRIVACY SECTION --> */}
      <section className="generic-section privacy-section overflow-hidden">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-6 col-md-6 col-12 order-md-1 order-2 d-flex align-items-start text-md-left text-center"
              data-aos="slide-right"
            >
              <div className="content-box">
                <h5 className="d-inline-block">Control Your Data</h5>
                <h2>Privacy is our Priority</h2>
                <p className="mb-0">
                  With growing concerns over data privacy and the unethical use
                  of personal information by large tech entities, alternative
                  methods for data tracking are necessary. Recognizing the value
                  of user data, Agents.AI has developed a new framework allowing
                  users to opt-in and be rewarded for their data contributions.
                  These data will feed directly in our LAM and be used to train
                  the model to improve performance over time.
                </p>
              </div>
            </div>
            <div
              className="col-lg-6 col-md-6 col-12 order-md-2 order-1 d-flex align-items-center justify-content-md-end justify-content-center"
              data-aos="slide-left"
            >
              <div className="image-box">
                <figure className="mb-0">
                  <img
                    className="img-fluid"
                    src="assets/images/privacy-section-img.svg"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- REFERAL SECTION --> */}
      <section
        className="generic-section referal-section overflow-hidden"
        id="referal"
        data-aos="fade-up"
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-12 order-md-1 order-2">
              <div className="left-box">
                <div
                  className="list top d-flex align-items-center justify-content-between"
                  data-aos="fade-down"
                >
                  <h5 className="mb-0 text-white">Person</h5>
                  <h5 className="mb-0 text-white">AGNT Points (%)</h5>
                </div>
                <div
                  className="list d-flex align-items-center justify-content-between"
                  data-aos="fade-down"
                >
                  <p className="mb-0">You</p>
                  <p className="mb-0">100%</p>
                </div>
                <div
                  className="list d-flex align-items-center justify-content-between"
                  data-aos="fade-down"
                >
                  <p className="mb-0">Direct Referraal (1st Connection)</p>
                  <p className="mb-0">10%</p>
                </div>
                <div
                  className="list d-flex align-items-center justify-content-between"
                  data-aos="fade-down"
                >
                  <p className="mb-0">Referral’s Referral (2nd Connection)</p>
                  <p className="mb-0">5%</p>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12 order-md-2 order-1 text-md-left text-center">
              <div className="content-box">
                <h5 className="d-inline-block">Referral for recurring rewards</h5>
                <h2>Referral Forever</h2>
                <p>
                  For each person you directly refer, you will forever
                  automatically earn 10% of what they earn (whether its through
                  the extension or referral) and 5% from the second connections
                </p>
                <a href="#">Referr Now</a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- DISTRIBUTION SECTION --> */}
      <section className="distribution-section overflow-hidden" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="image-outer">
                <figure className="mb-0">
                  <img
                    src="assets/images/distribution-sectioon-img.svg"
                    alt=""
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- GET STARTED SECTION --> */}
      <section className="get-started overflow-hidden">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center">
              <div className="heading d-flex align-items-center justify-content-center">
                <h2 className="mb-0">How To Get Started</h2>
                <figure className="mb-0">
                  <img
                    src="assets/images/get-started-question-icon.png"
                    alt=""
                  />
                </figure>
              </div>
              <div className="plan-box-outer">
                <div
                  className="plan-box hover-effect position-relative"
                  data-aos="slide-right"
                >
                  <h3 className="number text-white position-absolute">1</h3>
                  <figure>
                    <img
                      className="img-fluid"
                      src="assets/images/get-started-box-icon-1.svg"
                      alt=""
                    />
                  </figure>
                  <p>Download the AGENTS.AI extension (coming soon)</p>
                </div>
                <div
                  className="plan-box hover-effect position-relative"
                  data-aos="fade-up"
                >
                  <h3 className="number text-white position-absolute">2</h3>
                  <figure>
                    <img
                      className="img-fluid"
                      src="assets/images/get-started-box-icon-2.svg"
                      alt=""
                    />
                  </figure>
                  <p>Turn On the extension</p>
                </div>
                <div
                  className="plan-box hover-effect position-relative"
                  data-aos="fade-up"
                >
                  <h3 className="number text-white position-absolute">3</h3>
                  <figure>
                    <img
                      className="img-fluid"
                      src="assets/images/get-started-box-icon-3.svg"
                      alt=""
                    />
                  </figure>
                  <p>Connect your wallet to receive your AGNT Points</p>
                </div>
                <div
                  className="plan-box hover-effect position-relative"
                  data-aos="slide-left"
                >
                  <h3 className="number text-white position-absolute">4</h3>
                  <figure>
                    <img
                      className="img-fluid"
                      src="assets/images/get-started-box-icon-4.svg"
                      alt=""
                    />
                  </figure>
                  <p>Start Earning Automatically Daily</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- FAQ SECTION --> */}
      <section className="faq-section overflow-hidden" id="faq">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="text-center">frequently asked questions</h2>
              <div className="row">
                <div className="col-xl-8 col-lg-9 mx-auto">
                  {/* <!-- Accordion --> */}
                  <div className="accordion" data-aos="fade-up">
                    {/* Accordion item 1 */}
                    <div className="card">
                      <div className="card-header bg-white">
                        <span className="mb-0">
                          <button
                            type="button"
                            onClick={() => toggleCollapse("collapseOne")}
                            aria-expanded={activeCollapse === "collapseOne"}
                            className="btn btn-link text-dark collapsible-link text-decoration-none"
                          >
                            What is LAM and how does it benefit me?
                          </button>
                        </span>
                      </div>
                      <div
                        id="collapseOne"
                        className={`collapse ${
                          activeCollapse === "collapseOne" ? "show" : ""
                        }`}
                      >
                        <div className="card-body">
                          <p className="m-0">
                            Large Action Model turns your prompts / queries /
                            requests into actions - therefore empowering your AI
                            agent to browse and navigate the web while
                            performing analysis. This is the next step in AI
                            technology to minimize the amount of effort needed
                            by you to execute on any task required.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Accordion item 2 */}
                    <div className="card">
                      <div className="card-header bg-white">
                        <span className="mb-0">
                          <button
                            type="button"
                            onClick={() => toggleCollapse("collapseTwo")}
                            aria-expanded={activeCollapse === "collapseTwo"}
                            className="btn btn-link text-dark collapsible-link text-decoration-none"
                          >
                            Is the Browse-to-Earn free to participate?
                          </button>
                        </span>
                      </div>
                      <div
                        id="collapseTwo"
                        className={`collapse ${
                          activeCollapse === "collapseTwo" ? "show" : ""
                        }`}
                      >
                        <div className="card-body">
                          <p className="m-0">
                            Yes, B2E is completely free. Simply download the
                            extension (when we go live) to earn rewards forever.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Accordion item 3 */}
                    <div className="card">
                      <div className="card-header bg-white">
                        <span className="mb-0">
                          <button
                            type="button"
                            onClick={() => toggleCollapse("collapseThree")}
                            aria-expanded={activeCollapse === "collapseThree"}
                            className="btn btn-link text-dark collapsible-link text-decoration-none"
                          >
                            How will I receive my rewards?
                          </button>
                        </span>
                      </div>
                      <div
                        id="collapseThree"
                        className={`collapse ${
                          activeCollapse === "collapseThree" ? "show" : ""
                        }`}
                      >
                        <div className="card-body">
                          <p className="m-0">
                            Your rewards will be seamlessly credited to your
                            account. We are currently considering diverse
                            payment options including cryptocurrencies, gift
                            cards, and PayPal. Stay tuned for exciting updates.
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Accordion item 4 */}
                    <div className="card">
                      <div className="card-header bg-white">
                        <span className="mb-0">
                          <button
                            type="button"
                            onClick={() => toggleCollapse("collapseFour")}
                            aria-expanded={activeCollapse === "collapseFour"}
                            className="btn btn-link text-dark collapsible-link text-decoration-none"
                          >
                            Does referring users give me rewards forever?
                          </button>
                        </span>
                      </div>
                      <div
                        id="collapseFour"
                        className={`collapse ${
                          activeCollapse === "collapseFour" ? "show" : ""
                        }`}
                      >
                        <div className="card-body">
                          <p className="m-0">
                            Every user you refer (1st connection) along with
                            users they refer (2nd connection) will give you
                            rewards forever. You will receive 10% for the first
                            connection and 5% for the second connection.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- FOOTER --> */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="list">
                <div className="footer-logo-outer d-md-none d-block text-center">
                  <a className="footer-logo" href="index.html">
                    <figure className="mb-0">
                      <img
                        className="img-fluid"
                        src="assets/images/logo.svg"
                        alt=""
                      />
                    </figure>
                  </a>
                </div>
                <ul className="list-unstyled mb-0 d-flex align-items-center justify-content-between">
                  <li className="active">
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <a href="#about">About</a>
                  </li>
                  <li>
                    <a href="#reward">Reward</a>
                  </li>
                  <li className="footer-logo-outer d-md-block d-none">
                    <a className="footer-logo" href="index.html">
                      <figure className="mb-0">
                        <img
                          className="img-fluid"
                          src="assets/images/logo.svg"
                          alt=""
                        />
                      </figure>
                    </a>
                  </li>
                  <li>
                    <a href="#referal">Referal</a>
                  </li>
                  <li>
                    <a href="#faq">FAQ</a>
                  </li>
                  <li>
                    <a className="download" href="#">
                      Join Waitlist
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- FOOTER COPYRIGHT --> */}
      <div className="footer-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="footer-bottom-inner text-center">
                <p className="mb-0 text-white">
                  Agent.AI all copyright reserved ©2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;