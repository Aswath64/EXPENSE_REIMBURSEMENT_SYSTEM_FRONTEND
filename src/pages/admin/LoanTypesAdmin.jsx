import React, { useContext, useEffect, useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import { AuthContext } from '../../auth/AuthContext';
import { getLoanTypes, createLoanType, deleteLoanType } from '../../api/loanTypesApi';
import DashboardLayout from '../../components/DashboardLayout';

export default function LoanTypesAdmin() {
  const { user } = useContext(AuthContext);
  const [loanTypes, setLoanTypes] = useState([]);
  const [form, setForm] = useState({ name: '', maxAmount: '', interestRate: '' });

  useEffect(() => { load(); }, []);
  const load = () => getLoanTypes().then(setLoanTypes).catch(console.error);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await createLoanType({ name: form.name, maxAmount: parseFloat(form.maxAmount), interestRate: parseFloat(form.interestRate) });
      setForm({ name: '', maxAmount: '', interestRate: '' });
      load();
    } catch { alert('Failed'); }
  };

  const remove = async (id) => {
    if (!window.confirm('Delete loan type?')) return;
    try { await deleteLoanType(id); load(); } catch { alert('Delete failed'); }
  };

  return (
    <DashboardLayout role={user.role}>
      <h2 className="fw-bold mb-4 text-primary">Reimbursement Types</h2>
      <div className="d-flex flex-wrap gap-4">
        <Card className="shadow-sm p-3 flex-grow-1" style={{ minWidth: 280 }}>
          <h5 className="mb-3">Create Reimbursement Type</h5>
          <Form onSubmit={submit}>
            <Form.Group className="mb-2"><Form.Label>Name</Form.Label><Form.Control value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required /></Form.Group>
            <Form.Group className="mb-2"><Form.Label>Max Amount</Form.Label><Form.Control type="number" value={form.maxAmount} onChange={e => setForm({ ...form, maxAmount: e.target.value })} required /></Form.Group>
            {/* <Form.Group className="mb-2"><Form.Label></Form.Label><Form.Control type="number" value={form.interestRate} onChange={e => setForm({ ...form, interestRate: e.target.value })} required /></Form.Group> */}
            <Button type="submit" style={{ background: '#8a2929', border: 'none' }}>Create</Button>
          </Form>
        </Card>

        <Card className="shadow-sm flex-grow-2" style={{ minWidth: 400 }}>
          <Card.Body>
            {/* <h5 className="mb-3">Existing Loan Types</h5> */}
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light"><tr><th>ID</th><th>Name</th><th>Max</th><th>Rate</th><th>Action</th></tr></thead>
                <tbody>
                  {loanTypes.map(lt => (
                    <tr key={lt.id}>
                      <td>{lt.id}</td>
                      <td>{lt.name}</td>
                      <td>{lt.maxAmount}</td>
                      <td>{lt.interestRate}</td>
                      <td><Button variant="danger" size="sm" onClick={() => remove(lt.id)}>Delete</Button></td>
                    </tr>
                  ))}
                  {loanTypes.length === 0 && <tr><td colSpan="5" className="text-center">No loan types</td></tr>}
                </tbody>
              </table>
            </div>
          </Card.Body>
        </Card>
      </div>
    </DashboardLayout>
  );
}
