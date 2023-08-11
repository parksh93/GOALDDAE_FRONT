import React from "react";
import { Radio, RadioGroup } from "@mui/material";

const GenderRadio = ({styles, setGender}) => {
    const onChange = e => {
        setGender(e.target.value);
    }

    return (
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          className={styles.genderRadioCotain}
          color="success"
        >
          <Radio value="남성" className={styles.genderRadio} color="success" id="male" onChange={onChange}/> 
          <label className={styles.genderText} htmlFor="male">남성</label>
          <Radio value="여성" className={styles.genderRadio} color="success" id="female" onChange={onChange}/> 
          <label className={styles.genderText} htmlFor="female">여성</label>
        </RadioGroup>
    )
}

export default React.memo(GenderRadio);