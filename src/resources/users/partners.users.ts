import { DMMFClass } from "@prisma/client/runtime";

const customBefore = (request: any, context: any) => {
  const { query = {} } = request;
  const newQuery = {
    ...query,
    ["filters.isPartner"]: "true",
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
    options: {
      id: "partners",
      listProperties: ["email", "name", "cnpj", "createdAt"],
      filterProperties: ["email", "name", "cnpj", "createdAt"],
      editProperties: ["email", "name", "cnpj", "phone", "isBlocked"],
      showProperties: [
        "email",
        "name",
        "createdAt",
        "updatedAt",
        "phone",
        "cnpj",
        "isDeleted",
        "isVerified",
        "isBlocked",
      ],
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
      },
      navigation: {
        name: "Usuários",
        icon: "User",
      },
    },
  };
}
