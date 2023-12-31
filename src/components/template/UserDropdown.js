import React from "react";
import { Avatar, Dropdown, useConfig } from "components/ui";
import withHeaderItem from "utils/hoc/withHeaderItem";
import useAuth from "utils/hooks/useAuth";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { HiOutlineUser, HiOutlineLogout, HiUser } from "react-icons/hi";

const dropdownItemList = [
  {
    label: "Profile",
    path: "/",
    icon: <HiOutlineUser />,
  },
];

export const UserDropdown = ({ className }) => {
  const { userName, authority, email } = useSelector(
    (state) => state.auth.user
  );

  const { signOut } = useAuth();

  const UserAvatar = (
    <div className={classNames(className, "flex items-center gap-2")}>
      <Avatar size={32} shape="circle" icon={<HiUser />} />
      <div className="hidden md:block">
        <div className="text-xs capitalize">{authority || "guest"}</div>
        <div className="font-bold">{userName}</div>
      </div>
    </div>
  );

  return (
    <div>
      <Dropdown
        menuStyle={{ minWidth: 240 }}
        renderTitle={UserAvatar}
        placement="bottom-end"
      >
        <Dropdown.Item variant="header">
          <div className="py-2 px-3 flex items-center gap-2">
            <Avatar shape="circle" icon={<HiUser />} />
            <div>
              <div className="font-bold text-gray-900 dark:text-gray-100">
                {userName}
              </div>
              <div className="text-xs">{email}</div>
            </div>
          </div>
        </Dropdown.Item>
        <Dropdown.Item variant="divider" />
        {dropdownItemList.map((item) => (
          <Dropdown.Item
            eventKey={item.label}
            key={item.label}
            className="mb-1"
          >
            <Link className="flex gap-2 items-center" to={item.path}>
              <span className="text-xl opacity-50">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          </Dropdown.Item>
        ))}
        <Dropdown.Item variant="divider" />
        <Dropdown.Item onClick={signOut} eventKey="Sign Out" className="gap-2">
          <span className="text-xl opacity-50">
            <HiOutlineLogout />
          </span>
          <span>Sign Out</span>
        </Dropdown.Item>
      </Dropdown>
    </div>
  );
};

export default withHeaderItem(UserDropdown);
