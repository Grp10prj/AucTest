import { createContext, useEffect, useState } from 'react';
import { authApp, firestoreApp } from '../config/firebase';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [globalMsg, setGlobalMsg] = useState('');

  const register = (email, password, role) => {
    return authApp.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Create a user profile document in Firestore with role attribute
        return firestoreApp.collection('users').doc(userCredential.user.uid).set({
          email: email,
          role: role
        });
      });
  };

  const login = (email, password) => {
    return authApp.signInWithEmailAndPassword(email, password);
  };

  const logout = () => {
    return authApp.signOut();
  };

  const bidAuction = (auctionId, price) => {
    if (!currentUser) {
      return setGlobalMsg('Please login first');
    }

    let newPrice = Math.floor((price / 100) * 110);
    const db = firestoreApp.collection('auctions');

    return db.doc(auctionId).update({
      curPrice: newPrice,
      curWinner: currentUser.email,
    });
  };

  const endAuction = (auctionId) => {
    const db = firestoreApp.collection('auctions');

    return db.doc(auctionId).delete();
  };

  useEffect(() => {
    const subscribe = authApp.onAuthStateChanged(async (user) => {
      if (user) {
        // Fetch user role from Firestore
        const userDoc = await firestoreApp.collection('users').doc(user.uid).get();
        const userData = userDoc.data();
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          role: userData.role // Assuming the role is stored in the 'role' field
        });
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });
  
    return subscribe;
  }, []);
  

  useEffect(() => {
    const interval = setTimeout(() => setGlobalMsg(''), 5000);
    return () => clearTimeout(interval);
  }, [globalMsg]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        register,
        login,
        logout,
        bidAuction,
        endAuction,
        globalMsg,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
