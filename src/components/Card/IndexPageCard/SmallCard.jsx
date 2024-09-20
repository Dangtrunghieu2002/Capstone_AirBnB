import React from 'react'

const SmallCard = ({hinhAnh,tinhThanh,tenViTri}) => {
  return (
    <div className='flex items-center m-2 mt-5 space-x-4 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-in-out'>
        <div className='h-16 w-16'>
            <img src={hinhAnh} alt="" className='rounded-lg h-full w-full object-cover'/>
        </div>
        <div>
            <h2 className='font-medium'>{tinhThanh}</h2>
            <h3 className='text-gray-500'>{tenViTri}</h3>
        </div>
    </div>
  )
}

export default SmallCard