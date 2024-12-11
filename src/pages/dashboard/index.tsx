import ChatbotList from "@/components/ChatbotList";
import DashboardNavigation from "@/components/DashboardNavigation";
import { useGetBotsQuery, useMeQuery, MeQuery } from "@/generated/graphql";
import { withApollo } from "@/utils/withApollo";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Chatbots = () => {
  const { data, loading } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !data?.me) {
      // console.log(data);
      router.replace("/login");
      // console.log(data.me);
    }
  }, [data, loading, router]);

  return (
    <main className="bg-blank min-h-screen ">
      <Head>
        <title>Dashboard</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>

      <div className=" p-8 bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between ">
          <Link href="/dashboard">
            <div className="flex items-center hover:cursor-pointer">
              <img src="/logo.png" alt="logo" className="w-14 " />
              <p className="ml-4 font-semibold text-3xl md:text-4xl">
                Agents.ai
              </p>
            </div>
          </Link>
          <div className="">{data && <DashboardNavigation user={data} />}</div>
        </div>
      </div>
      {/* <ChatbotList data={data} loading={loading} /> */}
      <div className="max-w-7xl mx-auto">
        <h3 className="text-center mt-16 mb-8 border-b mx-auto max-w-2xl text-2xl text-light">
          Welcome to <span className="font-semibold">Agents.ai</span> <br />{" "}
          Following are the services we offer.
        </h3>
        <div className="p-8 bg-blank grid gap-8 md:grid-cols-2 lg:grid-cols-4 max-w-7xl">
          <div className="w-60 h-80 p-4 py-8 rounded-xl bg-white">
            <h4 className="second-head text-center">
              Customer Service Chatbot
            </h4>
            {/* @ts-ignore */}
            <p className="base-text mt-2" align="justify">
              Create your own chatbots unique to your business with your own
              data.
            </p>
            <Link
              // onClick={() => {
              //   router.push("/dashboard/chatbots");
              // }}
              href="/dashboard/chatbots"
              className="text-white block text-center bg-secondary p-2 w-full rounded-xl text-xl mt-4"
            >
              View
            </Link>
          </div>{" "}
          <div className="w-60 h-80 p-4 py-8 rounded-xl bg-white">
            <h4 className="second-head text-center">Auto Agent</h4>
            {/* @ts-ignore */}
            <p className="base-text mt-2" align="justify">
              Use our agent to come up with plans for you. You can use it to
              generate plans for different tasks.
            </p>
            <Link
              // onClick={() => {
              //   router.push("/dashboard/chatbots");
              // }}
              href="/auto-agent"
              className="text-white block text-center bg-secondary p-2 w-full rounded-xl text-xl mt-4"
            >
              View
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default withApollo({ ssr: false })(Chatbots);
