import React,{useEffect, useState, useCallback} from 'react'
import { useNavigate } from 'react-router-dom'
import cookie from 'react-cookies';
import styles from "./UserChat.module.css"

const UserChat = () => {
    const ncloudchat = require('ncloudchat');
    const navigate = useNavigate();
    const [projectId, setProjectId] = useState('');
    const [myChannelList, setMyChannelList] = useState([]);
    
    const nc = new ncloudchat.Chat();
    
    
    // token 가져오기
    useEffect(() => {
        fetch("/getChatProperties",{method: "get"})
        .then((res) => res.json())
        .then(data => {
            setProjectId(data.projectId);
            nc.initialize(data.projectId);
            fetch("https://dashboard-api.ncloudchat.naverncp.com/v1/api/token", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-api-key": data.apiKey,
                    "x-project-id": data.projectId
                },
                body: JSON.stringify({
                    id: "asdas",
                    expireDay: 1
                })
            }).then(res => res.json())
            .then(data => {
                if(data.status === 1){
                    cookie.save('chatToken', data.token, {
                        path : '/',
                    });
                }
            })
            
            // 서버 접속
            nc.connect({
                id: "asdas",
                name: "박상현",
                customField: 'json',
            },[cookie.load("chatToken")]);
            
            // 채널 정보 가져옴
            setMyChannelList([]);
            getChannelList();
        })          
    },[])
    
    
    const createChannel = useCallback(async () => {
        // 채팅 생성
        const channel = await nc.createChannel({type: 'PUBLIC',name: "새 채팅방"});

        // 채팅 참여
        await nc.subscribe(channel.id);
    });

    const getChannelList = async () => {
        const filter = {state:true};
        const sort = {create_at: -1}
        const channels = await nc.getChannels(filter, sort); // 전체 채널 리스트 가져오기
    
        for (const channelList of channels.edges) {
            const filter = {channel_id: channelList.node.id};
            const sort = {updated_at: 1};
            const option = { offset:0, per_page:100};
            const subscriptions = await nc.getSubscriptions(filter, sort, option); // 각 채널들의 참여자 가져오기
    
            let channelLastContent;
            if(channelList.node.last_message === null){
                channelLastContent = "";
            }else {
                channelLastContent = channelList.node.last_message.content;
                if(channelLastContent.length > 20) {
                    const subContent = channelLastContent.substring(0, 20);

                    channelLastContent = subContent + "...";
                }
            }

            if(subscriptions.totalCount > 0){
                for (const channelInfo of subscriptions.edges) {
                    if(channelInfo.node.user.id === "asdas"){
                        // 읽지 않은 문자 체크
                        const promise = nc.countUnread(channelInfo.node.channel_id);

                        promise.then(appData => {   
                            setMyChannelList(myChannelList => [...myChannelList, {
                                channelInfo: channelInfo,
                                lastContent: channelLastContent,
                                unReadCnt: appData.unread,
                            }]);
                        })
                    }
                }
            }
        }
    }

    // 접속 종료
    const disconnectChannel = useCallback(async () => {
        await nc.disconnect();
    })

    return (
        <div>
            <h2>채팅 목록</h2>
            {myChannelList.length === 0 ? 
            <div>
                <span>채팅 목록이 없습니다.</span>
                <br/>
            </div>
            :
             myChannelList.map(myChannel => (
                <div onClick={() => {
                    navigate("/userChatDetail", {state:{
                        channelId: myChannel.channelInfo.node.channel_id,
                        projectId: projectId,
                        channelName: myChannel.channelInfo.node.channel.name,
                    }});
                }} className={styles.channelDiv}>
                    <span className={styles.channelName}>
                    {myChannel.channelInfo.node.channel.name}
                    </span><br/>
                    <span className={styles.lastContent}>
                        {myChannel.lastContent}
                    </span>
                    <span className={styles.unReadCnt} style={myChannel.unReadCnt > 0 ? {background: 'red', color: "white"} : {}}>
                        {myChannel.unReadCnt > 0 ? myChannel.unReadCnt : ""}
                    </span>
                    <br/>
                </div>
            ))}
        
            <button onClick={createChannel}>채팅 생성</button>
            <button onClick={disconnectChannel}>접속 종료</button>
        </div>
    );

}

export default React.memo(UserChat);