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

export const getCallDetail = async function(callId) {
    const toastId = toast.loading("Fetching Call Detail...");
    let callDetail = null;
    try
    {
        const response = await apiConnector("GET", BASE_URL + "/activities/" + callId);
        if(response.status !== 200)
        {
            throw new Error("Error Occured at backend while fetching call Detail");
        }   
        callDetail = response.data;
    } catch(e)
    {
        toast.error("Error occured while Fetching Call Detail");
    }
    toast.dismiss(toastId);
    return callDetail;
}

export const resetAll = async function () {
    const toastId = toast.loading("Unarchieving All Calls...");
    let success;
    try
    {
        const response = await apiConnector("PATCH", BASE_URL + "/reset");
        if(response.status !== 200)
        {
            throw new Error("Error Occured at backend while unarchieving call list");
        }   
        toast.success("Course Unarchived Successfully");
        success = true;
    } catch(e)
    {
        success = false;
        toast.error("Error occured while unarchieving Call List");
    }
    toast.dismiss(toastId);
    return success;
}

export const toggleArchiveCall = async function (callId, archive) {
    const toastId = archive ? toast.loading("Archiving Call") : toast.loading("Unarchiving Call");
    let success;
    try
    {        
        const url = BASE_URL + "/activities/" + callId;
        const response = await apiConnector("PATCH", url, {is_archived: archive});
        if(response.status !== 200)
        {
            throw new Error(`Error Occured at backend while ${archive ? "archieve" : "unarchieve"} call list`);
        } 
        toast.success(`Course ${archive ? "archieved" : "unarchieved"} Successfully`);           
        success = true;
    } catch(e)
    {
        success = false;
        toast.error(`Error occured while ${archive ? "archieving" : "unarchieving"} Call`);
    }
    toast.dismiss(toastId);
    return success;
}