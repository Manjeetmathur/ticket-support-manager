import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import {
       onAuthStateChanged,
       signInWithEmailAndPassword,
       signOut,
       createUserWithEmailAndPassword
} from "firebase/auth";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { userDetails } from "../../Store/AuthSlice/Authslice";

export const AuthContext = createContext();
// console.log(auth)
export function AuthProvider({ children }) {
       const [user, setUser] = useState(null);
       const [userData, setUserData] = useState(null);
       const dispatch = useDispatch()

       useEffect(() => {
              const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
                     setUser(currentUser);

              });
              return unsubscribe;
       }, []);
       async function getUser(uid) {
              try {
                     const userDoc = await getDoc(doc(db, "users", uid));
                     if (userDoc.exists()) {
                            return userDoc.data();
                     }
                     return null;
              } catch (error) {
                     console.error("Error fetching user data:", error);
                     return null;
              }
       }
       async function register(email, password, role) {
              try {

                     const user = await createUserWithEmailAndPassword(auth, email, password);

                     const newUser = user.user;

                     await setDoc(doc(db, "users", newUser.uid), {
                            uid: newUser.uid,
                            email: email,
                            role: role,
                     })

                     return newUser;

              } catch (error) {
                     console.log(error)
              }
       }

       async function login(email, password) {
              try {
                     const currentUser = await signInWithEmailAndPassword(auth, email, password);
                     console.log(currentUser)
                     if (currentUser) {
                            const userdetails = await getUser(currentUser?.user?.uid);
                            dispatch(userDetails(userdetails))
                     } else {
                            setUserData(null);
                     }
              } catch (error) {
                     console.log(error)
              }
       }

       function logout() {
              return signOut(auth);
       }



       return (
              <AuthContext.Provider value={{ user, login, logout, register, userData }}>
                     {children}
              </AuthContext.Provider>
       );
}
