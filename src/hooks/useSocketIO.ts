import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

import { API_URL } from "@/constants";

export const useSocketIO = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect((): any => {
    console.log(API_URL);
    const newSocket = io(API_URL);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [API_URL]);

  return { socket };
};
