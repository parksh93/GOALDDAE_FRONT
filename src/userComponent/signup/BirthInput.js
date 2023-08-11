import * as React from 'react';
import { useCallback } from 'react';

export default function BirthInput({styles, birth, setBirth}) {
  const onChange = useCallback(e => {
    setBirth(e.target.value);
  })
  
    return (
    <input type='date'
    data-placeholder="생년월일을 입력하세요" 
    required
    aria-required="true"
    className={styles.birth} 
    value={birth}
    onChange={onChange}
    />
  );
}
