import { styled } from "@stitches/react";
import Button from "./Button";

const Modal = styled("div", {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0,0,0,0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2,
});

const ModalContent = styled("div", {
  backgroundColor: "white",
  padding: "30px",
  borderRadius: "4px",
});

interface Props {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmationModal(props: Props) {
  const { isOpen, onConfirm, onCancel } = props;
  return isOpen ? (
    <Modal>
      <ModalContent>
        <p>Are you sure?</p>
        <Button label="Yes" onClick={onConfirm} />
        <Button label="No" onClick={onCancel} />
      </ModalContent>
    </Modal>
  ) : null;
}
