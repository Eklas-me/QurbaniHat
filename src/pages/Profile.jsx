import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Profile() {
  const { user, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "My Profile | QurbaniHat";
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
        setIsEditing(false);
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
    <div style={{ padding: '40px 0', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ color: 'var(--primary-color)', marginBottom: '30px', textAlign: 'center' }}>My Profile</h1>
      
      <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: 'var(--border-radius)', boxShadow: 'var(--box-shadow)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        
        <img 
          src={user.image || 'https://via.placeholder.com/150'} 
          alt={user.name || 'User'} 
          style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--primary-color)', marginBottom: '20px' }} 
        />
        
        {!isEditing ? (
          <div style={{ textAlign: 'center', width: '100%' }}>
            <h2 style={{ marginBottom: '10px' }}>{user.name || 'No Name Provided'}</h2>
            <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '30px' }}>{user.email}</p>
            
            <button onClick={() => setIsEditing(true)} className="btn btn-primary" style={{ minWidth: '200px' }}>
              Update Information
            </button>
          </div>
        ) : (
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '20px', textAlign: 'center' }}>Update Information</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input type="text" id="name" defaultValue={user.name || ''} required />
              </div>
              <div className="form-group">
                <label htmlFor="photo">Image URL</label>
                <input type="url" id="photo" defaultValue={user.image || ''} required />
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <button type="submit" className="btn btn-primary" style={{ flex: '1' }} disabled={loading}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button type="button" onClick={() => setIsEditing(false)} className="btn btn-outline" style={{ flex: '1' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
        
      </div>
    </div>
  );
}
