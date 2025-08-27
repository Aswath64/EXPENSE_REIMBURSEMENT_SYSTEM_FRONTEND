import React, { useContext } from 'react';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { AuthContext } from '../../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <DashboardLayout role={user.role}>
      <h2 className="fw-bold mb-4 text-primary">Admin Dashboard</h2>
      <Row className="g-4">
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>All Applications</Card.Title>
              <Button onClick={() => navigate('/admin/applications')} className="mt-3 w-50 align-self-start" style={{ background: '#882d2d', border: 'none' }}>Manage</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>Employee Types</Card.Title>
              <Button onClick={() => navigate('/admin/loan-types')} className="mt-3 w-50 align-self-start" style={{ background: '#882d2d', border: 'none' }}>Manage</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body className="d-flex flex-column justify-content-between">
              <Card.Title>Users</Card.Title>
              <Button onClick={() => navigate('/admin/users')} className="mt-3 w-50 align-self-start" style={{ background: '#882d2d', border: 'none' }}>Manage</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}
