import React from 'react'

const MediumCard = ({img,title}) => {
  return (
    <div className='mt-10 cursor-pointer hover:scale-105 transform transition duration-200 ease-out'>
        <div className='relative h-80 w-80'>
            <img src={img} alt="" className='rounded-xl' />
        </div>
        <h3 className='text-xl font-semibold mt-3'>{title}</h3>
    </div>
  )
}

export default MediumCard