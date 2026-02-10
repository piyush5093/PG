import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/axios.js';
import { useAuth } from '../context/AuthContext.jsx';

const PGDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [pg, setPg] = useState(null);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });

  const loadPG = async () => {
    const { data } = await api.get(`/pgs/${id}`);
    setPg(data);
  };

  useEffect(() => {
    loadPG();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const submitReview = async (e) => {
    e.preventDefault();
    await api.post('/reviews', { pgId: id, ...reviewForm });
    setReviewForm({ rating: 5, comment: '' });
    loadPG();
  };

  if (!pg) return <p>Loading...</p>;

  return (
    <section className="card">
      <h2>{pg.title}</h2>
      <p>{pg.description}</p>
      <p>Location: {pg.location}</p>
      <p>Rent: ₹{pg.rent}/month</p>
      <p>Facilities: {pg.facilities.join(', ')}</p>
      <p>Owner: {pg.owner?.name} ({pg.owner?.email})</p>

      <h3>Reviews</h3>
      {pg.reviews?.map((review) => (
        <article key={review._id} className="review">
          <strong>{review.student?.name}</strong> - {review.rating}/5
          <p>{review.comment}</p>
        </article>
      ))}

      {user?.role === 'student' && (
        <form onSubmit={submitReview} className="form-grid">
          <h4>Leave a Review</h4>
          <select value={reviewForm.rating} onChange={(e) => setReviewForm({ ...reviewForm, rating: Number(e.target.value) })}>
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <textarea placeholder="Write review" value={reviewForm.comment} onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })} required />
          <button type="submit">Submit Review</button>
        </form>
      )}
    </section>
  );
};

export default PGDetailsPage;
