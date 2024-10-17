import React, { useState } from 'react';
import Div from '../../common/Div';
import { CiEdit } from 'react-icons/ci';
import { Tooltip } from 'antd'; // Using Ant Design Tooltip for better UX
import EditModal from './EditModal'; // Import EditModal component

const Footer = ({user}) => {
  const [isModalVisible, setIsModalVisible] = useState(false); // State to manage modal visibility

  // Function to handle edit action
  const handleEditClick = () => {
    setIsModalVisible(true); // Show the modal when the edit icon is clicked
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setIsModalVisible(false); // Hide the modal
  };

  return (
    <Div className="flex justify-center items-center bg-gray-800 p-4 mt-8 rounded-t-lg shadow-lg">
      <Tooltip title="Edit Profile" placement="top">
        <CiEdit 
          className="text-white text-3xl cursor-pointer hover:text-green-400 transition duration-300" 
          onClick={handleEditClick} // Call the function on click
        />
      </Tooltip>
      {/* Render the EditModal */}
      <EditModal visible={isModalVisible} user={user} onClose={handleCloseModal} />
    </Div>
  );
};

export default Footer;
