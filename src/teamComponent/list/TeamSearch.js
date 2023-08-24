import axios from "axios";
import React, {useEffect, useRef, useState, useCallback } from "react";
import styles from './List.module.css';
import { useNavigate } from "react-router-dom";
import { debounce } from "@mui/material";

const TeamSearch = () => {
    const [inputValue, setInputValue] = useState('팀 이름 검색')
    const [isHaveInputValue, setIsHaveInputValue] = useState(false);
    const [dropDownList, setDropDownList] = useState([]);
    const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);
    const [completedTeamName, setCompletedTeamName] = useState('');
    const [dropDownCache, setDropDownCache] = useState({});  

    const wholeBoxRef = useRef(null);
    const navigate = useNavigate();

    /* 검색창 클릭 시 '팀 이름 검색'를 지움*/
    const handleInputFocus = () => {
        if (inputValue === '팀 이름 검색') {
            setInputValue('');
        }
    };

    /* 검색창이 비어져있을 때 검색창 밖 클릭하면 '팀 이름 검색' 표시  */
    const handleInputBlur = () => {
        if (inputValue.trim() === '' && isHaveInputValue) {
          setInputValue('팀 이름 검색');
        }
      };

      const showDropDownList = useCallback(
        debounce(async (inputValue = '') => {
            const trimmedInputValue = inputValue.replace(/\s+/g, '').toLowerCase();
            if (inputValue === '') {
                setIsHaveInputValue(false);
                setDropDownList([]);
            } else {
                let cachedResults = dropDownCache[trimmedInputValue];
                if (cachedResults) {
                    setDropDownList(cachedResults);
                } else {
                    try {
                        const searchTerms = trimmedInputValue.split(" ");
                        const response = await axios.get('/team/search/teamName', {
                            params: { searchTerm: trimmedInputValue }
                        });
                        setDropDownList(response.data);
                        setDropDownCache((prevState) => ({
                            ...prevState,
                            [trimmedInputValue]: response.data,
                        }));
                    } catch (error) {
                        console.error('서버 요청 중 에러가 발생했습니다.', error);
                    }
                }
            }
        }, 300),
        []
    );

    const handleAutocompleteChange = (event) => {
        const newValue = event.target.value;
        setInputValue(newValue);
        setIsHaveInputValue(true);
        showDropDownList(newValue);
    }

    const fetchTeamName = async (partialTeamName) => {
        try{
            const response = await axios.get('/team/search/teamName',{
                params : {searchTerm : partialTeamName },
            });

            if (response.status === 200 ) {
                return response.data[0] || '';
            }else {
                console.error('서버 응답이 올바르지 않습니다.', response);
            }
        } catch(error) {
            console.error('서버 요청 중 에러가 발생했습니다.', error)
        }
        return '';
    };  

    const changeInputValue = async(event) => {
        setInputValue(event.target.value);
        setIsHaveInputValue(true);
        const completedName = await fetchTeamName(event.target.value);
        setCompletedTeamName(completedName);
    };

    const clickDropDownItem = (clickedItem, teamId) => {
        setInputValue(clickedItem)
        setIsHaveInputValue(false)
        navigate(`/team/detail/${teamId}`);
    }

    const handleDropDownKey = event => {
        //input에 값이 있을때만 작동
        if (isHaveInputValue) {
          if (
            event.key === 'ArrowDown' &&
            dropDownList.length - 1 > dropDownItemIndex
          ) {
            setDropDownItemIndex(dropDownItemIndex + 1)
          }
    
          if (event.key === 'ArrowUp' && dropDownItemIndex >= 0)
            setDropDownItemIndex(dropDownItemIndex - 1)
          if (event.key === 'Enter' && dropDownItemIndex >= 0) {
            clickDropDownItem(dropDownList[dropDownItemIndex])
            setDropDownItemIndex(-1)
          }
        }
    }
    
    useEffect(() => {
        showDropDownList(inputValue)
    }, [inputValue])

    /* 모달 밖을 클릭할 경우 dropdownList가 닫힘*/
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
    <div className={styles.WholeBox} ref={wholeBoxRef}>
        <div className={`InputBox ${styles.InputBox}`} isHaveInputValue={isHaveInputValue}>
        <input
            className={styles.Input}
            type='text'
            value={inputValue}
            onChange={changeInputValue}
            onKeyUp={handleDropDownKey}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
        />
        <div className={styles.DeleteButton} onClick={() => setInputValue('')}>
            &times;
        </div>
        </div>
        {isHaveInputValue && (
        <div className={styles.DropDownBox}>
            {dropDownList.length === 0 && (
            <li className={styles.NoResult}>해당하는 단어가 없습니다</li>
            )}
            <ul className={styles.DropDownItem}>
                {dropDownList.map((dropDownItem, dropDownIndex) => {
                return (
                    <li
                    key={dropDownIndex}
                    onClick={() => clickDropDownItem(dropDownItem.teamName, dropDownItem.id)}
                    onMouseOver={() => setDropDownItemIndex(dropDownIndex)}
                    className={
                        dropDownItemIndex === dropDownIndex ? 'selected' : ''
                    }
                    >
                    {dropDownItem.teamName}
                    </li>
                )
                })}
            </ul>
        </div>
        )}
    </div>
    )
}

export default TeamSearch;