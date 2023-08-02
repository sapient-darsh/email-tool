import React from "react";
import { EMAILS_PREFIX_PATH } from "constants/route.constant";
import { ADMIN, USER } from "constants/roles.constant";

const appsRoute = [
  {
    key: "apps.emails",
    path: `${EMAILS_PREFIX_PATH}`,
    component: React.lazy(() => import("views/Email")),
    authority: [ADMIN, USER],
  },
];

export default appsRoute;
