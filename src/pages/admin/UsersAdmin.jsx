import React, { useEffect, useState, useContext } from 'react';
import { Card, Button } from 'react-bootstrap';
import { AuthContext } from '../../auth/AuthContext';
import axiosClient from '../../api/axiosClient';
import DashboardLayout from '../../components/DashboardLayout';

export default function UsersAdmin() {
  const { user } = useContext(AuthContext);
  const [users, setUsers] = useState([]);

  useEffect(() => { axiosClient.get('/users').then(r => setUsers(r.data)).catch(console.error); }, []);

  const remove = async (id, role) => {
    if(role === 'ADMIN') {
      alert("Admin can't delete");  
      return;
    } 
    if (!window.confirm('Delete user?')) return;
    await axiosClient.delete(`/users/${id}`);
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  return (
    <DashboardLayout role={user.role}>
      <h2 className="fw-bold mb-4 text-primary">Users</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <div className="table-responsive">
            <table className="table table-hover">
              <thead className="table-light"><tr><th>ID</th><th>Username</th><th>Email</th><th>Role</th><th>Action</th></tr></thead>
              <tbody>
                {users.map(u => (
                  <tr key={u.id}> 
                    
                    <td>{u.id}</td>
                    <td>{u.username}</td> 
                    <td>{u.email}</td>
                    <td>{u.role}</td>
                    <td><Button variant="danger" size="sm" onClick={() => {remove(u.id, u.role)}}>Delete</Button></td>
                  </tr>
                ))}
                {users.length === 0 && <tr><td colSpan="5" className="text-center">No users</td></tr>}
              </tbody>
            </table>
          </div>
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
}
