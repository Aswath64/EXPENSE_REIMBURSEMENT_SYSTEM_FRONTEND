import React, { useContext } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import DashboardLayout from '../../components/DashboardLayout';

export default function DashboardApplicant() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <DashboardLayout role={user.role}>
      <h2 className="fw-bold mb-4 text-primary">Employee Dashboard</h2>
      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Apply Reimbursement</Card.Title>
              <Card.Text>Start a new Reimbursement application</Card.Text>
              <Button onClick={() => navigate('/applicant/apply')}style={{ background: '#8a2929', border: 'none' }}>Apply</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>My Applications</Card.Title>
              <Card.Text>View your applications and status</Card.Text>
              <Button onClick={() => navigate('/applicant/my-applications')}style={{ background: '#8a2929', border: 'none' }}>View</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
