import ChatbotList from "@/components/ChatbotList";
import DashboardNavigation from "@/components/DashboardNavigation";
import { useGetBotsQuery, useMeQuery } from "@/generated/graphql";
import { withApollo as WithApollo } from "@/utils/withApollo";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Chatbots = () => {
  const { data, loading } = useGetBotsQuery();
  const { data: MeData, loading: meLoading } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!meLoading) {
      if (!MeData?.me) {
        router.push("/login");
      }
    }
  }, [MeData, meLoading, router]);

  return (
    <main className="">
      <Head>
        <title>Dashboard</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="shadow-md p-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between ">
          <Link
            href="/dashboard"
            className="font-bold text-4xl flex items-center  justify-center"
          >
            <img src="/logo.png" alt="logo" className="w-12 h-12 mr-2" />
            Agents.ai
          </Link>
          <div className="">
            {MeData && <DashboardNavigation user={MeData} />}
          </div>
        </div>
      </div>
      <ChatbotList data={data} loading={loading} />
    </main>
  );
};

export default WithApollo({ ssr: false })(Chatbots);
