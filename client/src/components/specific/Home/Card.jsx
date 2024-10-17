import React from 'react';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/avatars-identicon-sprites';
import { CiLogout } from 'react-icons/ci';
import { Dropdown, Menu, notification } from 'antd'; 
import Div from '../../common/Div';
import Text from '../../common/Text';
import { logout, logoutEveryDevice } from '../../../services/postApi';
import { useDispatch } from 'react-redux';
import { authUserLogout } from '../../../Redux/feathers/auth';
import Footer from './Footer';

const Card = ({ profile }) => {
  const dispatch = useDispatch(); // Hook to dispatch actions to the Redux store

  // Function to generate a random avatar
  const generateRandomAvatar = () => {
    const svg = createAvatar(style, {
      seed: profile?.email || 'default', // Use a unique seed to ensure consistency
      options: {
        backgroundColor: '#4A5568', // Change this to your desired background color
      },
    });
    return svg; // Return the raw SVG string
  };

  // Function to show notification
  const openNotification = (type, message) => {
    notification[type]({
      message: message,
      duration: 2, // Duration for the notification to auto-close
    });
  };

  // Handle logout options
  const handleLogout = async (option) => {
    try {
      if (option === 'this device') {
        await logout(); // Call logout function for this device
      } else if (option === 'all devices') {
        await logoutEveryDevice(); // Call logout function for all devices
      }
      // Dispatch the logout action to Redux
      dispatch(authUserLogout());
      openNotification('success', `Logged out from ${option}`);
    } catch (error) {
      openNotification('error', 'Logout failed. Please try again.');
      console.error("Error logging out:", error);
    }
  };

  // Create menu for dropdown options
  const menu = (
    <Menu>
      <Menu.Item onClick={() => handleLogout('this device')}>
        Logout from this device
      </Menu.Item>
      <Menu.Item onClick={() => handleLogout('all devices')}>
        Logout from all devices
      </Menu.Item>
    </Menu>
  );

  return (
    <Div className="flex justify-center items-center h-screen w-screen">
      <Div className="w-[400px] text-center text-black bg-green-400 rounded-lg shadow-2xl p-6">
        <Div className={'flex justify-end p-5 relative'}>
          <Dropdown overlay={menu} trigger={['hover']}>
            <CiLogout className='text-red-400 text-2xl hover:scale-125 cursor-pointer' />
          </Dropdown>
        </Div>
        <Div className="mb-4">
          <div
            dangerouslySetInnerHTML={{ __html: generateRandomAvatar() }} // Set the SVG as inner HTML
            className="w-24 h-24 mx-auto"
          />
        </Div>
        <Text className="text-2xl font-bold">{profile?.username || 'User Name'}</Text>
        <Text className="text-md">{profile?.email || 'user@example.com'}</Text>
       <Footer user={profile}/>
      </Div>
    </Div>
  );
};

export default Card;
