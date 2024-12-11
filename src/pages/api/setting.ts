import axios from "axios";

export default async function handler(req: any, res: any) {
  // if (res.method !== "GET") {
  //   res.status(405).json({ message: "Method not allowed" });
  //   return;
  // }
  // const response = await axios.get(
  //   process.env.NEXT_PUBLIC_API_URL + "/setting?chatbotId=0.wpwt30urn7"
  // );

  // const response = await axios({
  //   method: "get",
  //   url: "http://localhost:5000/setting?chatbotId=0.wpwt30urn7",
  //   withCredentials: true,
  //   // params: {
  //   //   access_token: SECRET_TOKEN,
  //   // },
  // });
  // console.log(response.data);
  res.status(200).json({
    styles: {
      theme: "light",
      user_message_color: "#3B81F6",
      button_color: "#9258f3",
      display_name: "",
      auto_open_chat_window_after: 3,
      align_chat_button: "right",
    },
    initialMessages: [],
  });
}
