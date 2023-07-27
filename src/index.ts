import express from "express";
import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import { Database, Resource } from "@adminjs/prisma";
import { PrismaClient } from "@prisma/client";
import { DMMFClass } from "@prisma/client/runtime";
import { locales as AdminJSLocales } from "adminjs";
import locale from "./config/locale";
import adminUsers from "./resources/users/admin.users";
import commonUsers from "./resources/users/common.users";
import partnersUsers from "./resources/users/partners.users";
import { componentLoader } from "./components/components";

const PORT = process.env.port || 3000;

const prisma = new PrismaClient();

AdminJS.registerAdapter({ Database, Resource });

const DEFAULT_ADMIN = {
  email: "admin",
  password: "admin",
};

// handle authentication
const authenticate = async (email: string, password: string) => {
  //condition to check for correct login details
  if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
    //if the condition is true
    return Promise.resolve(DEFAULT_ADMIN);
  }
  //if the condition is false
  return null;
};

const run = async () => {
  const app = express();

  const dmmf = (prisma as any)._baseDmmf as DMMFClass;
  const adminOptions = {
    locale: locale,
    branding: {
      companyName: "Bootstrap - AdminJS",
      withMadeWithLove: false,
      logo: "https://www.gam.com.br/wp-content/uploads/2017/10/default-logo.png",
    },
    // We pass Publisher to `resources`
    resources: [
      adminUsers(prisma, dmmf),
      commonUsers(prisma, dmmf),
      partnersUsers(prisma, dmmf),
    ],
    componentLoader,
  };

  const admin = new AdminJS(adminOptions);
  admin.watch();

  const router = AdminJSExpress.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      cookieName: "AdminJS",
      cookiePassword: "Secret",
    },
    null
  );

  app.use(admin.options.rootPath, router);

  app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
};

run().finally(async () => {
  await prisma.$disconnect();
});
