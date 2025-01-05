import  { createContext, useContext, useEffect } from 'react';
import { io } from 'socket.io-client';
import {BASE_URL} from  '../utils/constants'

export const WebSocketContext = createContext()

const socket = io(BASE_URL); 

export const WebSocketProvider = ({children}) => {
 
    useEffect(()=> {
      socket.on('connection' , () => {
        console.log('Connected from server');
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
      });
    }, []) 

    return (
        <WebSocketContext.Provider value={{socket}}>
         {children}
        </WebSocketContext.Provider>
    )
};


export function useWebSocketContext(){
    return useContext(WebSocketContext);
}
