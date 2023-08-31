import { useEffect, useState } from 'react';

function useWebSocket(url) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(url);

    socket.onopen = () => console.log('Connected to the server');
    socket.onmessage = (message) => setData(JSON.parse(message.data));
    socket.onerror = (error) => console.error('WebSocket error:', error);
    socket.onclose = () => console.log('Disconnected from the server');

    return () => {
      socket.close();
    };
  }, [url]);

  return data;
}

export default useWebSocket;