import React, { useEffect, useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getApplicationById, updateApplicationStatus } from '../../api/applicationsApi';
import StatusBadge from '../../components/StatusBadge';
import DashboardLayout from '../../components/DashboardLayout';

export default function ApplicationReview() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [note, setNote] = useState('');

  useEffect(() => {
    getApplicationById(id).then(setApp).catch(console.error);
  }, [id]);

  const recommend = async (decision) => {
    try {
      await updateApplicationStatus(id, decision, decision === 'Rejected' ? note : null);
      alert('Updated');
    } catch {
      alert('Operation failed');
    }
  };

  if (!app) return <DashboardLayout role="AGENT"><p>Loading...</p></DashboardLayout>;

  return (
    <DashboardLayout role="AGENT">
      <h2 className="fw-bold mb-4">Review Application #{app.id} <StatusBadge status={app.status} /></h2>
      <Card className="mb-3 shadow-sm">
        <Card.Body>
          <p><strong>Applicant:</strong> {app.fullName}</p>
          <p><strong>Amount:</strong> {app.loanAmount}</p>
          <p><strong>Purpose:</strong> {app.loanPurpose}</p>
        </Card.Body>
      </Card>

      <Card className="shadow-sm">
        <Card.Body>
          <Form.Group className="mb-3">
            <Form.Label>Notes / Rejection Reason</Form.Label>
            <Form.Control as="textarea" rows={3} value={note} onChange={e => setNote(e.target.value)} />
          </Form.Group>
          <Button className="me-2" style={{ background: '#198754', border: 'none' }} onClick={() => recommend('Approved')}>Recommend Approve</Button>
          <Button variant="danger" onClick={() => recommend('Rejected')}>Recommend Reject</Button>
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
}
