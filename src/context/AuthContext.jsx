import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "../lib/authClient";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { data: session, isPending } = authClient.useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) {
      setLoading(true);
    } else {
      const newUser = session?.user || null;
      
      // Handle social login success toast
      if (newUser && !user) {
        const needsToast = sessionStorage.getItem('show_welcome_toast');
        if (needsToast === 'true') {
          toast.success(`Welcome back, ${newUser.name}!`);
          sessionStorage.removeItem('show_welcome_toast');
        }
      }
      
      setUser(newUser);
      setLoading(false);
    }
  }, [session, isPending, user]);

  // Register with Email and Password
  async function register(name, email, password, photoURL) {
    return await authClient.signUp.email({
      email,
      password,
      name,
      image: photoURL,
    });
  }

  // Login with Email and Password
  async function login(email, password) {
    return await authClient.signIn.email({
      email,
      password
    });
  }

  // Google Sign In
  async function loginWithGoogle() {
    // Set flag to show toast after redirect back
    sessionStorage.setItem('show_welcome_toast', 'true');
    return authClient.signIn.social({
        provider: "google",
        callbackURL: window.location.origin,
    });
  }

  // Logout
  async function logout() {
    // Clear all flags before signing out
    sessionStorage.removeItem('show_welcome_toast');
    await authClient.signOut();
    setUser(null);
    toast.success("Logged out successfully");
  }

  // Update Profile (Name and Image)
  async function updateUserProfile(name, imageUrl) {
    return await authClient.updateUser({
      name: name,
      image: imageUrl
    });
  }

  const value = {
    user,
    loading,
    register,
    login,
    loginWithGoogle,
    logout,
    updateUserProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
