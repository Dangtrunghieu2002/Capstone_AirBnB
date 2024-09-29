import React from 'react'
import ComponentCard from '../Card/IndexPageCard/ComponentCard'
import BacCuc from '../../assets/datajson/BacCuc.json'
const North = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-6 gap-y-7">
    {BacCuc.map((item,index) => {
      return <ComponentCard item={item} delay={index * 0.04} />
    })}
  </div>
  )
}

export default North