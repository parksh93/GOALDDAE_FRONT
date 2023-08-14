import React, { useEffect, useState, useRef } from 'react'; import axios from 'axios';
import './FieldSearch.css';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';

const FieldSearch = () => {
  const [inputValue, setInputValue] = useState('지역, 구장 이름으로 찾기');
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  const [dropDownList, setDropDownList] = useState([]);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);
  const [completedCityName, setCompletedCityName] = useState(''); 
  const [dropDownCache, setDropDownCache] = useState({});

  const wholeBoxRef = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = (event) => {
    if (wholeBoxRef && wholeBoxRef.current && !wholeBoxRef.current.contains(event.target)) {
      setIsHaveInputValue(false);
    }
  };

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

  const showDropDownList = debounce(async () => {
    if (inputValue === "") {
      setIsHaveInputValue(false);
      setDropDownList([]);
    } else {
      // 캐시에 값이 있는 경우, 캐시에서 값을 가져옵니다.
      if (dropDownCache[inputValue]) {
        setDropDownList(dropDownCache[inputValue]);
      } else {
        // 캐시에 값이 없을 경우만 서버에 요청을 합니다.
        try {
          const response = await axios.get("/search/soccerField", {
            params: { searchTerm: inputValue },
          });

          if (response.status === 200) {
            setDropDownList(response.data);

            // 서버 요청 후 응답을 받으면, 결과를 캐시에 저장하여 다음 검색 시 재사용할 수 있도록 합니다.
            setDropDownCache({ ...dropDownCache, [inputValue]: response.data });
          } else {
            console.error("서버로부터 데이터를 가져오는데 실패했습니다.");
          }
        } catch (error) {
          console.error("서버 요청 중 에러가 발생했습니다.", error);
        }
      }
    }
  }, 500);

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
    setInputValue('지역, 구장 이름으로 찾기'); 
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
          clickDropDownItem(dropDownList[dropDownItemIndex].fieldName, dropDownList[dropDownItemIndex].fieldId);
        }
        setDropDownItemIndex(-1);
      }
    }
  };

  useEffect(() => {
    showDropDownList();
  }, [inputValue]);

useEffect(() => {
  document.addEventListener('click', handleClickOutside, true);
  return () => {
    document.removeEventListener('click', handleClickOutside, true);
  };
}, []);

useEffect(() => {
  if (isHaveInputValue) {
    axios
      .get("/search/soccerField", {
        params: {
          searchWord: inputValue,
        },
      })
      .then((response) => {
        console.log("response.data:", response.data);
        setDropDownList(response.data);
      });
  }
}, [isHaveInputValue, inputValue]);

  return (
    <div className="WholeBox" ref={wholeBoxRef}> 
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
                <i className="fas fa-search" style={{ marginRight: '5px' }}></i>
                <span className="EmphasizedText">{completedCityName}시</span>의 매치 모두 보기
              </li>
            )}
              {dropDownList.map((dropDownItem, dropDownIndex) => {
                return (
                  <li
                    key={dropDownIndex}
                    onClick={() =>
                      clickDropDownItem(dropDownItem.fieldName, dropDownItem.fieldId)
                    }
                    onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                    className={`DropDownItem ${
                      dropDownItemIndex === dropDownIndex ? "selected" : ""
                    }`}
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
    </div>
  );
};

export default FieldSearch;
