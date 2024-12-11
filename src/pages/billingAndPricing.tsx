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
        <h1 className="head-text text-center mb-8">Billing & Pricing</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white shadow-lg rounded-md p-4">
            <h1 className="text-2xl font-bold mb-2">Intern</h1>
            <p className="text-gray-500 mb-8">
              For non commercial usage and testing
            </p>
            <SubscriptionFeature title="Price" value="Free" />
            <SubscriptionFeature title="No of Bots" value="1" />
            <SubscriptionFeature title="Messages per month" value="50" />
            <SubscriptionFeature title="No of Embeds" value="Unlimited" />
            <SubscriptionFeature title="No of Data Sources" value="1" />
            <SubscriptionFeature title="Multiple Languages" value="No" />
            <SubscriptionFeature title="No Code Web AI Builder" value="Yes" />
            <SubscriptionFeature title="Knowledge Base Edits" value="Limited" />
            <SubscriptionFeature title="AI Retraining" value="Limited" />
            <div className="mt-14 w-full">
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
            title="Supervised"
            description="Great for small businesses or client projects"
            packageId={1}
          >
            <SubscriptionFeature title="Price" value="$19/month" />
            <SubscriptionFeature title="No of Bots" value="5" />
            <SubscriptionFeature title="Messages per month" value="2000" />
            <SubscriptionFeature title="No of Embeds" value="Unlimited" />
            <SubscriptionFeature title="No of Data Sources" value="10" />
            <SubscriptionFeature title="Multiple Languages" value="No" />
            <SubscriptionFeature title="No Code Web AI Builder" value="Yes" />
            <SubscriptionFeature
              title="Knowledge Base Edits"
              value="Unlimited"
            />
            <SubscriptionFeature title="AI Retraining" value="Unlimited" />
          </SubscriptionCard>
          <SubscriptionCard
            packageId={2}
            title="Unsupervised"
            description="Perfect for businesses who are scaling up"
          >
            <SubscriptionFeature title="Price" value="$49/month" />
            <SubscriptionFeature title="No of Bots" value="10" />
            <SubscriptionFeature title="Messages per month" value="5000" />
            <SubscriptionFeature title="No of Embeds" value="Unlimited" />
            <SubscriptionFeature title="No of Data Sources" value="Unlimited" />
            <SubscriptionFeature title="Multiple Languages" value="Yes" />
            <SubscriptionFeature title="No Code Web AI Builder" value="Yes" />
            <SubscriptionFeature
              title="Knowledge Base Edits"
              value="Unlimited"
            />
            <SubscriptionFeature title="AI Retraining" value="Unlimited" />
          </SubscriptionCard>
          <SubscriptionCard
            packageId={3}
            title="Singularity"
            description="Perfect for companies with a lot of trafic"
          >
            <SubscriptionFeature title="Price" value="$99/month" />
            <SubscriptionFeature title="No of Bots" value="Unlimited" />
            <SubscriptionFeature title="Messages per month" value="10000" />
            <SubscriptionFeature title="No of Embeds" value="Unlimited" />
            <SubscriptionFeature title="No of Data Sources" value="Unlimited" />
            <SubscriptionFeature title="Multiple Languages" value="Yes" />
            <SubscriptionFeature title="No Code Web AI Builder" value="Yes" />
            <SubscriptionFeature
              title="Knowledge Base Edits"
              value="Unlimited"
            />
            <SubscriptionFeature title="AI Retraining" value="Unlimited" />
          </SubscriptionCard>
        </div>
      </div>
    </div>
  );
};

export default BillingAndPricing;
// export default withApollo({ ssr: false })(BillingAndPricing as any);
