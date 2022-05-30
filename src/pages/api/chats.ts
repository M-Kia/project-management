import type { NextApiRequest, NextApiResponse } from "next";
import { checkInputs } from "../../Back-End/helpers/functions";
import Chats from "../../Back-End/models/Chats";
import Chat_user_links from "../../Back-End/models/Chat_user_links";
import Images from "../../Back-End/models/Images";
import Messages from "../../Back-End/models/Messages";
import Users from "../../Back-End/models/Users";
import { ResponseData } from "../../Back-End/types/ActionRecordTypes";

type User = {
  username: string;
  profile: string;
  type: number;
};

type Message = {
  type: number;
  text: string;
  tm: number;
  sender: User;
  todo_status: boolean;
  parent_id: number;
};

type Answer = {
  title: string;
  type: number;
  logo: string;
  numberOfUnread: number;
  members: User[];
  messages: Message[];
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
) {
  let result: ResponseData;
  try {
    switch (request.method.toUpperCase()) {
      case "GET":
        result = get(request.query);
        break;
      case "POST":
        result = add(request.body);
        break;
      case "PUT":
        result = update(request.body);
        break;
      case "DELETE":
        result = remove(request.body);
        break;
      default:
        throw new Error("Wrong Method!!");
    }
  } catch (err) {
    result = makeResponse(err.message, "error");
  }

  response.status(200).json({ result, req });
}

async function get(query) {
  let checker = checkInputs(["userId"], query);
  if (!checker.status) throw new Error(checker.missings);
  let { userId } = checker.data;

  let cul = new Chat_user_links(),
    c = new Chats(),
    u = new Users(),
    m = new Messages(),
    img = new Images();

  let answer: Answer[] = [];

  let rrr = await cul.find(`user_id/=/${userId}`);

  for (let i = 0; i < rrr.length; i++) {
    let ans: Answer = {
      title: "",
      type: 0,
      logo: "",
      members: [],
      messages: [],
      numberOfUnread: 0,
    };
    let r = await c.find(`id/=/${rrr[i].chat_id}`);
    if (r.length > 0) {
      ans = { ...ans, title: r[0].title, type: r[0].type };

      let r1 = await img.find(`id/=/${r[0].profile_id}`);
      ans.logo = r1.length > 0 ? makePath(r1[0].path) : "";

      r = await cul.find(
        `chat_id/=/${rrr[i].chat_id}`,
        [],
        [{ type: "LEFT", fieldName: "user_id" }]
      );
      let a: User[] | Message[] = [];
      for (let j = 0; j < r.length; j++) {
        let rr = img.find(`id/=/${r[j].profile_img_id}`);
        a.push({
          username: r[j].username,
          profile: rr.length > 0 ? makePath(rr[0].path) : "",
          type: r[i].user_type,
        });
      }
      ans.members = [...a];

      r = await m.find(`id/=/${rrr[i].last_message_saw}`);
      let messageCount = 0,
        lastMessageTm = "";
      if (r.length > 0) lastMessageTm = r[0].mtm;

      r = await m.find(`chat_id/=/${rrr[i].chat_id}`);

      a = [];
      for (let j = 0; j < r.length; j++) {
        let rr1 = await u.find(`id/=/${r[j].sender_id}`);
        if (rr1.length == 0) continue;
        let rr = await img.find(`id/=/${rr1[0].profile_img_id}`);
        a.push({
          parent_id: r[j].reply_id,
          type: r[j].type,
          text: r[j].text,
          tm: r[j].mtm,
          sender: {
            username: rr1[0].username,
            profile: rr.length > 0 ? makePath(rr[0].path) : "",
            type: r[i].user_type,
          },
          todo_status: r[j].todo_status,
        });

        if (lastMessageTm != "" && parseInt(lastMessageTm) < parseInt(r[j].mtm))
          messageCount++;
      }

      ans.messages = [...a];
      ans.numberOfUnread = messageCount;

      answer.push(ans);
    }
  }
  return answer;
}

async function add(data): ResponseData {
  let checker = checkInputs(
    ["userIds", "ownerId", "profile_id", "title", "type"],
    data
  );
  if (!checker.status) throw new Error(checker.missings);
  let { userIds, ownerId, profile_id, title, type } = checker.data;
  let c = new Chats(),
    cul = new Chat_user_links();
  let res = await c.insert({
    title,
    type,
    profile_id,
  });
  await Promise.all(
    userIds.split(",").map(async (value) => {
      await cul.insert({
        chat_id: res.id,
        user_id: value,
        type: 1,
        user_type: value == ownerId ? 2 : 0,
      });
    })
  );
  return makeResponse();
}

async function update(data) {}

async function remove(data) {}
