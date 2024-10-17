import React, { useEffect } from 'react'
import { getProfile } from '../services/getApi';

const Home = () => {
    useEffect(() => {
getProfile().then(response => console.log(response.data))
    },[])
  return (
    <div>Home</div>
  )
}

export default Home