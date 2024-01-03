import toast from "react-hot-toast" 
import { apiConnector } from "../apiConnector"
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const getCallList = async function() {
    const toastId = toast.loading("Fetching Call List...");
    let callList = [];
    try
    {
        const response = await apiConnector("GET", BASE_URL + "/activities");
        if(response.status !== 200)
        {
            throw new Error("Error Occured at backend while fetching call list");
        }   
        callList = response.data;
    } catch(e)
    {
        toast.error("Error occured while Fetching Call List");
    }
    toast.dismiss(toastId);
    return callList;
}