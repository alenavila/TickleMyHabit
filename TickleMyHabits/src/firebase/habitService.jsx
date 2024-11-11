import { db } from './firebase';
import { collection, addDoc, query, onSnapshot, updateDoc, doc } from 'firebase/firestore';

// Gewohnheit hinzufügen
export const addHabit = async (userId, habitName) => {
  try {
    const docRef = await addDoc(collection(db, `users/${userId}/habits`), {
      name: habitName,
      completed: false,
      createdAt: new Date(), // Speichere das Erstellungsdatum
    });
    console.log("Habit added with ID: ", docRef.id);
    return true; // Erfolgreich hinzugefügt
  } catch (e) {
    console.error("Error adding habit: ", e);
    return false; // Fehler beim Hinzufügen
  }
};

// Gewohnheiten abrufen
export const getHabits = (userId, callback) => {
  const q = query(collection(db, `users/${userId}/habits`));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const habits = [];
    querySnapshot.forEach((doc) => {
      habits.push({ id: doc.id, ...doc.data() });
    });
    callback(habits);
  });
  return unsubscribe; // Rückgabe der Unsubscribe-Funktion
};

// Gewohnheit abhaken
export const toggleHabit = async (userId, habitId, currentStatus) => {
  const habitRef = doc(db, `users/${userId}/habits/${habitId}`);
  await updateDoc(habitRef, { completed: !currentStatus });
};
