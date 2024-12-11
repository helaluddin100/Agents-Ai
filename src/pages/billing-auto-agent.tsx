import SubscriptionCard from "@/components/BillingComponents/SubscriptionCard";
import SubscriptionFeature from "@/components/BillingComponents/SubscriptionFeature";
import { useMeQuery } from "@/generated/graphql";
import { withApollo } from "@/utils/withApollo";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { FaUser } from "react-icons/fa";

interface billingAndPricingProps {}

const BillingAndPricing: React.FC<billingAndPricingProps> = ({}) => {
  const router = useRouter();
  // const { data, loading } = useMeQuery();
  // useEffect(() => {
  //   console.log(data?.me);
  //   if (!loading && !data?.me) {
  //     // console.log(data);
  //     router.replace("/login");
  //     // console.log(data.me);
  //   }
  // }, [data, loading, router]);

  return (
    <div>
      <div className="p-4 flex items-center text-gray-700 justify-end">
        <Link href="/dashboard"></Link>
        <Link href="/profile">
          <FaUser />
        </Link>
      </div>
      <div className="max-w-7xl p-8 mx-auto">
        <h1 className="head-text text-center mb-8">Auto Agent Billing</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white shadow-lg rounded-md p-4">
            <h1 className="text-2xl font-bold mb-2">Starter</h1>
            <p className="text-gray-500 mb-8">
              For non commercial usage and testing
            </p>
            <SubscriptionFeature title="Price" value="$29" />
            <SubscriptionFeature title="GPT Version" value="GPT-4" />
            <SubscriptionFeature title="Agents/mo" value="1" />
            {/* <SubscriptionFeature title="Multiple Languages" value="No" /> */}
            <SubscriptionFeature title="Tasks/Agent/month" value="20" />
            <SubscriptionFeature
              title="Enhanced Search"
              value="Not Available"
            />
            <SubscriptionFeature
              title="Read/Write Files"
              value="Not Available"
            />
            <SubscriptionFeature title="Early Access" value="Not Available" />
            <div className="mt-8 w-full">
              {/* <Link href="/signup"> */}
              <button
                onClick={() => {
                  // chekOut();
                  router.push("/dashboard");
                }}
                className="bg-secondary w-full text-white rounded-md px-4 py-2"
              >
                Continue
              </button>
              {/* </Link> */}
            </div>
          </div>
          <SubscriptionCard
            title="Pro"
            description="For professionals and small businesses"
            packageId={4}
          >
            <SubscriptionFeature title="Price" value="Free" />
            <SubscriptionFeature title="GPT Verstion" value="GPT-4" />
            <SubscriptionFeature title="Agents/month" value="20" />
            <SubscriptionFeature title="Tasks/Agent/month" value="50" />
            {/* <SubscriptionFeature
                      title="Document Conversation/month"
                      value="20"
                    />
                    <SubscriptionFeature
                      title="Chats Conversation/month"
                      value="100"
                    /> */}
            <SubscriptionFeature title="Enhanced Search" value="Available" />
            <SubscriptionFeature title="Read/Write Files" value="Available" />
            <SubscriptionFeature title="Early Access" value="Available" />
          </SubscriptionCard>
          <SubscriptionCard
            packageId={5}
            title="Elite"
            description="For commercial usage and large businesses"
          >
            <SubscriptionFeature title="Price" value="$99" />
            <SubscriptionFeature title="GPT Verstion" value="GPT-4" />
            <SubscriptionFeature title="Agents/month" value="60" />
            <SubscriptionFeature title="Tasks/Agent/month" value="100" />
            {/* <SubscriptionFeature
                      title="Document Conversation/month"
                      value="60"
                    />
                    <SubscriptionFeature
                      title="Chats Conversation/month"
                      value="200"
                    /> */}
            <SubscriptionFeature title="Enhanced Search" value="Available" />
            <SubscriptionFeature title="Read/Write Files" value="Available" />
            <SubscriptionFeature title="Early Access" value="Available" />
          </SubscriptionCard>
        </div>
      </div>
    </div>
  );
};

export default BillingAndPricing;
// export default withApollo({ ssr: false })(BillingAndPricing as any);
