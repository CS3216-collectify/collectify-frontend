import { IonText } from "@ionic/react";

import "./Text.scss";

const getSizeClass = (size) => {
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

const Text = (props) => {
  const { children, size, className, ...remainingProps } = props;
  const classes = `${getSizeClass(size)} ${className}`;

  return <IonText className={classes} {...remainingProps}>{children}</IonText>;
};

export default Text;
