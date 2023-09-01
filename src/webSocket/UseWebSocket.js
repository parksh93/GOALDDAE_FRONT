import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const useWebSocket = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/webSocket');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      onConnect: (frame) => {
        console.log('연결 상태: ' + frame);
        stompClient.subscribe('/topic/matchStatus', (messageOutput) => {
          console.log('Received message:', messageOutput.body); 
          setData(JSON.parse(messageOutput.body));
        });
      },
    });

    stompClient.activate();

    return () => {
      if (stompClient.connected) {
        stompClient.deactivate();
      }
      console.log("연결 끊김");
    };
  }
)}    

export default useWebSocket;
