import React from 'react';
import { Container } from 'react-bootstrap';

export default function Unauthorized(){
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center"
      style={{ minHeight: '100vh' ,marginTop:'1px' ,paddingLeft: '600px'}} >
      <h3 className='fw-bold text-danger '>Unauthorized</h3>
      <p className='text-center'>You don't have permission to view this page.</p>
    </Container>
    
  )
}
