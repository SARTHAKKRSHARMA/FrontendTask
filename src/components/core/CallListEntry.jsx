import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCallList, setLoading } from '../../slices/callListSlice';
import { RiInboxUnarchiveFill, RiInboxArchiveFill } from "react-icons/ri";
import { dateFormatter } from '../../services/dateFormatter/dateFormatter';
import CallBox from './CallBox';
import { archiveAll, getCallList, resetAll } from '../../services/operations/apis';



const CallListEntry = () => {
    const {currPageCallList, currPage} = useSelector(state => state.currPage);
    const {loading} = useSelector(state => state.callList);
    const dispatch = useDispatch();

    const unarchiveHandler = async () => {
      dispatch(setLoading(true));
      const success = await resetAll();
      if(success)
      {
        const response = await getCallList();
        dispatch(setCallList(response));
      }
      dispatch(setLoading(false));
    }


    return (
    <div>
      {
        currPageCallList.length === 0 ? <div><p>No Records To Display</p></div> : (
          <div className=' flex flex-col gap-3 w-[100%] h-[100%] py-[5px]'>
            {
                currPage === "archieved" && <div onClick={!loading && unarchiveHandler} className=' w-[100%] py-3 rounded-md bg-[#AFB2BF] text-center cursor-pointer font-bold font-inter flex flex-row items-center gap-3 justify-center shadow-[0_1px_0_0_rgba(0,0,0,0.1)]'> <RiInboxUnarchiveFill/> <p>Unarchive All Calls</p></div>
            }
            <div className=' flex flex-col gap-[1.5rem] w-[100%]'>
              {
                  currPageCallList.map((call, index) => (
                    <div key={index} className=' flex flex-col gap-[1rem]'>
                      <div className=' relative flex flex-row items-center justify-between gap-2 py-3'>
                      <hr className='  w-[33%] border-dotted border-[1px] border-[#838894]' />
                        <p className=' text-[#838894] font-inter'>{dateFormatter(Object.keys(call)[0])}</p>
                        <hr className='  w-[33%] border-dotted border-[1px] border-[#838894]' />
                      </div>
                      <CallBox data={call[Object.keys(call)[0]]} />
                    </div>
                  ))
              }
            </div>

          </div>
        )
      }
    </div>
  )
}

export default CallListEntry