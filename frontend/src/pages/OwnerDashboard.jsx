import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios.js';

const OwnerDashboard = () => {
  const [pgs, setPgs] = useState([]);
  const [reviews, setReviews] = useState([]);

  const loadData = async () => {
    const [pgRes, reviewRes] = await Promise.all([api.get('/pgs/owner/my-listings'), api.get('/reviews/owner')]);
    setPgs(pgRes.data);
    setReviews(reviewRes.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deletePG = async (id) => {
    await api.delete(`/pgs/${id}`);
    loadData();
  };

  return (
    <section>
      <div className="card">
        <h2>PG Owner Dashboard</h2>
        <Link to="/owner/pg/new" className="link-btn">+ Add New PG</Link>
      </div>

      <h3>Your Listings</h3>
      <div className="grid cards-grid">
        {pgs.map((pg) => (
          <article key={pg._id} className="card">
            <h4>{pg.title}</h4>
            <p>{pg.location}</p>
            <p>₹{pg.rent}/month</p>
            <div className="row">
              <Link to={`/owner/pg/${pg._id}/edit`} className="link-btn">Edit</Link>
              <button type="button" onClick={() => deletePG(pg._id)} className="danger-btn">Delete</button>
            </div>
          </article>
        ))}
      </div>

      <h3>Reviews on Your PGs</h3>
      {reviews.map((review) => (
        <article key={review._id} className="card review">
          <strong>{review.pg?.title}</strong> — {review.rating}/5
          <p>{review.comment}</p>
          <small>by {review.student?.name}</small>
        </article>
      ))}
    </section>
  );
};

export default OwnerDashboard;
