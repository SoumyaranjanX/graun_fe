import React from 'react';
import { useSpring, animated } from 'react-spring';
import { FaSync } from 'react-icons/fa';

const AnimatedButton = ({ onClick }) => {
  const [isRotating, setIsRotating] = React.useState(false);

  const rotation = useSpring({
    transform: isRotating ? 'rotate(360deg)' : 'rotate(0deg)',
    config: { duration: 1000 },
    onRest: () => setIsRotating(false),
  });

  const handleClick = () => {
    setIsRotating(true);
    onClick();
  };

  return (
    <button
      style={{
        color: '#1B81E9',
        marginTop: '3px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
      }}
      onClick={handleClick}
    >
      <animated.div style={{ ...rotation, display: 'flex', alignItems: 'center' }}>
        <FaSync style={{ marginBottom: '-2px' }} />
      </animated.div>
      <span style={{ marginLeft: '5px', }}>Tap To Refresh</span>
    </button>
  );
};

export default AnimatedButton;
