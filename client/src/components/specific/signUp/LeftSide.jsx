import React from 'react'
import { Link } from "react-router-dom"
import Div from "../../common/Div"
import Text from "../../common/Text"
import Top from '../Login/Top'
import Signup from './SignUpForm'
const LeftSide = () => {
  return (
    <Div className={'px-5 mt-0  h-fit'}>
    <Top className=''>
       already member <Link to={'/login'} className="text-sm text-blue-500 hover:underline hover:scale-125 cursor-pointer">Login</Link>
    </Top>
            <Div className={' mx-24   py-4 flex flex-col justify-end items-end  '}>
                <Text className={'px-10 text-4xl primary'} tag={'h1'} >
                    Sign Up 
                </Text>
            <Text className={'px-10'}>
                Create an account to get started
            </Text>
            </Div>
    <Div className={'px-10 flex flex-col justify-center items-center'}>
        <Signup/>
    </Div>
</Div>
  )
}

export default LeftSide