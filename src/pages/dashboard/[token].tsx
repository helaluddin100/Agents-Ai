import { useRouter } from "next/router";
import React, { useEffect } from "react";

interface TokenProps {}

const Token: React.FC<TokenProps> = ({}) => {
  const router = useRouter();

  const { token } = router.query;

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token as string);
      router.replace("/dashboard");
    } else {
      router.replace("/login");
    }
  }, [token]);

  return <div></div>;
};

export default Token;
