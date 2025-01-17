const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock user data for login (replace with database validation later)
const users = [
  { username: "admin", password: "1234" },
];

// Login Route
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);

  if (user) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Route to save patient data
app.post('/api/patients', async (req, res) => {
  const { patientId, location, treatment, name, age, phoneNumber } = req.body;

  try {
    const [result] = await db.execute(
      'INSERT INTO patients (patientId, location, treatment, name, age, phoneNumber) VALUES (?, ?, ?, ?, ?, ?)', 
      [patientId, location, treatment, name, age, phoneNumber]
    );
    res.status(201).json({ message: 'Patient data saved successfully!', id: result.insertId });
  } catch (error) {
    console.error('Error inserting patient data:', error.message); // More detailed error logging
    res.status(500).json({ error: 'Error saving patient data.' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
