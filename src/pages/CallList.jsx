import React, { useEffect } from 'react'
import {useSelector, useDispatch} from "react-redux"
import { setCallList, setLoading } from '../slices/callListSlice';
import { getCallList } from '../services/operations/apis';
import { setCurrPageCallList } from '../slices/currPageSlice';

const CallList = () => {
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.callList);
    const {currPageCallList} = useSelector(state => state.currPage);
    console.log(currPageCallList);
    useEffect(() => {
        const fetchCallList = async () => {
            dispatch(setLoading(true));
            const response = await getCallList();
            dispatch(setCallList(response));
            let filteredPage = response.filter((item)=>  item?.direction==="inbound");
            filteredPage.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at));

            // Group the sorted array by date
            const groupedCalls = filteredPage.reduce((result, call) => {
              const date = call?.created_at.split('T')[0]; // Extract the date part
              result[date] = result[date] || [];
              result[date].push(call);
              return result;
            }, {});
            
            // Convert the grouped calls into an array of objects with keys as dates and values as arrays of calls
            const sortedCallsArray = Object.entries(groupedCalls).map(([date, calls]) => ({
              [date]: calls,
            }));
            dispatch(setCurrPageCallList(sortedCallsArray));
            dispatch(setLoading(false));    
        }
        fetchCallList();
    }, []);

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
        <div className=''>

        </div>
    </div>
  )
}

export default CallList