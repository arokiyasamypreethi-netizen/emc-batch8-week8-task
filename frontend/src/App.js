import { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [dbStatus, setDbStatus] = useState('Loading...');

  useEffect(() => {
    fetch('http://host.docker.internal:4000/api/db-check')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'ok') {
          setDbStatus('✅ Database Connected (1 + 1 = ' + data.result + ')');
        } else {
          setDbStatus('❌ Database Error: ' + data.error);
        }
      })
      .catch(err => {
        setDbStatus('❌ Failed to fetch: ' + err.message);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Batch 2 Week 8 Task</h1>
        <h2>Database Status:</h2>
        <p>{dbStatus}</p>
      </header>
    </div>
  );
}

export default App;
