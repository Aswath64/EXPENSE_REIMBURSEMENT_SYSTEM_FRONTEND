import React, { useContext, useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { getApplications } from '../../api/applicationsApi';
import DataTable from '../../components/DataTable';
import StatusBadge from '../../components/StatusBadge';
import DashboardLayout from '../../components/DashboardLayout';

export default function MyApplications() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getApplications().then(data => {
      const mine = data.filter(a => a.user?.id === user.id || a.userId === user.id || a.email === user.email);
      setApplications(mine);
    }).catch(console.error);
  }, [user]);

  const columns = [
    { key: 'id', title: 'ID' },
    { key: 'loanType', title: 'Reimbursement' },
    { key: 'loanAmount', title: 'Amount' },
    { key: 'status', title: 'Status' },
    { key: 'applicationDate', title: 'Applied On' },
    { key: 'actions', title: 'Actions' }
  ];

  return (
    <DashboardLayout role={user.role}>
      <h2 className="fw-bold mb-4 text-primary">My Applications</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <DataTable
            columns={columns}
            data={applications}
            renderRow={row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.loanType?.name || row.loanType}</td>
                <td>{row.loanAmount}</td>
                <td><StatusBadge status={row.status} /></td>
                <td>{row.applicationDate ? new Date(row.applicationDate).toLocaleString() : (row.createdAt ? new Date(row.createdAt).toLocaleString() : '')}</td>
                <td><Button size="sm" onClick={() => navigate(`/applicant/applications/${row.id}`)}>View</Button></td>
              </tr>
            )}
          />
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
}
