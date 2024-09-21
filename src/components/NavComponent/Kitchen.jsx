import React from 'react'
import ComponentCard from '../Card/IndexPageCard/ComponentCard'
import BepCuaBep from '../../assets/datajson/BepCuaBep.json'
const Kitchen = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 gap-y-7">
    {BepCuaBep.map((item,index) => {
      return <ComponentCard item={item} />
    })}
  </div>
  )
}

export default Kitchen