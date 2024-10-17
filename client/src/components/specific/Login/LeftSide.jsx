import { Link } from "react-router-dom"
import Div from "../../common/Div"
import Text from "../../common/Text"
import LoginForm from "./LoginForm"
import Top from "./Top"

const LeftSide = () => {
  return (
    <Div className={'md:p-5 px-7  mt-0  h-fit'}>
        <Top className=''>
            new  member <Link to={'/signUp'} className="text-sm text-blue-500 hover:underline hover:scale-125 cursor-pointer"> Sign  Up </Link>
        </Top>
                <Div className={' md:mx-24  flex flex-col justify-end items-center  py-10'}>
                    <Text className={'md:px-10 px-2 text-4xl primary'} tag={'h1'} >
                        Login 
                    </Text>
                <Text className={'md:px-10 px-2'}>

                    Welcome to our community
                </Text>
                </Div>
        <Div className={'md:px-10 flex flex-col justify-center items-center'}>
            <LoginForm/>
        </Div>
    </Div>
  )
}

export default LeftSide