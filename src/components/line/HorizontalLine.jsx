const HorizontalLine = ({ weight = 2, color = "black" }) => (
  <hr
      style={{
          color,
          backgroundColor: color,
          height: weight
      }}
  />
);

export default HorizontalLine;
