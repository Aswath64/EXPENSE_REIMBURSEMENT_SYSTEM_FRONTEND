import React from 'react';
import { Table, Button } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

export default function DataTable({ columns = [], data = [], renderRow = null, onView, onEdit, onDelete }) {
  return (
    <div className="table-responsive shadow-lg rounded overflow-hidden border border-light p-2 bg-white">
      <Table bordered hover responsive className="align-middle mb-0 fs-6 text-center table-striped">
        <thead className="bg-primary text-white fs-6">
          <tr>
            {columns.map((c) => (
              <th key={c.key} className="py-3">{c.title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="py-5 text-muted fst-italic">
                No records found.
              </td>
            </tr>
          )}
          {data.map((row, idx) => (
            renderRow ? renderRow(row, idx) : (
              <tr key={row.id || idx} className="align-middle text-center hover-shadow transition-all bg-light">
                {columns.map((c) => (
                  <td key={c.key} className="py-2">{row[c.key]}</td>
                ))}
                {(onView || onEdit || onDelete) && (
                  <td>
                    {onView && <Button size="sm" className="me-1" onClick={() => onView(row)}><FaEye /></Button>}
                    {onEdit && <Button size="sm" variant="warning" className="me-1" onClick={() => onEdit(row)}><FaEdit /></Button>}
                    {onDelete && <Button size="sm" variant="danger" onClick={() => onDelete(row)}><FaTrash /></Button>}
                  </td>
                )}
              </tr>
            )
          ))}
        </tbody>
      </Table>
    </div>
  );
}
