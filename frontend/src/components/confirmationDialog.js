import React, { useState } from "react";
import { Button, Modal } from "antd";

const ConfirmationDialog = ({ buttonProps, onOk }) => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button {...buttonProps} onClick={() => setModalOpen(true)}>delete</Button>
      <Modal
        title="Delete"
        centered
        open={modalOpen}
        onOk={() => {
          onOk();
          setModalOpen(false);
        }}
        okButtonProps={{ danger: true }}
        onCancel={() => setModalOpen(false)}
      >
        Are you sure?
      </Modal>
    </>
  );
};

export default ConfirmationDialog;
