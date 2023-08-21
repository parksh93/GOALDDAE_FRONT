import React, { useState } from "react";
import axios from "axios";

const FieldReservation = () => {
  const [fieldReservation, setFieldReservation] = useState("");

  const createTable = async (fieldReservation) => {
    try {
      const encodedFieldReservation = encodeURIComponent(fieldReservation);
      const response = await axios.post("/api/field-reservation/create-table", null, {
        params: {
          fieldReservation: encodedFieldReservation,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFieldReservation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(fieldReservation);
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
        구장예약 테이블 생성:
          <input type="text" value={fieldReservation} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default FieldReservation;
