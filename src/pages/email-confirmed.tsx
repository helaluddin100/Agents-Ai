import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import queryString from "query-string";
import { useConfirmEmailMutation } from "@/generated/graphql";
import LoadingSpinner from "@/components/LoadingSpinner";
import { withApollo } from "@/utils/withApollo";
import { useRouter } from "next/router";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";

interface ApprovedSuccessPageProps {}

const ActivationSuccessPage: React.FC<ApprovedSuccessPageProps> = ({}) => {
  let token: any = "";

  if (typeof window !== "undefined") {
    token = queryString.parse(window.location.search).token || "";
  }
  const router = useRouter();
  const [loading, setLoading] = React.useState(true);
  const [confirmEmail] = useConfirmEmailMutation();
  const [error, setError] = React.useState(false);
  const [confirmedToken, setConfirmedToken] = React.useState("");

  useEffect(() => {
    const asyn = async () => {
      if (!token) {
        setError(true);
        setLoading(false);
        return;
      }
      const response = await confirmEmail({
        variables: {
          token: token as string,
        },
      });

      if (response.data?.confirmEmail && response.data?.confirmEmail !== "") {
        setLoading(false);
        setConfirmedToken(response.data.confirmEmail);
        // router.push("/signupform?token=" + response.data.confirmEmail);
      } else {
        setError(true);
        setLoading(false);
      }
    };
    asyn();
  }, [confirmEmail, token]);

  if (error) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        Error
      </div>
    );
  }

  if (loading)
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <LoadingSpinner />
      </div>
    );

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Image
        src="/assests/welcome_robot.png"
        width={200}
        height={200}
        alt="approved check mark"
        className="mb-8 fade-in"
      ></Image>
      <h1 className="head-text mb-4">Welcome!!!</h1>
      <p className="text-2xl -translate-y-3 max-w-2xl p-4 text-center">
        Your email has been confirmed. Thank you.
      </p>
      <Link
        href={"/signupform?token=" + confirmedToken}
        className="p-4 px-8 bg-secondary text-white rounded-xl flex justify-center items-center"
      >
        Continue <FaArrowAltCircleRight className="ml-2" />
      </Link>
    </div>
  );
};

export default withApollo()(ActivationSuccessPage as any);
