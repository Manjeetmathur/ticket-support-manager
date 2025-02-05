import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../Context/AuthContext/AuthContext'
import { useNavigate } from 'react-router-dom'

import { IoMenu } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";
import { useSelector } from 'react-redux';
const RouterProtect = ({children}) => {
       const {status} = useSelector(st=>st.auth)
       const navigate = useNavigate()
       useEffect(()=> {
              if(!status){
                     navigate("/login")
              }
       },[])
  return (
    <div>
      {children}
    </div>
  )
}

export default RouterProtect
