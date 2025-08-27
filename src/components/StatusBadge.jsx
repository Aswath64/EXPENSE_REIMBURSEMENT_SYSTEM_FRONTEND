import React from 'react';
import { Badge } from 'react-bootstrap';
import { FaCheckCircle, FaTimesCircle, FaHourglassHalf } from 'react-icons/fa';

export default function StatusBadge({ status }) {
  let variant, Icon;
  switch(status) {
    case 'Approved':
      variant = 'success';
      Icon = FaCheckCircle;
      break;
    case 'Rejected':
      variant = 'danger';
      Icon = FaTimesCircle;
      break;
    default:
      variant = 'warning';
      Icon = FaHourglassHalf;
  }

  return (
    <Badge
      bg={variant}
      className="rounded-pill px-3 py-1 fs-9 d-inline-flex align-items-center"
      style={{ fontWeight: 600 }}
    >
      <span className="me-1">{status}</span>
      <span className="me-1"></span>
      <span className="me-1"></span>
      <Icon size={16} />
    </Badge>
  );
}
