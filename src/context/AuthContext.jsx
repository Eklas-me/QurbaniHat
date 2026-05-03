import { createContext, useContext, useEffect, useState } from "react";
import { authClient } from "../lib/authClient";
import toast from "react-hot-toast";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { data: session, isPending, error } = authClient.useSession();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isPending) {
      setLoading(true);
    } else {
      const newUser = session?.user || null;
      // If user just logged in (from null to user)
      if (!user && newUser) {
        // Only show toast if it's not the initial load of a persistent session
        // This is a simple way to show toast after social login redirect
        const hasShownToast = sessionStorage.getItem('login_toast_shown');
        if (!hasShownToast) {
          toast.success(`Welcome back, ${newUser.name}!`);
          sessionStorage.setItem('login_toast_shown', 'true');
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
    // Clear toast flag before redirecting to ensure it shows when coming back
    sessionStorage.removeItem('login_toast_shown');
    return authClient.signIn.social({
        provider: "google",
        callbackURL: window.location.origin,
    });
  }

  // Logout
  async function logout() {
    await authClient.signOut();
    setUser(null);
    sessionStorage.removeItem('login_toast_shown');
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
