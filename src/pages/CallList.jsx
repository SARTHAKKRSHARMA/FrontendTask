import React, { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { setCallList, setLoading } from '../slices/callListSlice';
import { getCallList } from '../services/operations/apis';
import { setCurrPageCallList } from '../slices/currPageSlice';
import CallListEntry from '../components/core/CallListEntry';

const CallList = () => {
    const dispatch = useDispatch();
    const {callList, loading} = useSelector((state) => state.callList);
    
    useEffect(() => {
        const fetchCallList = async () => {
            dispatch(setLoading(true));
            const response = await getCallList();
            dispatch(setCallList(response));
            let filteredPage = response.filter((item)=>  item?.is_archived === false && item?.direction==="inbound");
            filteredPage.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at));

            const groupedCalls = filteredPage.reduce((result, call) => {
              const date = call?.created_at.split('T')[0]; // Extract the date part
              result[date] = result[date] || [];
              result[date].push(call);
              return result;
            }, {});
            
            const sortedCallsArray = Object.entries(groupedCalls).map(([date, calls]) => ({
              [date]: calls,
            }));
            dispatch(setCurrPageCallList(sortedCallsArray));
            dispatch(setLoading(false));    
        }
        fetchCallList();
    }, []);

    useEffect(() => {
      const setCurrPageFunction = async () => {
        dispatch(setLoading(true));
        let filteredPage = callList.filter((item)=>  item?.is_archived === false && item?.direction==="inbound");
        filteredPage.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at));

        const groupedCalls = filteredPage.reduce((result, call) => {
          const date = call?.created_at.split('T')[0]; // Extract the date part
          result[date] = result[date] || [];
          result[date].push(call);
          return result;
        }, {});
        
        const sortedCallsArray = Object.entries(groupedCalls).map(([date, calls]) => ({
          [date]: calls,
        }));
        dispatch(setCurrPageCallList(sortedCallsArray));
        dispatch(setLoading(false));    
    }
    setCurrPageFunction();
    }, [callList]);

    if(loading)
    {
        return (
            <div className=' w-[100%] h-[100%] rounded-[3px] flex flex-row items-center justify-center'>
                <div className=' spinner'></div>
            </div>
        )
    }

  return (
    <div className=' p-[20px]'>
      {
        callList.length === 0 ? <div><p>No Records To Display</p></div> : (
          <div className=' flex flex-col gap-3 w-[100%] h-[100%] py-[5px]'>
            <CallListEntry />
          </div>
        )
      }
    </div>
  )
}

export default CallList