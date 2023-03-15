import { MouseEvent } from "react";
import { styled } from "../../stitches.config";

const StyledButton = styled("button", {
  backgroundColor: "#FFF",
  color: "#888",
  padding: "10px",
  textAlign: "center",
  display: "inline-block",
  fontSize: "14px",
  fontWeight: "500",
  cursor: "pointer",
  transition: "all 0.15s ease",
  border: "1px solid #888",
  borderRadius: "5px",
  margin: "10px 5px",
  "&:hover": {
    backgroundColor: "#888",
    color: "#fff",
  },
  variants: {
    active: {
      true: {
        backgroundColor: "#888",
        color: "#fff",
      },
    },
    dropdown: {
      true: {
        "&::after": {
          content: "▼",
          paddingLeft: "0.5em",
        },
      },
    },
  },
});

interface Props {
  active?: boolean;
  dropdown?: boolean;
  label: string;
  onClick: () => void;
}

export default function Button(props: Props) {
  const { active, dropdown, label, onClick } = props;

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick();
  };
  return (
    <StyledButton
      active={active}
      dropdown={dropdown}
      onClick={(event) => handleClick(event)}
    >
      {label}
    </StyledButton>
  );
}
