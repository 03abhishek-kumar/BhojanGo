import { createContext, useContext, useState, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";

// 1. Create context
const AuthContext = createContext();

// 2. Create provider
export function AuthProvider({ children }) {
  const [user,    setUser]    = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Register ──
  const register = async (name, email, password) => {
    // create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // update display name
    await updateProfile(userCredential.user, { displayName: name });

    // save user data to Firestore
    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid:       userCredential.user.uid,
      name:      name,
      email:     email,
      createdAt: new Date().toISOString(),
      orders:    [],
      addresses: [],
    });

    return userCredential;
  };

  // ── Login ──
  const login = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  // ── Logout ──
  const logout = async () => {
    return await signOut(auth);
  };

  // ── Get User Profile from Firestore ──
  const getUserProfile = async (uid) => {
    const docRef  = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  };

  // ── Listen to auth state changes ──
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      register,
      login,
      logout,
      getUserProfile,
    }}>
      {/* don't render children until auth state is known */}
      {!loading && children}
    </AuthContext.Provider>
  );
}

// 3. Custom hook
export function useAuth() {
  return useContext(AuthContext);
}