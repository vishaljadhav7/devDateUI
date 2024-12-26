import axios from 'axios';
import { BASE_URL } from './constants';


export const getReceiverProfile = async ( ) => {
    try {
        const res = await axios.get(BASE_URL+"/get-profile/" + toUserId, {
            withCredentials : true
        })
        const receiverData = res.data.data;
        return receiverData;
    } catch (error) {
     console.error(error || "something went wrong")   
    }
}