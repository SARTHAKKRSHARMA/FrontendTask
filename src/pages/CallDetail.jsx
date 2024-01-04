import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { getCallDetail, toggleArchiveCall } from '../services/operations/apis';
import { RiInboxUnarchiveFill, RiInboxArchiveFill } from "react-icons/ri";


const CallDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {id} = useParams("id");
  const [callDetail, setCallDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(callDetail);
  
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

              </div>

            </div>
          )
        }
      </div>
    </div>
  )
}

export default CallDetail