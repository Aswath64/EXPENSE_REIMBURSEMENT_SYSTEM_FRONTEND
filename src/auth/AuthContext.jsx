/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axiosClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const nav = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ handle initial loading

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Validate token with backend
      axiosClient.get('/auth/me')
        .then(res => setUser(res.data)) // backend returns { id, username, email, role }
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = (userObj, token) => {
    const userWithIdAndRole = {
      id: userObj.id,
      username: userObj.username,
      email: userObj.email || '',
      role: userObj.role?.toString()
    };
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userWithIdAndRole));
    setUser(userWithIdAndRole);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    nav('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
// import React, { createContext, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axiosClient from '../api/axiosClient';

// export const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const nav = useNavigate();
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true); // ✅ handle initial loading

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // Validate token with backend
//       axiosClient.get('/auth/me')
//         .then(res => setUser(res.data)) // backend returns { id, username, email, role }
//         .catch(() => {
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           setUser(null);
//         })
//         .finally(() => setLoading(false));
//     } else {
//       setLoading(false);
//     }
//   }, []);

//   const login = (userObj, token) => {
//     const userWithIdAndRole = {
//       id: userObj.id,
//       username: userObj.username,
//       email: userObj.email || '',
//       role: userObj.role?.toString()
//     };
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(userWithIdAndRole));
//     setUser(userWithIdAndRole);
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     nav('/login');
//   };

//   return (
//     <AuthContext.Provider value={{ user, login, logout, loading }}>
//       {!loading && children}
//     </AuthContext.Provider>
//   );
// };
