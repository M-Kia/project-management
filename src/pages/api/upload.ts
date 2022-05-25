import type { NextApiRequest, NextApiResponse } from "next";

import formidable from "formidable";

import FileController from "../../BackEnd/library/FileControler";

type Data = {
  status: boolean;
  errors?: string[];
  result?: any;
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function hander(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let result: Data;
  try {
    let controller = new FileController();
    let answer = [],
      theFields = [],
      theFiles = [];

    const data = await new Promise((resolve, reject) => {
      const form = formidable({ multiples: true, maxFileSize: 1000000000000 });

      form.parse(req, async (err, fields: formidable.Fields, files: any) => {
        theFields.push(fields);
        theFiles.push(files);

        if (err) reject({ err });
        resolve({ err, fields, files });

        if (!files.files) return;

        if (files.files.filepath) {
          let id = await controller.upload(files.files);
          answer.push(id);
        } else {
          answer = await controller.groupUpload(files.files);
        }
      });
    });
    result = {
      status: true,
      result: {
        answer,
        data: {
          fields: theFields,
          files: theFiles,
        },
        query: req.query,
      },
    };
  } catch (err) {
    console.log(err);
    result = { status: false, errors: [err] };
  }
  res.status(200).json(result);
}
