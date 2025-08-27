import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

export default function DashboardLayout({ children, role }) {
  return (
    <div className="d-flex flex-column vh-100 w-100">
      {/* Navbar */}
      <Navbar />

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <Sidebar role={role} />

        {/* Main Content */}
        <main 
          className="flex-grow-1 p-4 overflow-auto" 
          style={{ background: '#f4f6f8', minHeight: 'calc(100vh - 70px)' }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
