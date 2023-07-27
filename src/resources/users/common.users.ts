import { DMMFClass } from "@prisma/client/runtime";
import { ComponentLoader } from "adminjs";
import { Components } from "../../components/components";

const customBefore = (request: any, context: any) => {
  const { query = {} } = request;
  const newQuery = {
    ...query,
    "filters.isPartner": "false",
    "filters.isAdmin": "false",
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
      listProperties: [
        "email",
        "name",
        "cpf",
        "createdAt",
        "isVerified",
        "isBlocked",
        "isDeleted",
      ],
      filterProperties: ["email", "name", "cpf", "createdAt"],
      editProperties: [
        // "email",
        // "name",
        // "cpf",
        // "phone",
        "isVerified",
        "isBlocked",
      ],
      showProperties: [
        "isVerified",
        "email",
        "name",
        "cpf",
        "phone",
        "isDeleted",
        "isBlocked",
        "createdAt",
        "updatedAt",
        "moreInfo",
      ],
      actions: {
        list: {
          before: [customBefore],
        },
        show: {
          showInDrawer: true,
        },
        edit: {
          showInDrawer: true,
        },
        new: {
          isAccessible: false,
        },
      },
      navigation: {
        name: "Usuários",
        icon: "User",
      },
      properties: {
        isVerified: {
          type: "boolean",
          components: {
            list: Components.VerifyBadge,
            show: Components.VerifyBadge,
          },
        },
        moreInfo: {
          // isVisible: {
          //   edit: false,
          //   list: false,
          //   filter: false,
          //   show: true,
          // },
          components: {
            show: Components.MoreInfoUser,
          },
          // position: 999,
        },
      },
    },
  };
}
