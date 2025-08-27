import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Form, Modal } from 'react-bootstrap';
import { AuthContext } from '../../auth/AuthContext';
import { getApplications, updateApplicationStatus } from '../../api/applicationsApi';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import DashboardLayout from '../../components/DashboardLayout';

export default function ApplicationsAdmin() {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState('Approved');
  const [reason, setReason] = useState('');

  useEffect(() => { fetchAll(); }, []);

  const fetchAll = () => {
    getApplications().then(setApplications).catch(console.error);
  };

  const openModal = (app, act) => {
    setSelected(app);
    setAction(act);
    setShowModal(true);
  };

  const confirm = async () => {
    try {
      await updateApplicationStatus(selected.id, action, action === 'Rejected' ? reason : null);
      alert('Status updated');
      setShowModal(false);
      fetchAll();
    } catch (err) {
      console.error(err);
      alert('Update failed');
    }
  };

  return (
    <DashboardLayout role={user.role}>
      <h2 className="fw-bold mb-4 text-primary">Manage Applications</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <DataTable
            columns={[
              { key: 'id', title: 'ID' },
              { key: 'applicant', title: 'Applicant' },
              { key: 'loanType', title: 'Loan Type' },
              { key: 'loanAmount', title: 'Amount' },
              { key: 'status', title: 'Status' },
              { key: 'actions', title: 'Actions' }
            ]}
            data={applications}
            renderRow={(row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.fullName || row.user?.username || row.email}</td>
                <td>{row.loanType?.name}</td>
                <td>{row.loanAmount}</td>
                <td><StatusBadge status={row.status} /></td>
                <td>
                  <Button size="sm" className="me-2" onClick={() => openModal(row, 'Approved')} style={{ background: '#198754', border: 'none' }}>Approve</Button>
                  <Button size="sm" variant="danger" onClick={() => openModal(row, 'Rejected')}>Reject</Button>
                </td>
              </tr>
            )}
          />
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{action} Application</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Application ID: {selected?.id}</p>
          {action === 'Rejected' && (
            <Form.Group>
              <Form.Label>Rejection Reason</Form.Label>
              <Form.Control as="textarea" rows={3} value={reason} onChange={(e) => setReason(e.target.value)} />
            </Form.Group>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={confirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    </DashboardLayout>
  );
}
