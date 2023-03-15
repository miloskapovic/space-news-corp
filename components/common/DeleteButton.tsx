import { styled } from "../../stitches.config";
import DeleteSvg from "../../public/delete.svg";
import { MouseEvent } from "react";

const DeleteButtonWrapper = styled("div", {
  position: "absolute",
  zIndex: 1,
  right: 0,
  top: 0,
});

const DeleteButtonStyle = styled("button", {
  position: "relative",
  width: "50px",
  height: "50px",
  borderRadius: "25px",
  border: "2px solid rgb(231, 50, 50)",
  backgroundColor: "#fff",
  cursor: "pointer",
  boxShadow: "0 0 10px #333",
  overflow: "hidden",
  transition: ".3s",
  "&:hover": {
    backgroundColor: "rgb(245, 207, 207)",
    transform: "scale(1.2)",
    boxShadow: "0 0 4px #111",
    transition: ".3s",
  },
});

const DeleteIcon = styled(DeleteSvg, {
  color: "rgb(231, 50, 50)",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  transition: ".3s",
});

interface Props {
  className: string;
  onClick: () => void;
}

export default function DeleteButton(props: Props) {
  const { className, onClick } = props;

  const handleDeleteButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClick();
  };

  return (
    <DeleteButtonWrapper className={className}>
      <DeleteButtonStyle onClick={(event) => handleDeleteButtonClick(event)}>
        <DeleteIcon />
      </DeleteButtonStyle>
    </DeleteButtonWrapper>
  );
}
