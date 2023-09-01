import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Select } from '@material-ui/core';

const ProvinceFilter = () => {
  const [provinces, setProvinces] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState('서울');
  const [fields, setFields] = useState([]);

  useEffect(() => {
    axios.get('/field/provinces')
      .then(response => {
        setProvinces(response.data);
      })
      .catch(error => console.error(error));
  }, []);  

  useEffect(() => {
    axios.get(`/field/search/province?province=${selectedProvince}`)
      .then(response => {
        setFields(response.data);
      })
      .catch(error => console.error(error));
  }, [selectedProvince]);

  return (
    <div>
      <Select value={selectedProvince} onChange={(e) => setSelectedProvince(e.target.value)}>
        {provinces.map((province) =>
          <option key={province} value={province}>{province}</option>
        )}
      </Select>
  
      <ul>
        {fields.map((field) =>
          <li key={field.id}>{field.name}</li>
        )}
      </ul>
    </div>  
  )
}

export default ProvinceFilter;
