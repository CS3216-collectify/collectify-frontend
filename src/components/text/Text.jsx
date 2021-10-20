import { IonText } from "@ionic/react";

import "./Text.scss";

const Text = ({ children, size, className }) => {
  const getClassName = () => {
    var className = "text ";

    switch (size) {
      case "xs":
        className += "text--xs";
        break;

      case "s":
        className += "text--s";
        break;

      case "m":
        className += "text--m";
        break;

      case "l":
        className += "text--l";
        break;

      case "xl":
        className += "text--xl";
        break;

      default:
        className += "text--m";
        break;
    }

    return className;
  };
  return <IonText className={`${getClassName()} ${className}`}>{children}</IonText>;
};

export default Text;
