import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext/index';
import { addHabit, getHabits, toggleHabit } from '../../firebase/habitService';
import '../../styles/HabitManager.css'; 

const HabitManager = () => {
  // Authentifizierten Benutzer erhalten
  const { currentUser } = useAuth();
  
  // Zustand für neue Habits, bestehende Habits und die Eingabeanzeige
  const [habit, setHabit] = useState('');
  const [habits, setHabits] = useState([]);
  const [showInput, setShowInput] = useState(false); // Zustand für die Anzeige des Eingabefeldes

  // Funktion zum Hinzufügen eines neuen Habits
  const handleAddHabit = async () => {
    if (currentUser && habit) { // Überprüfen, ob Benutzer und Habit-Name existieren
      await addHabit(currentUser.uid, habit); // Habit hinzufügen
      setHabit(''); // Eingabefeld zurücksetzen
      setShowInput(false); // Eingabefeld nach dem Hinzufügen schließen
    }
  };

  // Holen der vorhandenen Habits beim Laden des Components
  useEffect(() => {
    if (currentUser) {
      const fetchHabits = (habits) => setHabits(habits);
      const unsubscribe = getHabits(currentUser.uid, fetchHabits); // Echtzeit-Listener für Habits
      return () => unsubscribe(); // Listener beim Schließen des Components entfernen
    }
  }, [currentUser]);

  // Funktion zum Umschalten des Habit-Status (abgeschlossen/offen)
  const handleToggleHabit = async (habitId, currentStatus) => {
    await toggleHabit(currentUser.uid, habitId, currentStatus);
  };

  // Umschalten der Anzeige für das Eingabefeld
  const toggleHabitInput = () => {
    setShowInput((prev) => !prev); // Eingabefeld anzeigen/ausblenden
  };

  // Filter für offene und abgeschlossene Habits
  const openHabits = habits.filter(h => !h.completed);
  const completedHabits = habits.filter(h => h.completed);

  return (
    <div>
      {currentUser ? ( // Prüfen, ob Benutzer eingeloggt ist
        <div>
          {/* Button zum Erstellen eines neuen Habits */}
          <button onClick={toggleHabitInput} className='fabHabit'>
            + Habit erstellen
          </button>

          {/* Eingabefeld und Button zum Hinzufügen eines neuen Habits */}
          {showInput && (
            <div>
              <input
                type="text"
                value={habit}
                onChange={(e) => setHabit(e.target.value)}
                placeholder="Neuen Habit hinzufügen"
                id='inputfield'
              />
              <button onClick={handleAddHabit} id='fabAdd'>+</button>
            </div>
          )}

          {/* Anzeige von offenen und abgeschlossenen Habits */}
          <div className="habit-columns">
            {/* Spalte für offene Habits */}
            <div className="habit-column">
              <p>Offene Habits</p>
              <ul>
                {openHabits.map(h => (
                  <li key={h.id} id='habit-check'>
                    <button onClick={() => handleToggleHabit(h.id, h.completed)} id='check'></button>
                    <span>{h.name}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Spalte für abgeschlossene Habits */}
            <div className="habit-column">
              <p>Abgeschlossene Habits</p>
              <ul>
                {completedHabits.map(h => (
                  <li key={h.id} id='habit-check'>
                    <button onClick={() => handleToggleHabit(h.id, h.completed)} id='check'>x</button>
                    <span style={{ textDecoration: 'line-through' }}>{h.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {/* Hinweis zur Anmeldung, wenn kein Benutzer eingeloggt ist */}
          <h2>Bitte melde dich an</h2>
        </div>
      )}
    </div>
  );
};

export default HabitManager;
