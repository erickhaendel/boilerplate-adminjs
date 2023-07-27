import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  VerifyBadge: componentLoader.add("VerifyBadge", "./badges/verify.badge.tsx"),
  MoreInfoUser: componentLoader.add(
    "MoreInfoUser",
    "./more-info/moreinfo.user.tsx"
  ),
  // other custom components
};

export { componentLoader, Components };
