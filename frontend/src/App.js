import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dbStatus, setDbStatus] = useState({ loading: true, connected: false, data: null, error: null });

  useEffect(() => {
    // Fetch system connectivity configuration data from the backend API
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:4000';
    
    fetch(`${apiUrl}/api/db-check`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setDbStatus({ loading: false, connected: true, data: data, error: null });
      })
      .catch((err) => {
        setDbStatus({ loading: false, connected: false, data: null, error: err.message });
      });
  }, []);

  return (
    <div className="dashboard-container">
      {/* Top Navigation Control Bar */}
      <header className="dashboard-header">
        <div className="brand-title">
          <span className="logo-icon">☸️</span>
          <h1>CloudOps Command Center</h1>
        </div>
        <div className="badge-pill">Batch 8 • Week 8 Platform Task</div>
      </header>

      {/* Main Structural Layout Area */}
      <main className="dashboard-main">
        
        {/* Metric Cards Banner Grid */}
        <section className="metrics-grid">
          <div className="card">
            <h3>Cluster Load Balancer</h3>
            <div className="metric-value">Active</div>
            <span className="status-dot online"></span> Port 80 (HTTP)
          </div>
          <div className="card">
            <h3>Microservice API</h3>
            <div className="metric-value">Online</div>
            <span className="status-dot online"></span> Port 4000 (Node.js)
          </div>
          <div className="card">
            <h3>Infrastructure Layer</h3>
            <div className="metric-value">Docker Compose</div>
            <span className="status-dot online"></span> Isolated Network
          </div>
        </section>

        {/* Database Diagnostic Monitoring Terminal Status Card */}
        <section className="status-section">
          <h2>Database Connectivity Verification</h2>
          
          {dbStatus.loading && (
            <div className="status-box loading">
              <div className="spinner"></div>
              <p>Probing data infrastructure pipelines...</p>
            </div>
          )}

          {!dbStatus.loading && dbStatus.connected && (
            <div className="status-box success">
              <div className="status-icon">✅</div>
              <div className="status-details">
                <h3>Database Status: Fully Connected</h3>
                <p>Telemetry query handshake response successfully processed.</p>
                <div className="raw-response">
                  <code>Data payload: {JSON.stringify(dbStatus.data)}</code>
                </div>
              </div>
            </div>
          )}

          {!dbStatus.loading && !dbStatus.connected && (
            <div className="status-box failure">
              <div className="status-icon">❌</div>
              <div className="status-details">
                <h3>Database Status: Connection Severed</h3>
                <p>The backend microservice API layer failed to reach the database storage container node.</p>
                <span className="error-log">Reason: {dbStatus.error}</span>
              </div>
            </div>
          )}
        </section>

      </main>

      <footer className="dashboard-footer">
        <p>DevOps Systems Engineering Environment — Powered by Multi-Stage Docker Pipelines</p>
      </footer>
    </div>
  );
}

export default App;
