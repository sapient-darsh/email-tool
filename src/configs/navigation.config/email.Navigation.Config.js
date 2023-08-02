import { EMAILS_PREFIX_PATH } from "constants/route.constant";
import { NAV_ITEM_TYPE_ITEM } from "constants/navigation.constant";
import { ADMIN } from "constants/roles.constant";

const emailsNavigationConfig = [
  {
    key: "apps.emails",
    path: `${EMAILS_PREFIX_PATH}`,
    title: "Emails",
    icon: "emails",
    type: NAV_ITEM_TYPE_ITEM,
    authority: [ADMIN],
    subMenu: [],
  },
];

export default emailsNavigationConfig;
