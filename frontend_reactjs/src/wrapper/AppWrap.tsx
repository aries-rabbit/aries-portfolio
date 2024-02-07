import SocialMedia from "@src/components/SocialMedia";
import React from "react";
import dayjs from "dayjs";
import { NavigationDots } from "./index";

type AppWrapProps = {
  Component: React.ComponentType;
  idName: string;
  classNames?: string;
};

const AppWrap = ({ Component, idName, classNames }: AppWrapProps) =>
  function HOC() {
    return (
      <div id={idName} className={`app__container ${classNames}`}>
        <SocialMedia />

        <div className="app__wrapper app__flex">
          <Component />

          <div className="copyright">
            <p className="p-text">{dayjs().year()} Thành</p>
            <p className="p-text">All right reserved</p>
          </div>
        </div>
        <NavigationDots active={idName} />
      </div>
    );
  };

export default AppWrap;
