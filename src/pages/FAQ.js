import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/global.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { 
      question: "How do I start fundraising?", 
      answer: "You can start fundraising by registering on our platform and sharing your unique donation link with potential donors."
    },
    { 
      question: "Where do the donations go?", 
      answer: "All donations go directly to the NayePankh Foundation to support various social causes."
    },
    { 
      question: "How can I track my donations?", 
      answer: "You can track your donations on the 'Transactions' page in your dashboard."
    },
    { 
      question: "What happens if I don’t reach my goal?", 
      answer: "Even if you don't reach your goal, all donations will still go towards the cause you are supporting."
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <h2 className="page-title">Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button className="faq-question" onClick={() => toggleFAQ(index)}>
                {faq.question} {openIndex === index ? "▲" : "▼"}
              </button>
              {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
