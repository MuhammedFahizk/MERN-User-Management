import { Link } from "react-router-dom"
import Div from "../components/common/Div"
import Text from "../components/common/Text"
import LeftSide from "../components/specific/signUp/LeftSide"

const SignUp = () => {
  return (
    <Div className={'grid md:grid-cols-2'}>

        <LeftSide/>
    </Div>
  )
}

export default SignUp