import ChatbotList from "@/components/ChatbotList";
import DashboardNavigation from "@/components/DashboardNavigation";
import DataFeedList from "@/components/DataFeedList";
import StageNumber from "@/components/units/StageNumber";
import {
  useCreateBotMutation,
  useGetBotsQuery,
  useGetSettingByIdQuery,
  useMeQuery,
  useSettingQuery,
  useUpdateBotLogoAndNameMutation,
} from "@/generated/graphql";
import { withApollo as WithApollo } from "@/utils/withApollo";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetDataFeedsQuery } from "../../../generated/graphql";
import {
  FaArrowCircleLeft,
  FaArrowCircleRight,
  FaGofore,
  FaSpinner,
} from "react-icons/fa";
import Initial from "@/components/CreateChatBotModals/Initial";
import Customization from "@/components/Customization";
import Final from "@/components/CreateChatBotModals/Final";
import { DEFUALT_SETTINGS } from "../../../constants/settings";
import { useRouter } from "next/router";

const Chatbots = () => {
  const [stage, setStage] = useState(1);
  const [logo, setLogo] = useState(DEFUALT_SETTINGS.logo);
  const [name, setName] = useState("");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [messageFieldColor, setMessageFieldColor] = useState(
    DEFUALT_SETTINGS.messageFieldColor
  );
  const [messageFieldTextColor, setMessageFieldTextColor] = useState(
    DEFUALT_SETTINGS.messageFieldTextColor
  );
  const [incommingMessageColor, setIncommingMessageColor] = useState(
    DEFUALT_SETTINGS.incommingMessageColor
  );
  const [incommingMessageTextColor, setIncommingMessageTextColor] = useState(
    DEFUALT_SETTINGS.incommingMessageTextColor
  );
  const [outgoingMessageColor, setOutgoingMessageColor] = useState(
    DEFUALT_SETTINGS.outgoingMessageColor
  );
  const [outgoingMessageTextColor, setOutgoingMessageTextColor] = useState(
    DEFUALT_SETTINGS.outgoingMessageTextColor
  );

  const [loadingNext, setLoadingNext] = useState(false);
  const [botId, setBotId] = useState<number | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const { data: settingData, loading: settingLoading } = useGetSettingByIdQuery(
    {
      variables: {
        id: botId as number,
      },
    }
  );

  const { data: MeData, loading: meLoading } = useMeQuery();
  const router = useRouter();

  useEffect(() => {
    if (!meLoading) {
      if (!MeData?.me) {
        router.push("/login");
      }
    }
  }, [MeData, meLoading, router]);
  const [createBot] = useCreateBotMutation({
    context: {
      headers: {
        "apollo-require-preflight": true,
      },
    },
    variables: {
      name,
      logo: logoFile,
    },
    update: (cache: any, data: any) => {
      if (!data) {
        setLoadingNext(false);
        return null;
      }
      setBotId(data.data?.createBot.id);
      setToken(data.data?.createBot.token);
      cache.evict({ fieldName: "getBots" });
      setLoadingNext(false);
    },
  });

  const { data, loading } = useGetDataFeedsQuery({
    variables: {
      botId: botId as number,
    },
  });

  const [updateBotLogoAndName] = useUpdateBotLogoAndNameMutation({
    context: {
      headers: {
        "apollo-require-preflight": true,
      },
    },
    variables: {
      id: botId as number,
      logo: logoFile,
      name,
    },
    update: (cache: any, data: any) => {
      if (!data) {
        setLoadingNext(false);
        return null;
      }
      cache.evict({ fieldName: "setting" });
      setLoadingNext(false);
    },
  });

  const renderStage = () => {
    switch (stage) {
      case 1:
        return (
          <Initial
            logo={logoFile}
            setLogo={setLogoFile}
            name={name}
            setName={setName}
          />
        );
      case 2:
        return <DataFeedList data={data} loading={loading} botId={botId} />;
      case 3:
        return (
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
            data={settingData}
            loading={settingLoading}
            botId={botId}
          />
        );
      case 4:
        return <Final token={token as string} id={botId} />;
      default:
        return (
          <Initial
            logo={logoFile}
            setLogo={setLogoFile}
            name={name}
            setName={setName}
          />
        );
    }
  };

  return (
    <main className="">
      <Head>
        <title>Dashboard</title>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <div className="fixed top-0 shadow-md p-8 py-4 bg-white z-10 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between ">
          <Link href="/dashboard" className="font-bold text-4xl ">
            Agents.ai
          </Link>
          <div className="flex items-center w-full ml-4 max-w-lg pr-4">
            <StageNumber stage={stage} number={1} />
            <StageNumber number={2} stage={stage} />
            <StageNumber number={3} stage={stage} />
            <StageNumber number={4} stage={stage} />
          </div>
        </div>
      </div>
      <div className="mt-20 mb-20 max-w-7xl mx-auto px-4">{renderStage()}</div>
      <div className="shadow-md p-8 py-4 fixed bottom-0 w-full">
        <div className="max-w-7xl mx-auto flex items-center justify-between ">
          <div>
            {stage !== 1 && (
              <button
                className="bg-gray-300 hover:opacity-90 text-black rounded-md px-4 py-2"
                onClick={() => setStage((prev) => prev - 1)}
              >
                <div className="flex z-30 items-center">
                  <FaArrowCircleLeft />
                  <p className="ml-2 text-lg">Back</p>
                </div>
              </button>
            )}
          </div>
          <div className="flex items-center justify-end w-full max-w-lg pr-4">
            {stage !== 4 && (
              <button
                className="bg-primary h-12 w-24 hover:opacity-90 text-white rounded-md px-4 py-2"
                onClick={async () => {
                  if (!loadingNext) {
                    if (stage === 1) {
                      setLoadingNext(true);
                      if (botId) {
                        await updateBotLogoAndName();
                      } else {
                        await createBot();
                      }
                    }
                    // setLoadingNext(false);
                    setStage((prev) => prev + 1);
                  }
                }}
                disabled={loadingNext}
              >
                {loadingNext ? (
                  <div className="flex z-30 items-center justify-center">
                    <FaSpinner className="animate-spin" />
                  </div>
                ) : (
                  <div className="flex z-30 items-center">
                    <p className="mr-2 text-lg">Next</p>
                    <FaArrowCircleRight />
                  </div>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* <ChatbotList data={data} loading={loading} /> */}
    </main>
  );
};

// export default Chatbots;
export default WithApollo({ ssr: false })(Chatbots);
