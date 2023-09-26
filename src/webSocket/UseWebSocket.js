import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const useWebSocket = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://223.130.137.115/webSocket');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: (frame) => {
        // 웹소켓 연결 확인할때 주석 해제하고 확인하면 됨
        // console.log('연결 상태: ' + frame);
        stompClient.subscribe('/topic/matchStatus', (messageOutput) => {
          // console.log('수신:', messageOutput.body); 
          setData(JSON.parse(messageOutput.body));
        });
      },
    });

    stompClient.activate();

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
      }
      // console.log("연결 끊김");
    };
  }
)}    

export default useWebSocket;
