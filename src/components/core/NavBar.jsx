import React, { useRef, useState } from 'react'
import { VscSettings } from "react-icons/vsc";
import {useSelector, useDispatch} from "react-redux";
import { setLoading } from '../../slices/callListSlice';
import { setCurrPage, setCurrPageCallList } from '../../slices/currPageSlice';
import useOnClickOutside from '../../hooks/useOnClickOutside';

const NavBar = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => {setIsVisible(false)});

    const dispatch = useDispatch();
    const {callList, loading} = useSelector((state) => state.callList);
    const {currPage} = useSelector((state) => state.currPage);

    const onClickHandler = (newCurrPage) => {
        if(currPage !== newCurrPage)
        {
            dispatch(setLoading(true));
            dispatch(setCurrPage(newCurrPage));
            let filteredPage = [];
            if(newCurrPage === 'all') filteredPage = [...callList];
            else if (newCurrPage === "inbox")
            {
                filteredPage = callList.filter((item)=> item?.created_at && item?.direction==="inbound");
            }
            else
            {
                filteredPage = callList.filter((item) => item?.created_at && item?.is_archived);
                setIsVisible(false);
            }
            

            filteredPage.sort((a, b) => {
                const dateA = a?.created_at ? new Date(a.created_at) : new Date(0);
                const dateB = b?.created_at ? new Date(b.created_at) : new Date(0);
            
                return dateB - dateA;
            });
            
            const groupedCalls = filteredPage.reduce((result, call) => {
                const date = call.created_at.split('T')[0]; // Extract the date part
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
    }

    return (
        <div className=' flex flex-row items-center gap-3 w-[60%] h-[100%] justify-between relative'>
            <button onClick={() => onClickHandler("inbox")} disabled={loading} className={`font-inter text-[16px] transition-all duration-200 ${currPage === "inbox" ? " font-bold decoration-red-600 decoration-[6px] underline underline-offset-[30px]" : ""}`} >Inbox</button>
            <button onClick={() => onClickHandler("all")} disabled={loading} className={`font-inter text-[16px] transition-all duration-200 ${currPage === "all" ? " font-bold decoration-red-600 decoration-[6px] underline underline-offset-[30px]" : ""}`} >All Calls</button>
            <div className=' flex flex-row items-center justify-between relative'>
                <button onClick={() => setIsVisible(true)} disabled={loading} className={`font-inter text-[16px] transition-all duration-200`} ><VscSettings /></button>
                {
                    isVisible && (
                        <div className=' absolute h-[20px] w-[80px] top-[2.5em] -right-5 border-2 border-black px-3 py-4 flex items-center justify-center' ref={ref}>
                            <button onClick={() => onClickHandler("archieved")} disabled={loading} className={`font-inter text-[12px] transition-all duration-200`} >Archieved Calls</button>
                        </div>
                    )
                }
            </div>
        </div>
    )

}

export default NavBar