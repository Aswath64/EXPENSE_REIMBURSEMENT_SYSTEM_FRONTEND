import React, { useEffect, useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { getApplicationById } from '../../api/applicationsApi';
import StatusBadge from '../../components/StatusBadge';
import DashboardLayout from '../../components/DashboardLayout';

export default function ApplicationView() {
  const { id } = useParams();
  const [app, setApp] = useState(null);

  useEffect(() => {
    getApplicationById(id).then(setApp).catch(console.error);
  }, [id]);

  if (!app) return <DashboardLayout role="APPLICANT"><p>Loading...</p></DashboardLayout>;

  return (
    <DashboardLayout role={app.user?.role || 'APPLICANT'}>
      <h2 className="fw-bold mb-4 text-primary">Application #{app.id} <StatusBadge status={app.status} /></h2>
      <Card className="shadow-sm">
        <Card.Body>
          <Row>
            <Col md={6} className="mb-3">
              <p><strong>Full Name :</strong> {app.fullName}</p>
              <p><strong>Email :</strong> {app.email}</p>
              <p><strong>Phone :</strong> {app.phoneNumber}</p>
              <p><strong>Reimbursement Amount :</strong> {app.loanAmount}</p>
              <p><strong>Reimbursement Purpose :</strong> {app.loanPurpose}</p>
            </Col>
            <Col md={6} className="mb-3">
              <p><strong>Employee ID :</strong> {app.employmentStatus}</p>
              {/* <p><strong>Annual Income:</strong> {app.annualIncome}</p>
              <p><strong>Term (months):</strong> {app.termMonths}</p> */}
              <p><strong>Applied On :</strong> {app.applicationDate ? new Date(app.applicationDate).toLocaleString() : ''}</p>
              {app.rejectionReason && <p className="text-danger"><strong>Rejection Reason:</strong> {app.rejectionReason}</p>}
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
}
