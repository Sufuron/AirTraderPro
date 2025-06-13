import { collection, doc, getDoc, getDocs, query, orderBy } from 'firebase/firestore';
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
  try {
    const postsQuery = query(collection(db, 'blogPosts'), orderBy('date', 'desc'));
    const querySnapshot = await getDocs(postsQuery);
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw error;
  }
};

export const getBlogPost = async (id) => {
  try {
    const postRef = doc(db, 'blogPosts', id);
    const docSnap = await getDoc(postRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
      };
    } else {
      console.log('No such blog post found with ID:', id);
      return null;
    }
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};
