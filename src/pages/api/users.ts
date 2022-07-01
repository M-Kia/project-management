import type { NextApiRequest, NextApiResponse } from "next";
import {
  checkInputs,
  makeResponse,
  getData,
  makePath,
} from "../../Back-End/helpers/functions";
import Encryption from "../../Back-End/library/Encryption";
import Users from "../../Back-End/models/Users";
import { ResponseData } from "../../Back-End/types/ActionRecordTypes";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<ResponseData>
): Promise<void> {
  let result: ResponseData;
  try {
    switch (request.method.toUpperCase()) {
      case "GET":
        result = await get();
        break;
      case "PATCH":
        result = await update(request.query, request.headers);
        break;
      default:
        throw new Error("Wrong Method!!");
    }
  } catch (err) {
    result = makeResponse(err.message, "error");
  }

  response.status(200).json(result);
}

async function get(): Promise<ResponseData> {
  let u = new Users();
  let res = await u.find(
    "",
    [
      "`users`.`id`",
      "`users`.`firstname`",
      "`users`.`lastname`",
      "`users`.`username`",
      "`images`.`path`",
    ],
    [{ type: "LEFT", fieldName: "profile_img_id" }]
  );
  for (let i = 0; i < res.length; i++) {
    // todo
    // res[i].id = Encryption(`${Date.now()}##${res[i].id}`);
    res[i].path = makePath(res[i].path);
  }
  return makeResponse(res);
}

async function update(data, headers) {
  let checker = checkInputs(["userId"], data);
  if (!checker.status) throw new Error(checker.missings);
  let { userId } = checker.data;

  //todo
  // let token = headers.authorization;
  // token = Encryption.decode(token);
  // token = token.split("##");
  // let userId = token[1];

  let ul = new Users();

  let d = getData(data, "Users");

  try {
    delete d.id;
  } catch (err) {}

  await ul.update(d, `id/=/${userId}`);

  return makeResponse();
}
