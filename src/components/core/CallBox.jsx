import React from 'react'
import { formatTime } from '../../services/dateFormatter/dateFormatter'
import { MdCallMissedOutgoing, MdCallMissed } from "react-icons/md";
import { CiVoicemail } from "react-icons/ci";
import { MdCall } from "react-icons/md";
import { useNavigate } from 'react-router-dom';




const CallBox = ({data}) => {
    const navigate = useNavigate();
  return (
    <div className=' flex flex-col gap-3'>
        {
            data.map(call => (
                <div key={call.id} onClick={() => navigate(`/activities/${call.id}`)} className=' flex flex-row items-center justify-between px-2 py-3 rounded-md bg-[#AFB2BF] cursor-pointer'>
                    <div className=' flex flex-row items-center gap-2'>
                        {
                            call?.call_type === "missed" ? call?.direction === "outbound" ? <MdCallMissedOutgoing className=' text-[18px] text-red-500' /> : <MdCallMissed className=' text-[18px] text-red-500' /> : call?.call_type === "voicemail" ? <CiVoicemail className=' text-[18px] text-yellow-600' /> : <MdCall className=' text-[18px] text-green-600' /> 
                        }
                        { call?.direction === "outbound" ? call?.to ? <p className=' text-[#2C333F]'>{call?.to}</p> : call?.via ? <p className=' text-[#2C333F]'>{call?.via}</p> : <p className=' text-[#2C333F]'>-</p> : call?.from ? <p className=' text-[#2C333F]'>{call?.from}</p> : call?.via ? <p className=' text-[#2C333F]'>{call?.via}</p> : <p className=' text-[#2C333F]'>-</p> }
                    </div>
                    <div>
                        <p className=' font-inter text-[13px] text-[#424854]'>{formatTime(call.created_at)}</p>
                    </div>
                </div>
            ))
        }
    </div>


  )
}

export default CallBox