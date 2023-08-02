import React from "react";
import ModeSwitcher from "./ModeSwitcher";

const ThemeConfigurator = () => {
  return (
    <div className="flex flex-col h-full justify-between">
      <div className="flex items-center justify-between">
        <ModeSwitcher />
      </div>
    </div>
  );
};

export default ThemeConfigurator;
