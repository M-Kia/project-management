import type { NextApiRequest, NextApiResponse } from "next";
import {
  checkInputs,
  makePath,
  makeResponse,
} from "../../Back-End/helpers/functions";
import Chats from "../../Back-End/models/Chats";
import ChatUserLinks from "../../Back-End/models/ChatUserLinks";
import Images from "../../Back-End/models/Images";
import Messages from "../../Back-End/models/Messages";
import Users from "../../Back-End/models/Users";
import { ResponseData } from "../../Back-End/types/ActionRecordTypes";

type User = {
  id: number;
  username: string;
  profile: string;
  type: number;
};

type Message = {
  id: number;
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
        result = await get(request.query);
        break;
      case "POST":
        result = await add(request.body);
        break;
      // case "PUT":
      //   result = update(request.body);
      //   break;
      // case "DELETE":
      //   result = remove(request.body);
      //   break;
      default:
        throw new Error("Wrong Method!!");
    }
    result = makeResponse(result);
  } catch (err) {
    result = makeResponse(err.message, "error");
  }

  response.status(200).json(result);
}

async function get(query) {
  let checker = checkInputs(["userId"], query);
  if (!checker.status) throw new Error(checker.missings);
  let { userId } = checker.data;

  let cul = new ChatUserLinks(),
    c = new Chats(),
    m = new Messages(),
    img = new Images();

  let answer: Answer[] = [];

  // get links
  let chatUserLinkI1 = await cul.find(`user_id/=/${userId}`);

  for (let i = 0; i < chatUserLinkI1.length; i++) {
    let ans: Answer = {
      id: 0,
      title: "",
      type: 0,
      logo: "",
      members: [],
      messages: [],
      numberOfUnread: 0,
    };
    // get chat data
    let chatI = await c.find(`id/=/${chatUserLinkI1[i].chat_id}`);
    if (chatI.length > 0) {
      ans = {
        ...ans,
        id: chatI[0].id,
        type: chatI[0].type,
      };
      // get chat's users data
      let chatUserLinkI2 = await cul.find(
        `chat_id/=/${chatUserLinkI1[i].chat_id}`,
        [
          "`users`.`id`",
          "`users`.`profile_img_id`",
          "`users`.`username`",
          "`chat_user_links`.`user_type`",
        ],
        [{ type: "RIGHT", fieldName: "user_id" }]
      );
      let a: User[] | Message[] = [];
      if (chatI[0].type == 1) {
        // group chat
        ans = { ...ans, title: chatI[0].title };
        // fill chat and members data
        let imageI = await img.find(`id/=/${chatI[0].profile_id}`);
        ans.logo = imageI.length > 0 ? makePath(imageI[0].path) : "";
      } else if (chatI[0].type != 0) {
        continue;
      }

      for (let j = 0; j < chatUserLinkI2.length; j++) {
        let imageI = await img.find(`id/=/${chatUserLinkI2[j].profile_img_id}`);
        if (chatI[0].type == 0 && chatUserLinkI2[j].id != userId) {
          // private chat
          // if it is a private chat, some data depend on other user
          ans = {
            ...ans,
            title: chatUserLinkI2[j].username,
            logo: imageI.length > 0 ? makePath(imageI[0].path) : "",
          };
        }
        a.push({
          id: chatUserLinkI2[j].id,
          username: chatUserLinkI2[j].username,
          profile: imageI.length > 0 ? makePath(imageI[0].path) : "",
          type: chatUserLinkI2[j].user_type,
        });
      }
      ans.members = [...a];
      // get messages
      let messageI = await m.find(`id/=/${chatUserLinkI1[i].last_message_saw}`);
      let messageCount = 0,
        lastMessageTm = "";
      if (messageI.length > 0) lastMessageTm = messageI[0].mtm;

      messageI = await m.find(`chat_id/=/${chatUserLinkI1[i].chat_id}`);

      a = [];
      for (let j = 0; j < messageI.length; j++) {
        chatUserLinkI2 = await cul.find(
          `user_id/=/${messageI[j].sender_id}`,
          [
            "`users`.`profile_img_id`",
            "`users`.`username`",
            "`chat_user_links`.`user_type`",
          ],
          [{ type: "RIGHT", fieldName: "user_id" }]
        );
        if (chatUserLinkI2.length == 0) continue;
        let imageI = await img.find(`id/=/${chatUserLinkI2[0].profile_img_id}`);
        a.push({
          id: messageI[j].id,
          parent_id: messageI[j].reply_id,
          type: messageI[j].type,
          text: messageI[j].text,
          tm: messageI[j].mtm,
          sender: {
            username: chatUserLinkI2[0].username,
            profile: imageI.length > 0 ? makePath(imageI[0].path) : "",
            type: chatUserLinkI2[0].user_type,
          },
          todo_status: messageI[j].todo_status,
        });

        if (
          lastMessageTm != "" &&
          parseInt(lastMessageTm) < parseInt(messageI[j].mtm)
        )
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
  let checker = checkInputs(["type"], data);
  if (!checker.status) throw new Error(checker.missings);
  let { type } = checker.data;
  let c = new Chats(),
    cul = new ChatUserLinks(),
    u = new Users(),
    res;
  // check the type of chat
  if (type == 0) {
    // pivate chat
    // if the chat is pv, only userIds needed
    checker = checkInputs(["userIds"], data);
    if (!checker.status) throw new Error(checker.missings);
    let { userIds } = checker.data;
    // insert chat
    res = await c.insert({ type });
    // link chat to users
    await Promise.all(
      userIds.split(",").map(async (value) => {
        await cul.insert({
          chat_id: res.id,
          user_id: value,
        });
      })
    );
  } else if (type == 1) {
    // group chat
    checker = checkInputs(["userIds", "ownerId", "profile_id", "title"], data);
    if (!checker.status) throw new Error(checker.missings);
    let { userIds, ownerId, profile_id, title } = checker.data;
    // insert chat
    res = await c.insert({
      title,
      type,
      profile_id,
    });
    // link chat to users
    await Promise.all(
      userIds.split(",").map(async (value) => {
        await cul.insert({
          chat_id: res.id,
          user_id: value,
          user_type: value == ownerId ? 2 : 0,
        });
      })
    );
  } else {
    throw new Error("Wrong Group Type");
  }
  return makeResponse();
}

async function update(data) {}

async function remove(data) {}
