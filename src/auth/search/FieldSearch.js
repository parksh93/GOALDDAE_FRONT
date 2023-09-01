import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { debounce } from 'lodash';
import axios from 'axios';
import './FieldSearch.css';
import {AiOutlineSearch} from 'react-icons/ai'

const FieldSearch = () => {
  const [inputValue, setInputValue] = useState('지역, 구장 찾기');
  const [isHaveInputValue, setIsHaveInputValue] = useState(false);
  const [dropDownList, setDropDownList] = useState([]);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);
  const [completedCityName, setCompletedCityName] = useState('');
  const [dropDownCache, setDropDownCache] = useState({});

  const wholeBoxRef = useRef(null);
  const navigate = useNavigate();

  /*검색창 클릭 시 '지역, 구장 이름으로 찾기'를 지워서 검색어를 입력할 수 있게 함*/
 const handleInputFocus = () => {
  if (inputValue === '지역, 구장 찾기') {
    setInputValue('');
    }
 };

  /*검색어가 비어있는 상태에서 검색창 밖을 클릭하면 '지역, 구장 이름으로 찾기' 표시 */
  const handleInputBlur = () => {
     if (inputValue.trim() === '') {
      setInputValue('지역, 구장 찾기');
    }
  };

  /* axios를 이용해 검색어와 일치하거나 검색어가 포함된 구장 정보를 받아 검색결과로 나옴 */
  /* 캐시 작업 */
  const showDropDownList = useCallback(
    debounce(async () => {
      if (inputValue === '') {
        setIsHaveInputValue(false);
        setDropDownList([]);
      } else {
        if (dropDownCache[inputValue]) {
          setDropDownList(dropDownCache[inputValue]);
        } else {
          try {
            const response = await axios.get('/field/search', {
              params: { searchTerm: inputValue },
            });

            setDropDownList(response.data);
            setDropDownCache((prevState) => ({
              ...prevState,
              [inputValue]: response.data,
            }));
          } catch (error) {
            console.error('서버 응답에 실패했습니다:', error);
          }
        }
      }
    }, 200),
    [inputValue, setIsHaveInputValue, setDropDownList, dropDownCache]
  );

  /*  검색창에 입력 중인 검색어를 기반으로, axios를 이용해 /search/city API에 
      GET 요청을 보내어 검색어가 포함된 도시 이름을 받아 도시 이름이 없으면 빈 string을 반환*/
  const fetchCityName = async (partialCityName) => {
    try {
      const response = await axios.get('/field/search/city', {
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

   /* 검색창에 입력이 되면, 검색어 상태를 업데이트하고, fetchCityName 함수를 호출해 
      검색어에서 포함된 도시 이름을 추출하여 completedCityName 상태를 업데이트 */
  const changeInputValue = async (event) => {
    setInputValue(event.target.value);
    setIsHaveInputValue(true);
    const completedName = await fetchCityName(event.target.value);
    setCompletedCityName(completedName);
  };

  /* Dropdown list의 각 요소를 클릭하면, 클릭한 요소에 대응하는 필드 ID를 이용해 /Match?fieldId=${fieldId} 이동*/
  const clickDropDownItem = (clickedItem, fieldId) => {
    // setInputValue('지역, 구장 찾기');
    setIsHaveInputValue(false);
    navigate(`/Match?fieldId=${fieldId}`);
  };

  /* 검색창에서 엔터키, 방향키 사용하게끔 */
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
          clickDropDownItem(
            dropDownList[dropDownItemIndex].fieldName,
            dropDownList[dropDownItemIndex].fieldId
          );
        }
        setDropDownItemIndex(-1);
      }
    }
  };

  /*  검색창 입력값에 대해 debounce를 적용하여 API 요청을 수정적으로 보내 서버 과부하 방지*/
  useEffect(() => {
    showDropDownList();
  }, [inputValue, showDropDownList]);

  /* handleClickOutside : 모달 밖을 클릭할 경우 dropdownList가 닫힘*/
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        wholeBoxRef &&
        wholeBoxRef.current &&
        !wholeBoxRef.current.contains(event.target)
      ) {
        setIsHaveInputValue(false);
      }
    };
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, []);

return (
    <div className="WholeBox" ref={wholeBoxRef}>
      <div
        className={`InputBox ${
          isHaveInputValue
            ? 'TextInput-activeBorderRadius'
            : 'TextInput-inactiveBorderRadius'
        }`}
      >
        <AiOutlineSearch className='searchIcon'/>
          <input
            className="Input"
            type="text"
            value={inputValue}
            onChange={changeInputValue}
            onKeyUp={handleDropDownKey}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            // placeholder='지역, 구장 찾기'
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
                  <i
                    className="fas fa-search"
                    style={{ marginRight: '5px' }}
                  ></i>
                  <span className="EmphasizedText">{completedCityName}시</span>
                  의 매치 모두 보기
                </li>
              )}
              {dropDownList.map((dropDownItem, dropDownIndex) => {
                return (
                  <li
                    key={dropDownIndex}
                    onClick={() =>
                      clickDropDownItem(
                        dropDownItem.fieldName,
                        dropDownItem.fieldId
                      )
                    }
                    onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                    className={`DropDownItem ${
                      dropDownItemIndex === dropDownIndex ? 'selected' : ''
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
  );
};

export default FieldSearch;
