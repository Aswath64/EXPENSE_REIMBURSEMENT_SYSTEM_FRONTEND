import React, { useState } from 'react';
import { Card, Form, Button, Spinner } from 'react-bootstrap';
import { requestOtpApi, verifyOtpApi } from '../../api/authApi';
import Navbar from '../../components/Navbar';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState({});
  const [isValidateOTP, setIsValidateOTP] = useState({});

  const isValidate = () => {
     const newError = {}; 
    if(!email.trim()){
      newError.email = 'Email is required';
    }else if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
      newError.email = 'Invalid email format';
    }

    setIsValid(newError);
    return Object.keys(newError).length === 0;
  }

    const isValidated = () => {
     
    const newError = {};
    if(!otp.trim()){
      newError.otp = 'OTP is required';
    }else if(!/^\d{6}$/.test(otp)){
      newError.otp = 'OTP must be a 6-digit number';
    }
    if(!newPassword.trim()){
      newError.newPassword = 'New password is required';
    }else if(newPassword.length < 6){
      newError.newPassword = 'Password must be at least 6 characters';
    }

    setIsValidateOTP(newError);
    return Object.keys(newError).length === 0;
  }


  // const handleRequestOtp = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');
  //   setMessage('');
  //   if(!isValidate()) 
  //     {
  //       setLoading(false);
  //       return ;
  //     }
 
  //   try {
  //     const res = await requestOtpApi( email );
  //     setMessage(res.data);
  //     setStep(2);
  //   } catch (err) {
  //     setError(err?.response?.data?.message || 'Failed to send OTP');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleRequestOtp = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setMessage('');

  // Frontend email validation
  if (!isValidate()) {
    setLoading(false);
    return;
  }

  try {
    const res = await requestOtpApi(email); // Call backend API
    setMessage(res || `OTP sent to your email: ${email}`); // success message
    setStep(2); // move to OTP step
  } catch (err) {
    // Backend sends 404 with "No registration found with this email"
    setError(err?.response?.data || 'Failed to send OTP'); 
  } finally {
    setLoading(false);
  }
};


  // const handleVerifyOtp = async (e) => {

  //   e.preventDefault();
  //    console.log("Function calling for handlevalidateotp");
  //   setLoading(true);
  //   setError('');
  //   setMessage('');
  //   if(!isValidated())
  //     {
  //        console.log("Inside isvalidateOTP function");
  //        setLoading(false);
  //       return ;

  //     } 
  
  //   try {
  //     const res = await verifyOtpApi( email, otp, newPassword );
  //     setMessage(res.data);
  //     setStep(3); // Optional: show success page
  //   } catch (err) {
  //     setError(err?.response?.data?.message || 'OTP verification failed');
  //      console.log(err); // debug actual error shape
  //     //  setError('OTP verification failed');

  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleVerifyOtp = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setMessage('');

  if (!isValidated()) {
    setLoading(false);
    return;
  }

  try {
    const res = await verifyOtpApi(email, otp, newPassword);
    setMessage(res); // res is already the success string from backend
    setStep(3); // move to success step
  } catch (err) {
    setError(err?.response?.data || 'OTP verification failed'); // use err.response.data directly
    console.log(err); // debug actual error shape
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Navbar />
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: 'calc(100vh - 70px)',
          background: 'linear-gradient(120deg, #f5f7fa, #c3cfe2)',
          padding: '20px'
        }}
      >
        <Card className="shadow-lg rounded-4 p-4" style={{ maxWidth: 450, width: '100%' }}>
          <h3 className="fw-bold mb-4 text-center text-primary">Forgot Password</h3>

          {message && <div className="alert alert-success text-center">{message}</div>}
          {error && <div className="alert alert-danger text-center">{error}</div>}

          {step === 1 && (
            <Form onSubmit= {handleRequestOtp}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => {setEmail(e.target.value); if(error) setError(''); if(isValid.email) setIsValid({...isValid, email:''})}}
                  
                  className="shadow-sm rounded-pill px-3 py-2"
                />
              </Form.Group>
              {isValid.email && <div className="text-danger mb-2">{isValid.email}</div>} 
              <Button type="submit" className="w-100 rounded-pill py-2" style={{ background: '#1e3c72', border: 'none' }} >
                {!isValid.email ? <div> {loading ? <Spinner animation="border" size="sm" /> : 'Send OTP'} </div> : 'Sent OTP'}
              </Button>
            </Form>
          )}

          {step === 2 && (
            <Form onSubmit={handleVerifyOtp}>
              <Form.Group className="mb-3">
                <Form.Label>OTP</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter OTP sent to your email"
                  value={otp}
                  onChange={(e) => {setOtp(e.target.value); if(error) setError('')}}
                 
                  className="shadow-sm rounded-pill px-3 py-2"
                />
              </Form.Group>
              {isValidateOTP.otp && <div className="text-danger mb-2">{isValidateOTP.otp}</div>}

              <Form.Group className="mb-3">
                <Form.Label>New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  
                  className="shadow-sm rounded-pill px-3 py-2"
                />
              </Form.Group>
              {isValidateOTP.newPassword && <div className="text-danger mb-2">{isValidateOTP.newPassword}</div>}

              <Button type="submit" className="w-100 rounded-pill py-2" style={{ background: '#1e3c72', border: 'none' }}>
                 {!isValidateOTP.otp && !isValidateOTP.newPassword ? <div> {loading ? <Spinner animation="border" size="sm" /> : 'Reset Password'} </div> : 'Reset Password'}
             
              </Button>
            </Form>
          )}

          {step === 3 && (
            <div className="text-center mt-3">
              <h5 className="text-success">Password reset successful!</h5>
              <a href="/login" className="btn btn-primary mt-2 rounded-pill">Go to Login</a>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
