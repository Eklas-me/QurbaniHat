import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function UpdateProfile() {
  const { user, updateUserProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Update Profile | QurbaniHat";
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURL = e.target.photo.value;

    setLoading(true);
    try {
      const res = await updateUserProfile(name, photoURL);
      if (res && res.data) {
        toast.success("Profile updated successfully!");
        navigate('/my-profile'); // Navigate back after success
      } else if (res && res.error) {
        toast.error(res.error.message || "Failed to update profile");
      }
    } catch (err) {
      toast.error(err.message || 'Failed to update profile');
    }
    setLoading(false);
  };

  if (!user) return null;

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div className="form-container" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '30px', color: 'var(--primary-color)' }}>
          Update Information
        </h2>
        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" id="name" defaultValue={user.name || ''} required />
          </div>
          <div className="form-group">
            <label htmlFor="photo">Image URL</label>
            <input type="url" id="photo" defaultValue={user.image || ''} required />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '10px' }} disabled={loading}>
            {loading ? 'Updating...' : 'Update Information'}
          </button>
          
          <button type="button" onClick={() => navigate('/my-profile')} className="btn btn-outline" style={{ width: '100%', marginTop: '10px' }}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}
