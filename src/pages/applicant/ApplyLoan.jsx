import React, { useContext, useEffect, useState } from 'react';
import { Row, Col, Card, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../auth/AuthContext';
import { getLoanTypes } from '../../api/loanTypesApi';
import { createApplication } from '../../api/applicationsApi';
import DashboardLayout from '../../components/DashboardLayout';

export default function ApplyLoan() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loanTypes, setLoanTypes] = useState([]);
  const [form, setForm] = useState({
    loanTypeId: '', fullName: '', email: user?.email || '', phoneNumber: '',
    loanAmount: '', loanPurpose: '', employmentStatus: 'abc', annualIncome: '1234', termMonths: ''
  });

  const [error, setError] = useState({});

  const validateForm = () => {
    const newError = {};
    if(!form.loanTypeId) {
      newError.loanTypeId = "Reimbursement type is required";
    }
    if(!form.fullName.trim()){
      newError.fullName = "Name is required";
    }else if(form.fullName.trim().length < 3){
      newError.fullName = "Name must be at least 3 characters long";
    } 

    if(!form.email.trim()){
      newError.email = "Email is required";
    }else if(!/\S+@\S+\.\S+/.test(form.email)){
      newError.email = "Email is invalid";
    }

    if(!form.phoneNumber.trim()){ 
      newError.phoneNumber = "Phone number is required";
    }else if (!/^[6-9]\d{9}$/.test(form.phoneNumber)) {
        newError.phoneNumber = "Enter a valid 10-digit phone number starting with 6-9";
    }

    if(!form.loanAmount ){
      newError.loanAmount = "Loan amount is required";
    }else if(form.loanAmount <= 1000){ 
      newError.loanAmount = "Reimbursement amount must be greater than 1000";
    }

    if(!form.loanPurpose.trim()){
      newError.loanPurpose = "Reimbursement Purpose is required";
    }

    if(!form.employmentStatus.trim()){
      newError.employmentStatus = "Employement status is required";
    }

    // if(!form.annualIncome){
    //   newError.annualIncome = "AnnualIncome is required";
    // }

    if(!form.termMonths){
      newError.termMonths = "TermsMonth is required";
    }else if(form.termMonths <=0 ){
      newError.termsMonths = "Months Should be positive";
    }
     
    setError(newError);
    return Object.keys(newError).length === 0;
  }

  useEffect(() => {
    if (!user) navigate('/login');
    getLoanTypes().then(setLoanTypes).catch(console.error);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if(!isValid) return;
    
    if (!form.loanTypeId) { alert('Please select a loan type.'); return; }


    try {
      await createApplication({
        ...form,
        loanTypeId: Number(form.loanTypeId),
        loanAmount: Number(form.loanAmount),
        annualIncome: Number(form.annualIncome),
        termMonths: Number(form.termMonths)
      });
      alert('Application submitted successfully!');
      navigate('/applicant/my-applications');
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message || 'Submission failed.');
    }
  };

  return (
    <DashboardLayout role={user?.role}>
      <h2 className="fw-bold mb-4 text-primary">Apply for Reimbursement</h2>
      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Reimbursement Type</Form.Label>
                  <Form.Select  value={form.loanTypeId} onChange={e => {setForm({ ...form, loanTypeId: e.target.value }); 
                    if(error.loanTypeId) setError({...error, loanTypeId: ''})}}>
                    <option value="">-- Select --</option>
                    {loanTypes.map(lt => <option key={lt.id} value={lt.id}>{lt.name} (Max: {lt.maxAmount})</option>)}
                  </Form.Select>
                </Form.Group>
                { error.loanTypeId && <div className='text-danger mb-2'>{error.loanTypeId}</div> }

                <Form.Group>
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control  value={form.fullName} onChange={e => {setForm({ ...form, fullName: e.target.value });
                    if(error.fullName) setError({...error, fullName : ''}) }} />
                </Form.Group>
                {error.fullName && <div className='text-danger mb-2'>{error.fullName}</div> }

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email"  value={form.email} onChange={e =>{ setForm({ ...form, email: e.target.value });
                    if(error.email) setError({...error, email:''}) }} />
                </Form.Group>
                {error.email && <div className='text-danger mb-2'>{error.email}</div> }

                <Form.Group>
                  <Form.Label>Phone</Form.Label>
                  <Form.Control  value={form.phoneNumber} onChange={e => {setForm({ ...form, phoneNumber: e.target.value });
                    if(error.phoneNumber) setError({...error, phoneNumber: ''}) }} />
                </Form.Group>
                {error.phoneNumber && <div className='text-danger mb-2'>{error.phoneNumber}</div> }

              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Reiumbersement Amount</Form.Label>
                  <Form.Control type="number"  value={form.loanAmount} onChange={e => {setForm({ ...form, loanAmount: e.target.value });
                    if(error.loanAmount) setError({...error, loanAmount: ''})}} />
                </Form.Group>
                {error.loanAmount && <div className='text-danger mb-2'>{error.loanAmount}</div> }

                <Form.Group>
                  <Form.Label>Reimbursement Purpose</Form.Label>
                  <Form.Control  value={form.loanPurpose} onChange={e => {setForm({ ...form, loanPurpose: e.target.value });
                    if(error.loanPurpose) setError({...error, loanPurpose:''})}} />
                </Form.Group>
                  {error.loanPurpose && <div className='text-danger mb-2'>{error.loanPurpose}</div> }

                {/* <Form.Group>
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control  value={form.employmentStatus} onChange={e => {setForm({ ...form, employmentStatus: e.target.value });
                    if(error.employmentStatus) setError({...error, employmentStatus: ''})}} />
                </Form.Group>
                {error.employmentStatus && <div className='text-danger mb-2'>{error.employmentStatus}</div> }

                <Form.Group>
                  <Form.Label>Annual Income</Form.Label>
                  <Form.Control type="number"  value={form.annualIncome} onChange={e => {setForm({ ...form, annualIncome: e.target.value });
                    if(error.annualIncome) setError({...error, annualIncome: ''})}} />
                </Form.Group>
                {error.annualIncome && <div className='text-danger mb-2'>{error.annualIncome}</div> } */}

                <Form.Group>
                  <Form.Label>Employee ID</Form.Label>
                  <Form.Control type="number"  value={form.termMonths} onChange={e => {setForm({ ...form, termMonths: e.target.value });
                    if(error.termMonths) setError({...error, termMonths: ''})}} />
                </Form.Group>
                { error.termMonths && <div className='text-danger mb-2'>{error.termMonths}</div> }

              </Col>
            </Row>
            <Button className="mt-3" type="submit"style={{ background: '#8a2929', border: 'none' }}>Submit Application</Button>
          </Form>
        </Card.Body>
      </Card>
    </DashboardLayout>
  );
}
