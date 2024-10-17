import React from 'react'
import { Link } from "react-router-dom"
import Div from "../../common/Div"
import Text from "../../common/Text"
import Top from '../Login/Top'
import Signup from './SignUpForm'
const LeftSide = () => {
  return (
    <Div className={'md:px-5  mt-0 px-8    h-fit'}>
    <Top className=''>
       already member <Link to={'/login'} className="text-sm text-blue-500 hover:underline hover:scale-125 cursor-pointer">Login</Link>
    </Top>
            <Div className={' md:mx-24   py-4 flex flex-col justify-end items-center  '}>
                <Text className={'md:px-10 text-4xl primary'} tag={'h1'} >
                    Sign Up 
                </Text>
            <Text className={'md:px-10'}>
                Create an account to get started
            </Text>
            </Div>
    <Div className={'md:px-10 flex flex-col justify-center items-center'}>
        <Signup/>
    </Div>
</Div>
  )
}

export default LeftSide