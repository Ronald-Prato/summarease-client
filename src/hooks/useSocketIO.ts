import { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

import { API_URL } from "@/constants";

export const useSocketIO = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect((): any => {
    const newSocket = io(API_URL.split("/api")[0]);
    setSocket(newSocket);

    return () => newSocket.close();
  }, [API_URL]);

  return { socket };
};
