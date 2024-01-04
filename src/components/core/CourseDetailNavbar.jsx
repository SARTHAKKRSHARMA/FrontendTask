import React from 'react'
import { useNavigate } from 'react-router-dom'

const CourseDetailNavbar = () => {
    const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/")} className=' flex flex-row items-center justify-center gap-3 px-3 py-2 bg-[#014A32] text-[#C5C7D4] rounded-md font-inter font-bold'>
        Go Back
    </button>
  )
}

export default CourseDetailNavbar