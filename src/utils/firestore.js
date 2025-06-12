import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const getPlanes = async () => {
  const snapshot = await getDocs(collection(db, 'planes'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getPlane = async (id) => {
  const docRef = doc(db, 'planes', id);
  const snap = await getDoc(docRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};

export const getBlogPosts = async () => {
  const snapshot = await getDocs(collection(db, 'blogPosts'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getBlogPost = async (id) => {
  const docRef = doc(db, 'blogPosts', id);
  const snap = await getDoc(docRef);
  return snap.exists() ? { id: snap.id, ...snap.data() } : null;
};
