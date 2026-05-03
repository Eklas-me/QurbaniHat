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
        navigate('/my-profile');
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
    <div style={{ padding: '100px 20px 60px' }}> {/* Increased padding to fix overlap */}
      <div className="container animate__animated animate__fadeIn" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div style={{ backgroundColor: 'white', padding: '50px 40px', borderRadius: '32px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0' }}>
          <h2 style={{ textAlign: 'center', marginBottom: '40px', color: 'var(--primary-color)', fontWeight: '800', fontSize: '2.2rem' }}>
            Update Information
          </h2>
          <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="name" style={{ fontWeight: '700', fontSize: '0.9rem', marginBottom: '10px', display: 'block' }}>Name</label>
              <input 
                type="text" 
                id="name" 
                defaultValue={user.name || ''} 
                required 
                style={{ padding: '15px', borderRadius: '15px', border: '1px solid #eee', fontSize: '1rem', width: '100%' }}
              />
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label htmlFor="photo">Image URL</label>
              <input 
                type="url" 
                id="photo" 
                defaultValue={user.image || ''} 
                required 
                style={{ padding: '15px', borderRadius: '15px', border: '1px solid #eee', fontSize: '1rem', width: '100%' }}
              />
            </div>
            
            <div style={{ display: 'flex', gap: '15px', marginTop: '10px' }}>
              <button type="submit" className="btn btn-primary" style={{ flex: 1, padding: '16px', borderRadius: '15px', fontSize: '1.1rem' }} disabled={loading}>
                {loading ? 'Updating...' : 'Update'}
              </button>
              <button type="button" onClick={() => navigate('/my-profile')} className="btn btn-outline" style={{ flex: 1, padding: '16px', borderRadius: '15px' }}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
