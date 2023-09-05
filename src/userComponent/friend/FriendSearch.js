import "./FriendSearch.css";
import {useState, useCallback, useEffect} from 'react'
import {AiOutlineClose} from 'react-icons/ai'
import {BsPersonAdd, BsPersonExclamation, BsSend, BsEmojiSmile} from 'react-icons/bs'
import {Link} from 'react-router-dom'

const FriendSearch = ({userInfo, setOpenAlert, setAlertSeverity, setAlertText }) => {
    const [searchValue, setSearchValue] = useState('');
    const [searchResultList, setSearchResultList] = useState(null);

    const onchangeSearchValue = useCallback(async e => {
        setSearchValue(e.target.value.trim());

        if(e.target.value.trim() !== ""){
            await fetch("/friend/search",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    userId: userInfo.id,
                    nickname: e.target.value.trim(),
                })
            }).then(res => res.json())
            .then(data => {
                setSearchResultList(data);
            })
        }
    });

    const deleteSearchValue = () => {
        setSearchValue("");
    }

    const onClickFriendAdd = toUserId => {
        fetch("/friend/addFriendRequest", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                toUser: toUserId,
                fromUser: userInfo.id
            })
        });
        setSearchValue("");
        setAlertSeverity("success");
        setAlertText("친구 신청이 완료되었습니다.");
        setOpenAlert(true);
        setTimeout(() => setOpenAlert(false), 2000);
    }

    return (
        <div className="searchContainer">
            <div className='nomalBox'>
                <input onChange={onchangeSearchValue} placeholder="친구 찾기" className="inputBox" value={searchValue}/>
                {searchValue !== "" ? <AiOutlineClose onClick={deleteSearchValue} className="deleteBtn" /> : ""}
                {searchValue.trim() === "" ?
                    "" :  
                    <>  
                    <hr />
                    <div className="friendList">
                        {searchResultList !== null ?
                            searchResultList.unFriendList.length === 0 && searchResultList.friendList.length === 0?
                                <span className="noResultText">존재하지 않는 닉네임입니다.</span> 
                                : ""
                            :""
                        }

                        {searchResultList !== null?
                            searchResultList.unFriendList.length !== 0 ?
                                searchResultList.unFriendList.map(unFriend => (
                                    <div className="friendDiv">
                                    <img src={unFriend.profileImgUrl} className="friendImg" />
                                    <span className="friendNickname">{unFriend.nickname}</span> 
                                    {unFriend.friendAddCnt === 0 &&  unFriend.friendAcceptCnt === 0 && unFriend.id !== userInfo.id ? <span><BsPersonAdd className="friendAddBtn" onClick={() => onClickFriendAdd(unFriend.id)}/></span>
                                    : unFriend.id === userInfo.id ? <Link to="/myPage"><BsEmojiSmile className="meBtn"/></Link>
                                    :<BsPersonExclamation className="friendWaitBtn" />}
                                </div>
                            )) : ""
                          : ""
                        }

                        {searchResultList !== null?
                        searchResultList.friendList.length !== 0 ?
                            searchResultList.friendList.map(friend => (
                                    <div className="friendDiv">
                                        <img src={friend.profileImgUrl} className="friendImg" />
                                        <span className="friendNickname">{friend.nickname}</span>
                                        <BsSend className="chatBtn" />
                                    </div>
                                )) : ""
                            : ""
                        }
                    </div>
                    </>
                }
            </div>
    </div>
    )
}

export default FriendSearch;