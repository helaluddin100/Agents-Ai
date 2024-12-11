import Analytics from "@/components/Analytics";
import ChatPreview from "@/components/ChatPreviewCustomizer";
import Customization from "@/components/Customization";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import MySidebar from "@/components/Sidebar";
import {
  useGetBotTokenQuery,
  useGetSettingByIdQuery,
  useMeQuery,
} from "@/generated/graphql";
import { withApollo as WithApollo } from "@/utils/withApollo";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Script from "@/components/Script";
import React, { useEffect } from "react";

interface profileProps {}

const Profile: React.FC<profileProps> = ({}) => {
  const router = useRouter();
  const { id } = router.query;
  const { data, loading } = useGetSettingByIdQuery({
    variables: {
      id: parseInt(id as string),
    },
  });
  const { data: tokenData, loading: tokenLoading } = useGetBotTokenQuery({
    variables: {
      botId: parseInt(id as string),
    },
  });
  const { data: meData, loading: meLoading } = useMeQuery();

  useEffect(() => {
    if (!meLoading && !meData?.me) {
      // console.log(data);
      router.replace("/login");
      // console.log(data.me);
    }
  }, [meData, meLoading, router]);

  if (loading || tokenLoading) {
    return (
      <div className="h-screen mx-auto flex flex-col justify-center">
        {/* <MySidebar /> */}
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex relative overflow-hidden bg-blank">
      <MySidebar id={id} />

      <div className="w-full ">
        {tokenData && tokenData?.getBotToken && meData && (
          <Navbar token={tokenData?.getBotToken} user={meData} />
        )}
        <div className="lg:flex">
          <Script token={tokenData?.getBotToken as string} />
        </div>
      </div>
    </div>
  );
};

export default WithApollo({ ssr: false })(
  Profile as NextPage<unknown, unknown>
);
