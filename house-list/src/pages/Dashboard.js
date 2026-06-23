import { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import './Dashboard.css';

function Dashboard() {
  const { user, updateProfile, updatePassword } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    phone: user?.phone || '',
    avatar: user?.avatar || ''
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      updateProfile(profileData);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');
    try {
      updatePassword(passwordData.oldPassword, passwordData.newPassword);
      setPasswordData({ oldPassword: '', newPassword: '' });
      setSuccess('Password updated successfully!');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p className="welcome">Welcome back, {user?.username}!</p>

      {success && <div className="success-message">{success}</div>}
      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Profile Settings</h2>
          <form onSubmit={handleProfileUpdate} className="profile-form">
            <label>Username</label>
            <input
              type="text"
              value={profileData.username}
              onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
            />
            
            <label>Email</label>
            <input
              type="email"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            />
            
            <label>Phone</label>
            <input
              type="tel"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            />
            
            <label>Avatar URL</label>
            <input
              type="url"
              value={profileData.avatar}
              onChange={(e) => setProfileData({ ...profileData, avatar: e.target.value })}
              placeholder="https://..."
            />
            
            <button type="submit" className="btn-primary">Update Profile</button>
          </form>
        </div>

        <div className="dashboard-card">
          <h2>Change Password</h2>
          <form onSubmit={handlePasswordUpdate} className="password-form">
            <label>Current Password</label>
            <input
              type="password"
              value={passwordData.oldPassword}
              onChange={(e) => setPasswordData({ ...passwordData, oldPassword: e.target.value })}
              required
            />
            
            <label>New Password</label>
            <input
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
              required
            />
            
            <button type="submit" className="btn-primary">Update Password</button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
