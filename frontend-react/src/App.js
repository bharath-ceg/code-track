import React, { useState, useEffect } from 'react';
import { getProblems, createProblem, getAllSubmissions } from './services/api';
import './index.css';

function App() {
  const [problems, setProblems] = useState([]);
  const [submissions, setSubmissions] = useState([]);
  const [newProblem, setNewProblem] = useState({ title: '', description: '', difficulty: 'Easy', sampleInput: '', sampleOutput: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Cross-Domain SSO: Capture token from URL if redirected from EJS Gateway
    const urlParams = new URLSearchParams(window.location.search);
    const urlToken = urlParams.get('token');
    if (urlToken) {
      localStorage.setItem('token', urlToken);
      window.history.replaceState({}, document.title, window.location.pathname); // Clean URL
    }
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const probRes = await getProblems();
      setProblems(probRes.data);
      const subRes = await getAllSubmissions();
      setSubmissions(subRes.data);
    } catch (err) {
      console.error("Access restricted: Admin credentials required.");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProblem = async (e) => {
    e.preventDefault();
    try {
      await createProblem(newProblem);
      fetchData();
      setNewProblem({ title: '', description: '', difficulty: 'Easy', sampleInput: '', sampleOutput: '' });
      alert("Problem deployed to production!");
    } catch (err) {
      alert("Authorization failed. Ensure you have an Admin Session token.");
    }
  };

  return (
    <div className="admin-layout">
      {/* Sidebar Navigation */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">CA</div>
          <h2>Admin Hub</h2>
        </div>
        <nav className="nav-menu">
          <a href="#dashboard" className="nav-item active">Analytics Dashboard</a>
          <a href="#problems" className="nav-item">Problem Management</a>
          <a href="#submissions" className="nav-item">Student Submissions</a>
        </nav>
      </aside>

      {/* Main Content Workspace */}
      <main className="main-content">
        <header className="topbar">
          <h1>System Overview</h1>
          <div className="profile-pill">Admin Privileges Active</div>
        </header>

        {loading ? (
          <div className="loading-state">Syncing secure data...</div>
        ) : (
          <div className="dashboard-grid">
            
            {/* Create Problem Tool */}
            <section className="dashboard-card create-section">
              <div className="card-header">
                <h3>Deploy New Challenge</h3>
              </div>
              <form onSubmit={handleCreateProblem} className="admin-form">
                <div className="form-group">
                  <label>Challenge Title</label>
                  <input type="text" placeholder="e.g. Reverse a Linked List" value={newProblem.title} onChange={e => setNewProblem({...newProblem, title: e.target.value})} required />
                </div>
                
                <div className="form-group">
                  <label>Difficulty Tier</label>
                  <select value={newProblem.difficulty} onChange={e => setNewProblem({...newProblem, difficulty: e.target.value})}>
                    <option value="Easy">Easy (Green)</option>
                    <option value="Medium">Medium (Yellow)</option>
                    <option value="Hard">Hard (Red)</option>
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>Detailed Description</label>
                  <textarea placeholder="Write the problem statement..." rows="3" value={newProblem.description} onChange={e => setNewProblem({...newProblem, description: e.target.value})} required />
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label>Expected Input Format</label>
                    <textarea placeholder="1\n2 3" rows="2" value={newProblem.sampleInput} onChange={e => setNewProblem({...newProblem, sampleInput: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label>Expected Output</label>
                    <textarea placeholder="3 2" rows="2" value={newProblem.sampleOutput} onChange={e => setNewProblem({...newProblem, sampleOutput: e.target.value})} required />
                  </div>
                </div>

                <button type="submit" className="primary-btn">Initialize Pipeline</button>
              </form>
            </section>

            {/* Data Tables */}
            <div className="data-columns">
              
              <section className="dashboard-card list-section">
                <div className="card-header">
                  <h3>Active Repository</h3>
                  <span className="count-badge">{problems.length}</span>
                </div>
                <div className="scroll-container">
                  <ul className="problem-list">
                    {problems.map(p => (
                      <li key={p._id} className="list-item">
                        <div className="item-details">
                          <strong>{p.title}</strong>
                          <span className="id-hash">ID: {p._id.slice(-6)}</span>
                        </div>
                        <span className={`diff-pill ${p.difficulty.toLowerCase()}`}>{p.difficulty}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              <section className="dashboard-card submissions-section">
                <div className="card-header">
                  <h3>Global Submissions</h3>
                  <span className="count-badge">{submissions.length}</span>
                </div>
                <div className="scroll-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Candidate</th>
                        <th>Target Problem</th>
                        <th>Resolution</th>
                      </tr>
                    </thead>
                    <tbody>
                      {submissions.map(s => (
                        <tr key={s._id}>
                          <td>
                            <div className="candidate-info">
                              <span className="name">{s.userId?.name}</span>
                              <span className="reg-num">{s.userId?.registerNumber}</span>
                            </div>
                          </td>
                          <td className="prob-title">{s.problemId?.title}</td>
                          <td>
                            <span className={`status-badge ${s.status === 'Accepted' ? 'success' : 'pending'}`}>
                              {s.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
