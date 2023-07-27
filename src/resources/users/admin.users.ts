import { DMMFClass } from "@prisma/client/runtime";
import passwordsFeature from "@adminjs/passwords";
import bcrypt from "bcrypt";

const customBefore = (request: any, context: any) => {
  const { query = {} } = request;
  const newQuery = {
    ...query,
    ["filters.isAdmin"]: "true",
  };

  request.query = newQuery;

  return request;
};

export default function (prisma: any, dmmf: DMMFClass) {
  return {
    resource: {
      model: dmmf.modelMap.User,
      client: prisma,
    },
    features: [
      passwordsFeature({
        properties: { encryptedPassword: "password" },
        hash: async (password: string) => {
          return bcrypt.hash(password, 10);
        },
      }),
    ],
    options: {
      id: "admin",
      listProperties: ["email", "name", "createdAt"],
      filterProperties: ["email", "name", "createdAt"],
      editProperties: ["email", "name", "password"],
      showProperties: ["email", "name", "createdAt", "updatedAt", "isDeleted"],
      actions: {
        list: {
          before: [customBefore],
          // handler: async (request: any, response: any, context: any) => {
          //   return {
          //     records: await context.resource.findMany({
          //       where: { isPartner: false },
          //     }),
          //   };
          // },
        },
        new: {
          before: async (request: any, response: any, context: any) => {
            request.payload = {
              ...request.payload,
              isAdmin: true,
            };

            return request;
          },
        },
        edit: {
          before: async (request: any, response: any, context: any) => {
            if (request.payload.password) {
              request.payload = {
                ...request.payload,
                isAdmin: true,
              };
            }

            return request;
          },
        },
      },
      navigation: {
        name: "Usuários",
        icon: "User",
      },
    },
  };
}
