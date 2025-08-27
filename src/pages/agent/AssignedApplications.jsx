import React, { useContext, useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import { AuthContext } from '../../auth/AuthContext';
import { getApplications } from '../../api/applicationsApi';
import DataTable from '../../components/DataTable';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';

export default function AssignedApplications() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [apps, setApps] = useState([]);

  useEffect(() => {
    getApplications().then(data => {
      const assigned = data.filter(a => a.agentId === user.id || a.assignedAgent?.id === user.id);
      setApps(assigned);
    }).catch(console.error);
  }, [user]);

  return (
    <DashboardLayout role={user.role}>
      <h2 className="fw-bold mb-4 text-primary">Assigned Applications</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <DataTable
            columns={[
              { key: 'id', title: 'ID' },
              { key: 'fullName', title: 'Applicant' },
              { key: 'loanAmount', title: 'Amount' },
              { key: 'status', title: 'Status' },
              { key: 'actions', title: 'Actions' }
            ]}
            data={apps}
            renderRow={(row) => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.fullName}</td>
                <td>{row.loanAmount}</td>
                <td>{row.status}</td>
                <td>
                  <Button size="sm" style={{ background: '#0dfd79', border: 'none' }} onClick={() => navigate(`/agent/applications/${row.id}`)}>Review</Button>
                </td>
              </tr>
            )}
          />
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
}
