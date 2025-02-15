import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


const TransactionDetails = () => {
  const [hovered, setHovered] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTransactions = JSON.parse(localStorage.getItem("transactions") || "[]");
    setTransactions(savedTransactions);
  }, []);

  const handleDelete = (transactionId) => {
    const updatedTransactions = transactions.filter((t) => t.transactionId !== transactionId);
    setTransactions(updatedTransactions);
    localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
  };

  const getMenuItemStyle = (index, hovered) => ({
    display: "block",
    padding: "10px 15px",
    color: "#333",
    textDecoration: "none",
    borderRadius: "5px",
    backgroundColor: hovered === index ? "#f1f3f5" : "transparent",
    transition: "background 0.3s",
  });

  const styles = {
    transactionContainer: { display: "flex", minHeight: "100vh", backgroundColor: "#f8f9fa" },
    sidebar: { width: "250px", background: "white", borderRight: "1px solid #dee2e6", position: "fixed", height: "100%", padding: "20px" },
    sidebarHeader: { display: "flex", justifyContent: "center", paddingBottom: "10px", borderBottom: "1px solid #dee2e6" },
    logo: { fontSize: "20px", fontWeight: "bold", color: "#dc3545", padding: "10px", border: "2px solid #305ea4", borderRadius: "8px", textAlign: "center", width: "100px" },
    sidebarMenu: { marginTop: "20px" },
    menuTitle: { fontSize: "14px", color: "#6c757d", marginBottom: "10px", fontWeight: "bold" },
    activeMenuItem: { backgroundColor: "#dc3545", color: "white" },
    mainContent: { flex: 1, marginLeft: "250px", padding: "20px" },
    topBar: { background: "white", padding: "15px", borderRadius: "8px", display: "flex", justifyContent: "space-between", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" },
    pageTitle: { fontSize: "20px", fontWeight: "bold" },
    breadcrumb: { fontSize: "14px", color: "#6c757d" },
    current: { fontWeight: "bold", color: "#333" },
    transactionsTableContainer: { background: "white", marginTop: "20px", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)" },
    transactionsTable: { width: "100%", borderCollapse: "collapse" },
    tableHeader: { background: "#f8f9fa", padding: "10px", textAlign: "left", fontWeight: "bold", borderBottom: "2px solid #dee2e6" },
    tableCell: { padding: "10px", borderBottom: "1px solid #dee2e6" },
    transactionId: { fontFamily: "monospace", color: "#666" },
    amount: { fontWeight: "bold", color: "#28a745" },
    pancard: { fontFamily: "monospace", letterSpacing: "0.5px" },
    deleteButton: { padding: "5px 10px", backgroundColor: "#dc3545", color: "white", border: "none", borderRadius: "5px", cursor: "pointer" },
    transactionButton: { 
      padding: "10px 15px", 
      backgroundColor: "#305ea4",  // Changed from #4f69e8 to #305ea4
      color: "white", 
      border: "none", 
      borderRadius: "5px", 
      cursor: "pointer" 
  }// Updated button color
  
};



  const handleMenuClick = (route) => {
    navigate(route);
  };

  return (
    <div style={styles.transactionContainer}>
      {/* Sidebar */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <div style={styles.logo}>Logo</div>
        </div>

        <div style={styles.sidebarMenu}>
          <div style={styles.menuTitle}>General</div>
          {[
            { name: "Dashboard", path: "/dashboard" },
            { name: "Transactions", path: "/transactions" },
            { name: "Start Here", path: "/start-here" },
            { name: "FAQ", path: "/faq" },
            { name: "Learning Modules", path: "/learning" },
            { name: "Rewards", path: "/rewards" },
            { name: "Feedback", path: "/feedback" },
          ].map((item, index) => (
            <div
              key={index}
              onClick={() => handleMenuClick(item.path)}
              style={{
                ...getMenuItemStyle(index, hovered),
                cursor: "pointer",
                ...(item.name === "Transactions" ? styles.activeMenuItem : {}),
              }}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Top Bar */}
        <div style={styles.topBar}>
          <div style={styles.pageTitle}>Transactions</div>
          <div style={styles.breadcrumb}>
            <span>General</span> / <span style={styles.current}>Transactions</span>
          </div>
        </div>

        {/* Transactions Table */}
        <div style={styles.transactionsTableContainer}>
          <table style={styles.transactionsTable}>
            <thead>
              <tr>
                <th style={styles.tableHeader}>ID</th>
                <th style={styles.tableHeader}>Name</th>
                <th style={styles.tableHeader}>Amount</th>
                <th style={styles.tableHeader}>Transaction Id</th>
                <th style={styles.tableHeader}>Date</th>
                <th style={styles.tableHeader}>Pancard</th>
                <th style={styles.tableHeader}>Action</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length > 0 ? (
                transactions.map((transaction, index) => (
                  <tr key={transaction.id}>
                    <td style={styles.tableCell}>{index + 1}</td>
                    <td style={styles.tableCell}>{transaction.name}</td>
                    <td style={{ ...styles.tableCell, ...styles.amount }}>{transaction.amount}</td>
                    <td style={{ ...styles.tableCell, ...styles.transactionId }}>{transaction.transactionId}</td>
                    <td style={styles.tableCell}>{transaction.date}</td>
                    <td style={{ ...styles.tableCell, ...styles.pancard }}>{transaction.pancard}</td>
                    <td style={styles.tableCell}>
                      <button style={styles.deleteButton} onClick={() => handleDelete(transaction.transactionId)}>Delete</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ ...styles.tableCell, textAlign: "center" }}>
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetails;
