import Images from "../models/Images";
import ChatUserLinks from "../models/ChatUserLinks";
import Chats from "../models/Chats";
import Messages from "../models/Messages";
import Users from "../models/Users";
import MessageImagesLinks from "../models/MessageImagesLinks";
import TodoUserLinks from "../models/TodoUserLinks";

type Fields = {
  name: string;
  property: {
    type: "int" | "varchar";
    size?: number;
    notNull?: true;
  };
  dependency?: {
    type: "isfk" | "ispk"; // | "multifk";
    table?: string;
    field?: string;
    force?: true;
  };
  config?: {
    encryption?: true;
  };
};

type ResponseData = {
  status: boolean;
  errors?: string[];
  result?: any;
};

const CLASSES = {
  Images: () => new Images(),
  Users: () => new Users(),
  Chats: () => new Chats(),
  Messages: () => new Messages(),
  ChatUserLinks: () => new ChatUserLinks(),
  MessageImagesLinks: () => new MessageImagesLinks(),
  TodoUserLinks: () => new TodoUserLinks(),
};
export { Fields, ResponseData, CLASSES };
