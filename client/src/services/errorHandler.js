

/**
 * Axios Error Handler
 * @param {Error} error - Error object
 * @param {Object} store - Redux Store
 */

import { authUserLogout } from "../Redux/feathers/auth";


function logError(error, store) { 
  // Request was made and server responded with error(out of 2xx status code range)
  if (error.response) {
    // API we request to always includes `error` or `feedback` in error response
    const { error: respMessage, feedback: respFeedback } = error.response.data;

    const DEFAULTMSG = "Something's not right:( Try again later.";
    let notificationMsg = respFeedback || respMessage || DEFAULTMSG;

    if (error.response.status === 401) {
      notificationMsg = "You need to Log In";

      store?.dispatch(authUserLogout());
    }

    // Fire to redux store with notification data
    // store?.dispatch(
    //   newNotify({
    //     variant: error.response.status,
    //     msg: notificationMsg,
    //   })
    // );
  }
  // The request was made but no response was received
  else if (error.request) {
    console.log(
        "There is no response from the server. Please check your network connection."
    );
    
    // Add custom variable on window object when network error occurs
    if (error?.code === "ERR_NETWORK") window.NetworkError = error?.code;

    // store?.dispatch(
    //   newNotify({
    //     variant: "danger",
    //     msg: error.message,
    //   })
    // );
  }
  // Something happened in setting up the request that triggered an Error
  else {
    // store?.dispatch(
    //   newNotify({
    //     variant: "danger",
    //     msg: "Oh no! An Error Occured!",
    //   })
    // );
    console.log(error);
    
  }
}

export default logError;
