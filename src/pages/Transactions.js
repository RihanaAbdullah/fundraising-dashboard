import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/global.css";

const Transactions = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const refCode = searchParams.get("ref") || "";
  
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    taxExemption: false,
    referenceCode: refCode,
    amount: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const transactionId = 'pay_' + Math.random().toString(36).substr(2, 9);
    
    const transactionRecord = {
      id: Date.now(),
      name: formData.fullName,
      amount: formData.amount,
      transactionId: transactionId,
      date: new Date().toDateString(),
      pancard: "XXXXXXX",
      email: formData.email,
      phone: formData.phone,
      taxExemption: formData.taxExemption,
      referenceCode: formData.referenceCode
    };

    const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');
    const updatedTransactions = [...existingTransactions, transactionRecord];
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
    navigate('/transaction-details');
  };

  return (
    <div className="transactions-container">
      <div className="transaction-form">
        <button className="close-button">×</button>
        <h2>Personal Information</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <div className="phone-input">
              <span className="country-code">+91</span>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          <div className="form-group checkbox">
            <input
              type="checkbox"
              name="taxExemption"
              checked={formData.taxExemption}
              onChange={handleInputChange}
              id="taxExemption"
            />
            <label htmlFor="taxExemption">Do you wish to receive Tax Exemption?</label>
          </div>

          <div className="form-group">
            <label>Reference Code (if available)</label>
            <input
              type="text"
              name="referenceCode"
              value={formData.referenceCode}
              readOnly
              className="reference-input"
            />
          </div>

          <div className="form-group">
            <label>Donation Amount</label>
            <div className="amount-input">
              <span className="currency">₹</span>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="9000"
                required
              />
            </div>
          </div>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Transactions;