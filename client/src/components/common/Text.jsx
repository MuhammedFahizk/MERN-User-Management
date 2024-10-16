// src/components/common/Text.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Text = ({ tag: Tag, className, style, animateProps, onClick, children }) => {
  // Default animation settings (bottom to top)
  const defaultAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.5 },
  };

  // Create a motion component dynamically
  const MotionTag = motion[Tag] || motion.div; // Fallback to motion.div if Tag is invalid

  return (
    <MotionTag
      className={className}
      style={style}
      initial={animateProps?.initial || defaultAnimation.initial}
      animate={animateProps?.animate || defaultAnimation.animate}
      exit={animateProps?.exit || defaultAnimation.exit}
      transition={animateProps?.transition || defaultAnimation.transition}
      onClick={onClick}
    >
      {children}
    </MotionTag>
  );
};

// PropTypes for validation
Text.propTypes = {
  tag: PropTypes.string, // Allows you to specify the HTML tag (e.g., 'h1', 'h2', 'p')
  className: PropTypes.string,
  style: PropTypes.object,
  animateProps: PropTypes.shape({
    initial: PropTypes.object,
    animate: PropTypes.object,
    exit: PropTypes.object,
    transition: PropTypes.object,
  }),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

// Default props
Text.defaultProps = {
  tag: 'div', // Default to 'div' if no tag is provided
  className: '',
  style: {},
  animateProps: {},
  onClick: () => {},
};

export default Text;
