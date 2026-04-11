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
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  // ── Register ──
  const register = async (name, email, password, role) => {
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
      role:      role,
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

  // ── Update User Profile in Firestore ──
  const updateUserProfile = async (uid, data) => {
    try {
      const docRef = doc(db, "users", uid);
      await setDoc(docRef, { ...data, updatedAt: new Date().toISOString() }, { merge: true });
      // Update local state as well
      setProfileData(prev => ({ ...prev, ...data }));
    } catch (err) {
      console.error("Error updating profile:", err);
      throw err;
    }
  };

  // ── Get User Profile from Firestore ──
  const getUserProfile = async (uid) => {
    const docRef  = doc(db, "users", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setProfileData(data);
      return data;
    }
    return null;
  };

  // ── Listen to auth state changes ──
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        await getUserProfile(currentUser.uid);
      } else {
        setProfileData(null);
      }
      setLoading(false);
    });

    // cleanup listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{
      user,
      profileData,
      loading,
      register,
      login,
      logout,
      getUserProfile,
      updateUserProfile,
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