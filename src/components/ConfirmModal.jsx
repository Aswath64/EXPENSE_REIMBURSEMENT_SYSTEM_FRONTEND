import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function ConfirmModal({ show, onHide, title, body, onConfirm, confirmLabel = 'Confirm' }) {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
      size="lg"
      className="rounded-4 shadow-lg"
    >
      <Modal.Header
        closeButton
        className="bg-primary text-white p-3 rounded-top shadow-sm"
      >
        <Modal.Title className="fs-4 fw-bold">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="fs-6 py-4">{body}</Modal.Body>
      <Modal.Footer className="border-0">
        <Button
          variant="outline-secondary"
          size="lg"
          onClick={onHide}
          className="shadow-sm rounded-pill px-4"
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          size="lg"
          className="shadow-lg rounded-pill px-4"
          onClick={() => { onConfirm(); onHide(); }}
        >
          {confirmLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}


