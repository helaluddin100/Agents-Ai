// import { withApollo as createWithApollo } from "next-apollo";
// import { ApolloClient, InMemoryCache } from "@apollo/client";
// import { createUploadLink } from "apollo-upload-client";

// export const client = (ctx: any) =>
//   new ApolloClient({
//     // uri: process.env.GRAPHQL_SERVER as string,
//     // uri: process.env.NEXT_PUBLIC_API_URL,
//     // uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
//     link: createUploadLink({
//       uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
//       credentials: "include",
//       // cookie: ctx?.req?.headers.cookie,
//     }),
//     credentials: "include",
//     headers: {
//       // cookie: ctx?.req?.headers?.cookie,
//       cookie:
//         (typeof window === "undefined"
//           ? ctx?.req?.headers.cookie
//           : undefined) || "",
//       authorization: "Bearer oeveowoveeavve",
//     },
//     cache: new InMemoryCache({
//       typePolicies: {
//         Query: {
//           fields: {
//             doesEmailExist: {},
//           },
//         },
//       },
//     }),
//   });

// export const withApollo = createWithApollo(client);

import { withApollo as createWithApollo } from "next-apollo";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "@apollo/client/link/context";
import { getCookieParser } from "next/dist/server/api-utils";

function getCookie(name: string) {
  const cookies = document.cookie.split("; ");
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

// Context middleware, adds headers to the requests
const authLink = setContext((ctx, { headers, cookie }) => {
  // get the authentication token from local storage if it exists
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // return the headers to the context so HTTP link knows them
  // console.log("ctx", ctx);
  // console.log("headers", headers);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
      // cookie: cookie,
      // (typeof window === "undefined"
      //   ? ctx?.context?.req?.headers.cookie
      //   : undefined) || "",
    },
  };
});

export const client = (ctx: any) => {
  const uploadLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
      authorization: `Bearer iunf398fhewvui8`,
    },
  });

  // const uploadLink = new HttpLink({
  //   uri: process.env.NEXT_PUBLIC_API_URL + "/graphql",
  //   credentials: "include",
  // });

  return new ApolloClient({
    link: authLink.concat(uploadLink), // Chain it with the upload link
    // credentials: "include",
    // headers: {
    //   cookie:
    //     (typeof window === "undefined"
    //       ? ctx?.req?.headers.cookie
    //       : undefined) || "",
    // },
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            doesEmailExist: {},
          },
        },
      },
    }),
  });
};

export const withApollo = createWithApollo(client);
