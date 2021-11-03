import Text from "../text/Text";
import "./TextBackground.scss";

const TextBackground = ({ size, text }) => {
  return (
    <div className="text-background--container">
      <Text size={size} className="text-background--text">
        {text}
      </Text>
    </div>
  );
};

export default TextBackground;
