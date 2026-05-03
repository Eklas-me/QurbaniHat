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
      setUser(session?.user || null);
      setLoading(false);
    }
  }, [session, isPending]);

  // Register with Email and Password
  async function register(name, email, password, photoURL) {
    const res = await authClient.signUp.email({
      email,
      password,
      name,
      image: photoURL,
    }, {
      onSuccess: () => {
        toast.success("Registration successful!");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || "Failed to register");
      }
    });
    return res;
  }

  // Login with Email and Password
  async function login(email, password) {
    const res = await authClient.signIn.email({
      email,
      password
    }, {
      onSuccess: () => {
        toast.success("Login successful!");
      },
      onError: (ctx) => {
        toast.error(ctx.error.message || "Login failed");
      }
    });
    return res;
  }

  // Google Sign In
  async function loginWithGoogle() {
    return authClient.signIn.social({
        provider: "google",
        callbackURL: window.location.origin,
    });
  }

  // Logout
  async function logout() {
    await authClient.signOut();
    setUser(null);
  }

  // Update Profile (Name and Image)
  async function updateUserProfile(name, imageUrl) {
    const res = await authClient.updateUser({
      name: name,
      image: imageUrl
    });
    return res;
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
