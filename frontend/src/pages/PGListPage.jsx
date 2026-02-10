import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';

const PGListPage = () => {
  const [pgs, setPgs] = useState([]);
  const [filters, setFilters] = useState({ location: '', maxRent: '', facility: '', search: '' });

  const fetchPGs = async () => {
    const { data } = await api.get('/pgs', { params: filters });
    setPgs(data);
  };

  useEffect(() => {
    fetchPGs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section>
      <div className="card">
        <h2>Find Verified PGs</h2>
        <div className="form-grid four-col">
          <input placeholder="Search title" onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
          <input placeholder="Location" onChange={(e) => setFilters({ ...filters, location: e.target.value })} />
          <input placeholder="Max budget" type="number" onChange={(e) => setFilters({ ...filters, maxRent: e.target.value })} />
          <select onChange={(e) => setFilters({ ...filters, facility: e.target.value })}>
            <option value="">All facilities</option>
            <option value="wifi">WiFi</option>
            <option value="food">Food</option>
            <option value="AC">AC</option>
            <option value="laundry">Laundry</option>
          </select>
          <button onClick={fetchPGs} type="button">Search</button>
        </div>
      </div>

      <div className="grid cards-grid">
        {pgs.map((pg) => (
          <article className="card" key={pg._id}>
            <h3>{pg.title}</h3>
            <p>{pg.location}</p>
            <p>₹{pg.rent}/month</p>
            <p>Facilities: {pg.facilities.join(', ') || 'N/A'}</p>
            <p>Rating: {pg.rating.toFixed(1)} ({pg.numReviews})</p>
            <Link to={`/pgs/${pg._id}`} className="link-btn">View Details</Link>
          </article>
        ))}
      </div>
    </section>
  );
};

export default PGListPage;
