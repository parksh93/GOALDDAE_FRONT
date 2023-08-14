import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './FieldSearch.css';
import { useNavigate } from 'react-router-dom';

const FieldSearch = () => {
  const [inputValue, setInputValue] = useState('지역, 구장 이름으로 찾기');
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  const [dropDownList, setDropDownList] = useState([]);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);
  const [completedCityName, setCompletedCityName] = useState(''); 

  const navigate = useNavigate();

  const handleInputFocus = () => {
    if (inputValue === '지역, 구장 이름으로 찾기') {
      setInputValue('');
    }
  };

  const handleInputBlur = () => {
    if (inputValue.trim() === '') {
      setInputValue('지역, 구장 이름으로 찾기');
    }
  };

  const showDropDownList = async () => {
    if (inputValue === '') {
      setIsHaveInputValue(false);
      setDropDownList([]);
    } else {
      try {
        const response = await axios.get('/search/soccerField', {
          params: { searchTerm: inputValue },
        });

        if (response.status === 200) {
          setDropDownList(response.data);
        } else {
          console.error('서버로부터 데이터를 가져오는데 실패했습니다.');
        }
      } catch (error) {
        console.error('서버 요청 중 에러가 발생했습니다.', error);
      }
    }
  };

  const fetchCityName = async (partialCityName) => { 
    try {
      const response = await axios.get('/search/city', {
        params: { searchTerm: partialCityName },
      });  

      if (response.status === 200) {
        return response.data[0] || ''; 
      } else {
        console.error('서버로부터 데이터를 가져오는데 실패했습니다.');
      }
    } catch (error) {
      console.error('서버 요청 중 에러가 발생했습니다.', error);
    }
    return ''; 
  };

  const changeInputValue = async (event) => { 
    setInputValue(event.target.value);
    setIsHaveInputValue(true);
    const completedName = await fetchCityName(event.target.value); 
    setCompletedCityName(completedName); 
  };

  const clickDropDownItem = (clickedItem, fieldId) => {
    setInputValue(clickedItem);
    setIsHaveInputValue(false);
    navigate(`/Match?fieldId=${fieldId}`);
  };

  const handleDropDownKey = (event) => {
    if (isHaveInputValue) {
      if (
        event.key === 'ArrowDown' &&
        dropDownList.length - 1 > dropDownItemIndex
      ) {
        setDropDownItemIndex(dropDownItemIndex + 1);
      }

      if (event.key === 'ArrowUp' && dropDownItemIndex >= 0) {
        setDropDownItemIndex(dropDownItemIndex - 1);
      }

      if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        if (dropDownItemIndex === -1) {
          console.log(`${inputValue}시의 매치 모두 보기가 선택되었습니다.`);
        } else {
          clickDropDownItem(dropDownList[dropDownItemIndex].fieldName);
        }
        setDropDownItemIndex(-1);
      }
    }
  };

  useEffect(() => {
    showDropDownList();
  }, [inputValue]);

  return (
    <div className="WholeBox">
      <div
        className={`InputBox ${
          isHaveInputValue
            ? 'TextInput-activeBorderRadius'
            : 'TextInput-inactiveBorderRadius'
        }`}
      >
        <input
          className="Input"
          type="text"
          value={inputValue}
          onChange={changeInputValue}
          onKeyUp={handleDropDownKey}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
        <div className="DeleteButton" onClick={() => setInputValue('')}>
          &times;
        </div>
      </div>
      {isHaveInputValue && (
        <ul className="DropDownBox">
          {dropDownList.length === 0 ? (
            <li className="NoResult">해당하는 구장 정보가 없습니다.</li>
          ) : (
            <>
              {completedCityName.length !== 0 && (
              <li className="ViewAllMatches">
                {`${completedCityName}시의 매치 모두 보기`}
              </li>
            )}
              {dropDownList.map((dropDownItem, dropDownIndex) => {
                return (
                  <li
                  key={dropDownIndex}
                  onClick={() => clickDropDownItem(dropDownItem.fieldName, dropDownItem.fieldId)}
                  onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                  className={
                    dropDownItemIndex === dropDownIndex ? 'selected' : ''
                  }
                >
                  {dropDownItem.fieldName}
                </li>
                );
              })}
            </>
          )}
        </ul>
      )}
    </div>
  );
};

export default FieldSearch;
