import React from 'react'

const HeaderCard = ({img,desc}) => {
  return (
    <div className='py-2 px-1 rounded-xl hover:bg-gray-200 flex flex-col gap-2 justify-center items-center'>
        <div className='flex items-center justify-center'>
            <img src={img} className='w-[90%] rounded-xl border-gray-300 border' alt="" />
        </div>
        <p className='text-[13px] opacity-90'>{desc}</p>
    </div>
  )
}

export default HeaderCard