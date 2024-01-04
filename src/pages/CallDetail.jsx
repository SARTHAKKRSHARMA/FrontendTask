import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getCallDetail, toggleArchiveCall } from '../services/operations/apis';
import { RiInboxUnarchiveFill, RiInboxArchiveFill } from "react-icons/ri";
import { MdCallMissedOutgoing, MdCallMissed } from "react-icons/md";
import { CiVoicemail } from "react-icons/ci";
import { MdCall } from "react-icons/md";
import { formatDuration, formatTime } from '../services/dateFormatter/dateFormatter'



const CallDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {id} = useParams("id");
  const [callDetail, setCallDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const fetchCallDetail = async () => {
    setLoading(true);
    const result = await getCallDetail(id);
    if(result === null){
      navigate("/");
    } else
    {
      setCallDetail(result);
    }
    setLoading(false) 
  }

  const archiveHandler = async () => {
    setLoading(true);
    const success = await toggleArchiveCall(id, !callDetail.is_archived);
    if(success)
    {
      await fetchCallDetail();
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchCallDetail();
  }, [location, id]);

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
      <div>
        {
          (
            <div className=' flex flex-col gap-3 w-[100%] h-[100%] py-[5px]'>
              {
                  <div onClick={!loading && archiveHandler}  className=' w-[100%] py-3 rounded-md bg-[#AFB2BF] text-center cursor-pointer font-bold font-inter flex flex-row items-center gap-3 justify-center shadow-[0_1px_0_0_rgba(0,0,0,0.1)]'> 
                    {callDetail.is_archived ? <div className=' flex flex-row items-center justify-center gap-3'><RiInboxUnarchiveFill/> <p>Unarchive this Call</p></div> : <div className=' flex flex-row items-center justify-center gap-3'><RiInboxArchiveFill/> <p>Archive this Call</p></div>}
                  </div>
              }
              <div className=' flex flex-col gap-[1.5rem] w-[100%]'>
                      <div className=' flex flex-row items-center gap-2'>
                          <p className=' font-bold font-inter'>Call Status:</p>
                          {    
                              callDetail?.call_type === "missed" ? 
                              callDetail?.direction === "outbound" ? 
                                <div className=' flex flex-row items-center gap-3'><MdCallMissedOutgoing className=' text-[18px] text-red-500' /> <span>Not Answered at :{formatTime(callDetail?.created_at)}</span></div> : 
                                <div className=' flex flex-row items-center gap-3'><MdCallMissed className=' text-[18px] text-red-500' /> <span>Missed Call at : {formatTime(callDetail?.created_at)}</span></div>  : 
                                callDetail?.call_type === "voicemail" ? <div className=' flex flex-row items-center gap-3'><CiVoicemail className=' text-[18px] text-yellow-600' /> <span>Voice Mailed at : {formatTime(callDetail?.created_at)}</span> </div> : 
                                <div className=' flex flex-row items-center gap-3'><MdCall className=' text-[18px] text-green-600' /> <span>Called At: {formatTime(callDetail?.created_at)} </span> </div> 
                          }
                      </div>

                      <p className=' flex flex-row items-center gap-3'><span className=' font-bold font-inter '>Call Duration</span> : {formatDuration(callDetail?.duration)}</p>
                      
                      <div className=' flex flex-row items-center gap-3'>
                      <span className=' font-inter font-bold'>Caller Detail</span>   : { callDetail?.direction === "outbound" ? callDetail?.to ? <p className=' text-[#2C333F]'>{callDetail?.to}</p> : callDetail?.via ? <p className=' text-[#2C333F]'>{callDetail?.via}</p> : <p className=' text-[#2C333F]'>-</p> : callDetail?.from ? <p className=' text-[#2C333F]'>{callDetail?.from}</p> : callDetail?.via ? <p className=' text-[#2C333F]'>{callDetail?.via}</p> : <p className=' text-[#2C333F]'>-</p> }
                      </div>
              </div>

            </div>
          )
        }
      </div>
    </div>
  )
}

export default CallDetail