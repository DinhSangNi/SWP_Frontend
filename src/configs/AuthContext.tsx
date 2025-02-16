import React, { createContext, useState, useContext, useEffect } from 'react';
import axiosInstance from './axiosInstance'; // Import axios instance

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Kiểm tra token khi khởi động ứng dụng
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Thêm logic xác thực token với backend
      axiosInstance.get('/Auth/me')
        .then(response => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem('token');
        });
    }
  }, []);

  const loginAuthContext = (userData) => {
    localStorage.setItem('token', userData.token);
    setUser(userData);
  };


  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Thêm token vào user state ngay lập tức
      setUser(prev => ({ ...prev, token }));
      
      // Xác thực token với backend
      axiosInstance.get('/Auth/me')
        .then(response => {
          setUser({
            token, // Giữ nguyên token
            ...response.data
          });
        })
        .catch(() => {
          localStorage.removeItem('token');
          setUser(null);
        });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginAuthContext, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;
