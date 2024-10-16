import { FaArrowLeftLong } from "react-icons/fa6";

import Div from '../../common/Div'
import Text from "../../common/Text";
import { useNavigate } from "react-router-dom";

const Top = ({children}) => {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };
  return (
    <Div className={'p-10 flex gap-2 mx-24  justify-between h-full items-center'} >
        <Div 
        className={'border w-fit rounded-full p-2 cursor-pointer hover:scale-125 '} >
        <FaArrowLeftLong onClick={() => handleBackClick()} className="text-xl" />
        </Div>
        <Text tag={'h3'} className={'text-mg secondary'}  >
        {children}
        </Text>
    </Div>
  )
}

export default Top