import React, { useState } from "react";
import axios from "axios";

const FieldReservation = () => {
  const [fieldReservationName, setFieldReservationName] = useState("");

  const createTable = async (fieldReservationName) => {
    try {
      const encodedFieldReservationName = encodeURIComponent(fieldReservationName);
      const response = await axios.post("/api/field-reservation/create-table", null, {
        params: {
          fieldReservation: encodedFieldReservationName,
        }
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFieldReservationName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createTable(fieldReservationName);
  };
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
        구장예약 테이블 생성
          <input type="text" value={fieldReservationName} onChange={handleChange} />
        </label>
        <button type="submit">생성</button>
      </form>
    </div>
  );
};

export default FieldReservation;
