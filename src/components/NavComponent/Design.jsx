import React from 'react'
import ThietKe from '../../assets/datajson/ThietKe.json'
import ComponentCard from '../Card/IndexPageCard/ComponentCard'
const Design = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 gap-y-7">
    {ThietKe.map((item,index) => {
      return <ComponentCard item={item} />
    })}
  </div>
  )
}

export default Design