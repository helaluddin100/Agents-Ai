import ChatPreview from "@/components/ChatPreview";
import DataFeedList from "@/components/DataFeedList";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navbar from "@/components/Navbar";
import MySidebar from "@/components/Sidebar";
import {
  useGetBotTokenQuery,
  useGetDataFeedsQuery,
  useMeQuery,
} from "@/generated/graphql";
import { withApollo as WithApollo } from "@/utils/withApollo";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface profileProps {}

const Profile: React.FC<profileProps> = ({}) => {
  const router = useRouter();

  const { id } = router.query;

  const { data, loading } = useGetDataFeedsQuery({
    variables: {
      botId: parseInt(id as string),
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

  // const {token, loading} = use

  return (
    <div className="flex overflow-hidden bg-blank">
      <MySidebar id={id} />

      <div className="w-full ">
        {tokenData && tokenData?.getBotToken && meData && (
          <Navbar token={tokenData?.getBotToken} user={meData} />
        )}
        <div className="lg:flex">
          <DataFeedList
            data={data}
            loading={loading}
            botId={parseInt(id as string)}
          />
          {tokenData && tokenData.getBotToken && (
            <ChatPreview token={tokenData.getBotToken} />
          )}
        </div>
      </div>
    </div>
  );
};

export default WithApollo({ ssr: false })(
  Profile as NextPage<unknown, unknown>
);
