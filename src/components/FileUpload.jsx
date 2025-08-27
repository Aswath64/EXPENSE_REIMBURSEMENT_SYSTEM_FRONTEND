import React, { useState } from 'react';
import { Form, Button, ProgressBar } from 'react-bootstrap';

export default function FileUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!file) return alert('Please select a file');
    if (onUpload) onUpload(file, setProgress);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      className="d-flex flex-column gap-3 w-100 p-4 shadow-lg rounded-4 bg-white"
    >
      <Form.Group>
        <Form.Control
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="shadow-sm p-3 fs-6 rounded-pill border-1 border-light"
        />
      </Form.Group>
      {progress > 0 && (
        <ProgressBar
          now={progress}
          label={`${progress}%`}
          animated
          className="mb-2 rounded-pill"
          variant="success"
        />
      )}
      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="shadow-lg rounded-pill w-50 mx-auto gradient-btn"
      >
        Upload
      </Button>
    </Form>
  );
}

