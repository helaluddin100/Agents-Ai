import ChatPreview from "@/components/ChatPreviewCustomizer";
import Customization from "@/components/Customization";
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

  const [messageFieldColor, setMessageFieldColor] = React.useState("#fff");
  const [incommingMessageColor, setIncommingMessageColor] =
    React.useState("#fff");
  const [outgoingMessageColor, setOutgoingMessageColor] =
    React.useState("#fff");
  const [incommingMessageTextColor, setIncommingMessageTextColor] =
    React.useState("#fff");
  const [outgoingMessageTextColor, setOutgoingMessageTextColor] =
    React.useState("#fff");
  const [messageFieldTextColor, setMessageFieldTextColor] =
    React.useState("#fff");
  const [logo, setLogo] = React.useState("");

  useEffect(() => {
    if (!data) {
      return;
    }
    setMessageFieldColor(data.getSettingById.messageFieldColor);
    setIncommingMessageColor(data.getSettingById.incommingMessageColor);
    setOutgoingMessageColor(data.getSettingById.outgoingMessageColor);
    setIncommingMessageTextColor(data.getSettingById.incommingMessageTextColor);
    setOutgoingMessageTextColor(data.getSettingById.outgoingMessageTextColor);
    setMessageFieldTextColor(data.getSettingById.messageFieldTextColor);
    setLogo(data.getSettingById.logo);
  }, [data]);

  return (
    <div className="flex overflow-hidden bg-blank">
      <MySidebar id={id} />

      <div className="w-full ">
        {tokenData && tokenData?.getBotToken && meData && (
          <Navbar token={tokenData?.getBotToken} user={meData} />
        )}
        <div className="lg:flex">
          <Customization
            messageFieldColor={messageFieldColor}
            setMessageFieldColor={setMessageFieldColor}
            outgoingMessageColor={outgoingMessageColor}
            setOutgoingMessageColor={setOutgoingMessageColor}
            incommingMessageColor={incommingMessageColor}
            setIncommingMessageColor={setIncommingMessageColor}
            outgoingMessageTextColor={outgoingMessageTextColor}
            setOutgoingMessageTextColor={setOutgoingMessageTextColor}
            incommingMessageTextColor={incommingMessageTextColor}
            setIncommingMessageTextColor={setIncommingMessageTextColor}
            messageFieldTextColor={messageFieldTextColor}
            setMessageFieldTextColor={setMessageFieldTextColor}
            logo={logo}
            setLogo={setLogo}
            data={data}
            loading={loading}
            botId={parseInt(id as string)}
          />
          {tokenData && tokenData.getBotToken && (
            <ChatPreview
              logo={logo}
              messageFieldColor={messageFieldColor}
              outgoingMessageColor={outgoingMessageColor}
              incommingMessageColor={incommingMessageColor}
              outgoingMessageTextColor={outgoingMessageTextColor}
              incommingMessageTextColor={incommingMessageTextColor}
              messageFieldTextColor={messageFieldTextColor}
              backgroundColor="#ffffff"
              token={tokenData.getBotToken}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default WithApollo({ ssr: false })(
  Profile as NextPage<unknown, unknown>
);
