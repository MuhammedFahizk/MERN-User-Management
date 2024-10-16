// src/components/common/Div.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const Div = ({ className, style, animateProps, onClick, children }) => {
  // Default animation settings (bottom to top)
  const defaultAnimation = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 50 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div
      className={className}
      style={style}
      initial={animateProps?.initial || defaultAnimation.initial}
      animate={animateProps?.animate || defaultAnimation.animate}
      exit={animateProps?.exit || defaultAnimation.exit}
      transition={animateProps?.transition || defaultAnimation.transition}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
};

// PropTypes for validation
Div.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  animateProps: PropTypes.shape({
    initial: PropTypes.object,
    animate: PropTypes.object,
    exit: PropTypes.object,
    transition: PropTypes.object,
  }),
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired, // Ensures children are provided
};

// Default props
Div.defaultProps = {
  className: '',
  style: {},
  animateProps: {},
  onClick: () => {},
};

export default Div;
