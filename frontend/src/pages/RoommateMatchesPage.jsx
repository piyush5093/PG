import { useEffect, useState } from 'react';
import api from '../api/axios.js';

const RoommateMatchesPage = () => {
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      const { data } = await api.get('/roommates/matches');
      setMatches(data);
    };

    fetchMatches();
  }, []);

  const sendRequest = async (toStudent) => {
    await api.post('/roommates/requests', {
      toStudent,
      message: 'Hi, your roommate preferences look compatible. Let’s connect!'
    });
    alert('Roommate request sent.');
  };

  return (
    <section>
      <h2>Best Roommate Matches</h2>
      <div className="grid cards-grid">
        {matches.map((item) => (
          <article key={item.user._id} className="card">
            <h3>{item.user.name}</h3>
            <p>Compatibility: {item.score}/100</p>
            <p>Budget: ₹{item.user.profile?.budget || 'N/A'}</p>
            <p>Sleep: {item.user.profile?.sleepTime || 'N/A'}</p>
            <p>Study: {item.user.profile?.studyHabits || 'N/A'}</p>
            <button type="button" onClick={() => sendRequest(item.user._id)}>Send Request</button>
          </article>
        ))}
      </div>
    </section>
  );
};

export default RoommateMatchesPage;
