import React, { useState } from "react";
import axios from "axios";

const PatientForm = () => {
  const initialFormState = { patientId: "", location: "", treatment: "", name: "", age: "", phoneNumber: "" };
  const [patients, setPatients] = useState([initialFormState]);

  // Add a new row for patient data
  const addRow = () => {
    setPatients([
      ...patients,
      { patientId: "", location: "", treatment: "", name: "", age: "", phoneNumber: "" },
    ]);
  };

  // Remove a row of patient data
  const removeRow = (index) => {
    const updatedPatients = patients.filter((_, i) => i !== index);
    setPatients(updatedPatients);
  };

  // Handle input changes
  const handleChange = (index, field, value) => {
    const updatedPatients = [...patients];
    updatedPatients[index][field] = value;
    setPatients(updatedPatients);
  };

  // Submit all rows to the backend and reset the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/patients", {
        patients,
      });
      alert(response.data.message);
      setPatients([initialFormState]); // Reset form to its initial state
    } catch (error) {
      console.error("Error saving patient data:", error);
      alert("There was an error saving the patient data.");
    }
  };

  return (
    <div>
      <h1>Patient Registration</h1>
      <form onSubmit={handleSubmit}>
        {patients.map((patient, index) => (
          <div key={index} style={{ marginBottom: "10px", display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Patient ID"
              value={patient.patientId}
              onChange={(e) => handleChange(index, "patientId", e.target.value)}
            />
            <input
              type="text"
              placeholder="Location"
              value={patient.location}
              onChange={(e) => handleChange(index, "location", e.target.value)}
            />
            <input
              type="text"
              placeholder="Treatment"
              value={patient.treatment}
              onChange={(e) => handleChange(index, "treatment", e.target.value)}
            />
            <input
              type="text"
              placeholder="Name"
              value={patient.name}
              onChange={(e) => handleChange(index, "name", e.target.value)}
            />
            <input
              type="number"
              placeholder="Age"
              value={patient.age}
              onChange={(e) => handleChange(index, "age", e.target.value)}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={patient.phoneNumber}
              onChange={(e) => handleChange(index, "phoneNumber", e.target.value)}
            />
            <button type="button" onClick={() => removeRow(index)} style={{ background: "red", color: "white" }}>
              Remove
            </button>
          </div>
        ))}
        <button type="button" onClick={addRow} style={{ background: "blue", color: "white", marginBottom: "10px" }}>
          Add Row
        </button>
        <button type="submit" style={{ background: "green", color: "white" }}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
