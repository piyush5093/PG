import { useEffect, useState } from 'react';
import api from '../api/axios.js';

const StudentDashboard = () => {
  const [profile, setProfile] = useState({
    age: '',
    gender: '',
    budget: '',
    sleepTime: 'early',
    studyHabits: '',
    smoking: false,
    drinking: false,
    cleanlinessLevel: 3,
    preferredLocation: ''
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      const { data } = await api.get('/students/profile');
      if (data.profile) setProfile({ ...profile, ...data.profile });
    };
    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const saveProfile = async (e) => {
    e.preventDefault();
    await api.put('/students/profile', profile);
    setMessage('Profile saved successfully');
  };

  return (
    <section className="card">
      <h2>Student Dashboard</h2>
      <form onSubmit={saveProfile} className="form-grid two-col">
        <input placeholder="Age" type="number" value={profile.age || ''} onChange={(e) => setProfile({ ...profile, age: Number(e.target.value) })} />
        <input placeholder="Gender" value={profile.gender || ''} onChange={(e) => setProfile({ ...profile, gender: e.target.value })} />
        <input placeholder="Budget" type="number" value={profile.budget || ''} onChange={(e) => setProfile({ ...profile, budget: Number(e.target.value) })} />
        <input placeholder="Preferred location" value={profile.preferredLocation || ''} onChange={(e) => setProfile({ ...profile, preferredLocation: e.target.value })} />
        <select value={profile.sleepTime || 'early'} onChange={(e) => setProfile({ ...profile, sleepTime: e.target.value })}>
          <option value="early">Early sleeper</option>
          <option value="late">Late sleeper</option>
        </select>
        <input placeholder="Study habits" value={profile.studyHabits || ''} onChange={(e) => setProfile({ ...profile, studyHabits: e.target.value })} />
        <label>
          Cleanliness Level: {profile.cleanlinessLevel}
          <input type="range" min="1" max="5" value={profile.cleanlinessLevel || 3} onChange={(e) => setProfile({ ...profile, cleanlinessLevel: Number(e.target.value) })} />
        </label>
        <label>
          <input type="checkbox" checked={!!profile.smoking} onChange={(e) => setProfile({ ...profile, smoking: e.target.checked })} /> Smoking
        </label>
        <label>
          <input type="checkbox" checked={!!profile.drinking} onChange={(e) => setProfile({ ...profile, drinking: e.target.checked })} /> Drinking
        </label>
        <button type="submit">Save Profile</button>
      </form>
      {message && <p className="success">{message}</p>}
    </section>
  );
};

export default StudentDashboard;
