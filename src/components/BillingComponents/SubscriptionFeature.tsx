import React from "react";

interface SubscriptionFeatureProps {
  title: string;
  value: string;
}

const SubscriptionFeature: React.FC<SubscriptionFeatureProps> = ({
  title,
  value,
}) => {
  return (
    <div className="mt-4 flex items-center justify-between">
      <h1 className="text-md text-gray-500 mr-2">{title}</h1>
      <p className="text-gray-500 font-bold text-md">{value}</p>
    </div>
  );
};

export default SubscriptionFeature;
