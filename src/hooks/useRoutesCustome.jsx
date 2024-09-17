import React from 'react'
import {useRoutes} from 'react-router-dom'
import UserTemplate from '../template/UserTemplate/UserTemplate'
import IndexPage from '../pages/IndexPage/IndexPage'
const useRoutesCustome = () => {
    const routes = useRoutes([
        {
            path: "/",
            element:<UserTemplate/>,
            children : [
                {
                    index : true,
                    element:<IndexPage/>
                }
            ]
        }
    ])
  return routes
}

export default useRoutesCustome