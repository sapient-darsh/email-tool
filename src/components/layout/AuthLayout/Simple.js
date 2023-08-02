import React, { cloneElement } from "react";
import { Container } from "components/shared";
import { Card } from "components/ui";
import Logo from "components/template/Logo";
import { useSelector } from "react-redux";
import {
  NAV_MODE_DARK,
  NAV_MODE_LIGHT,
  NAV_MODE_TRANSPARENT,
} from "constants/theme.constant";

const Simple = ({ children, content, ...rest }) => {
  const navMode = useSelector((state) => state.theme.mode);
  const mode = useSelector((state) => state.theme.mode);

  const logoMode = () => {
    if (navMode === "dark") {
      return NAV_MODE_DARK;
    }
    if (navMode === NAV_MODE_TRANSPARENT) {
      return mode;
    }
    return NAV_MODE_LIGHT;
  };

  return (
    <div className="h-full">
      <Container className="flex flex-col flex-auto items-center justify-center min-w-0 h-full">
        <Card className="min-w-[320px] md:min-w-[450px]" bodyClass="md:p-10">
          <div className="text-center flex items-center justify-center m-4">
            <Logo type="full" mode={logoMode()} logoWidth="200px" />
          </div>
          <div className="text-center">
            {content}
            {children
              ? cloneElement(children, {
                  contentClassName: "text-center",
                  ...rest,
                })
              : null}
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Simple;
