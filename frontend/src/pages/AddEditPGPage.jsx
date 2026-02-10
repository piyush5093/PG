import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios.js';

const AddEditPGPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    images: '',
    rent: '',
    location: '',
    facilities: '',
    description: ''
  });

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      const { data } = await api.get(`/pgs/${id}`);
      setForm({
        title: data.title,
        images: data.images?.join(',') || '',
        rent: data.rent,
        location: data.location,
        facilities: data.facilities?.join(',') || '',
        description: data.description
      });
    };
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      rent: Number(form.rent),
      images: form.images.split(',').map((x) => x.trim()).filter(Boolean),
      facilities: form.facilities.split(',').map((x) => x.trim()).filter(Boolean)
    };

    if (id) await api.put(`/pgs/${id}`, payload);
    else await api.post('/pgs', payload);

    navigate('/owner');
  };

  return (
    <section className="card">
      <h2>{id ? 'Edit PG Listing' : 'Add PG Listing'}</h2>
      <form onSubmit={submit} className="form-grid">
        <input placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input placeholder="Image URLs (comma-separated)" value={form.images} onChange={(e) => setForm({ ...form, images: e.target.value })} />
        <input placeholder="Rent" type="number" value={form.rent} onChange={(e) => setForm({ ...form, rent: e.target.value })} required />
        <input placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} required />
        <input placeholder="Facilities (wifi, food, AC, laundry)" value={form.facilities} onChange={(e) => setForm({ ...form, facilities: e.target.value })} />
        <textarea placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required />
        <button type="submit">{id ? 'Update PG' : 'Create PG'}</button>
      </form>
    </section>
  );
};

export default AddEditPGPage;
