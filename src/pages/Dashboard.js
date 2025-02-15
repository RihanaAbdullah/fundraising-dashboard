import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Function to generate the transaction link
  const getTransactionLink = () => {
    return `http://192.168.0.107:3000/transactions?ref=${user?.uid}`;
  };

  // Function to copy the transaction link and navigate
  const handleCopyLink = () => {
    const transactionLink = getTransactionLink();
    navigator.clipboard.writeText(transactionLink)
      .then(() => {
        setCopied(true);
        alert("Transaction link copied to clipboard!");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => console.error("Failed to copy: ", err));
  };
  
  // Function to share the transaction link on WhatsApp
  const shareOnWhatsApp = () => {
    const transactionLink = getTransactionLink();
    const message = `I am volunteering with NayePankh Foundation, a distinguished NGO based in Noida, Uttar Pradesh. Recognized by the government with 80G & 12A registration and featured in esteemed publications such as The Pioneer, Dainik Jagran, and Hindustan, NayePankh Foundation stands as one of the largest student-led organizations dedicated to uplifting the underprivileged and fostering positive societal change. Currently, we are actively engaged with over 475 children across 10 shelter homes, 3 community centers, and 5 villages, fostering a supportive environment for their holistic growth and development. Your support can make a significant difference in the lives of these deserving children. To contribute and be part of our endeavor, Support our cause by donating here: ${transactionLink}  and remember to use the referral code (Referral Code: ${user?.uid}) to help us track our efforts effectively. To learn more about our initiatives and the impact we're making, please visit www.nayepankh.org.in. Together, let's pave the way for a brighter future for the underprivileged children in our society. Thank you for your generosity and support!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };
 
  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <div className="top-bar">
          <div className="notification-section">
            <div className="notification-message">
              <span className="notification-bell">🔔</span>
              GET THE LATEST UPDATES FROM US
            </div>
            <button className="button button-primary">Allow</button>
            <button className="button button-secondary">Later</button>
          </div>
          <div className="user-section">
            <span className="user-name">{user?.displayName || "Volunteer"}</span>
            <div className="user-avatar"></div>
          </div>
        </div>
        <div className="hero-section">
          <div className="hero-background"></div>
          <div className="hero-content">
            <h1 className="hero-title">Hello, {user?.displayName || "Volunteer"}!</h1>
            <p className="hero-text">
              The initial push is the toughest! Go through the learning modules,
              or reach out to your fundraising manager to level up.
            </p>
          </div>
        </div>
        <div className="stats-section">
          <div className="left-stats">
            <div className="goal-circle">
              <span className="goal-achieved">10</span>
              <span className="goal-text">Goals Achieved</span>
            </div>
            <p className="total-goal">Total Goal: ₹30,000</p>
          </div>
          <div className="right-stats">
            <div className="level-achieved">Level Achieved: ⭐</div>
            <button className="button button-reward">View Rewards</button>

            {/* Copy Transaction Link Button */}
            <button className="button button-copy-link" onClick={handleCopyLink}>
              {copied ? "Copied!" : "Copy Transaction Link"}
            </button>

            <div className="time-left">
              <span className="time-label">Time Left:</span>
              <span className="time-status">Campaign Expired</span>
              <button className="button button-extend">Extend Now</button>
            </div>

            <div className="reference-code">
              <strong>Reference Code:</strong> {user?.uid || "N/A"}
            </div>

            <button className="button button-start">Start Here</button>

            {/* View Transactions Button */}
            <button className="button button-transactions" onClick={() => navigate("/transaction-details")}>
              View Transactions
            </button>
          </div>
        </div>

        {/* Share on WhatsApp Button */}
        <div className="whatsapp-section">
          <button className="button button-whatsapp" onClick={shareOnWhatsApp}>
            Share on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;