import React from 'react';
import styled, { keyframes } from 'styled-components';

// Define keyframes
const spinClockwise = keyframes`
  0% { transform: rotate(0); }
  25% { transform: rotate(90deg); }
  50% { transform: rotate(180deg); }
  75% { transform: rotate(270deg); }
  100% { transform: rotate(360deg); }
`;

const spinCounterClockwise = keyframes`
  0% { transform: rotate(45deg); }
  25% { transform: rotate(-45deg); }
  50% { transform: rotate(-135deg); }
  75% { transform: rotate(-225deg); }
  100% { transform: rotate(-315deg); }
`;

// Styled components
const FullPageSpinnerBox = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #151728;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ConfigureBorder = styled.div<{ clockwise?: boolean }>`
  width: 150px; /* Increased size */
  height: 150px; /* Increased size */
  padding: 3px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ clockwise }) => clockwise ? '#fb5b53' : 'rgb(63,249,220)'};
  animation: ${({ clockwise }) => clockwise ? spinClockwise : spinCounterClockwise} 3s ease-in-out 0s infinite alternate;
`;

const ConfigureCore = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1d2630;
`;

// The functional component
const RotatingSquareLoader: React.FC = () => {
  return (
    <FullPageSpinnerBox>
      <ConfigureBorder clockwise>
        <ConfigureCore />
      </ConfigureBorder>
      <ConfigureBorder>
        <ConfigureCore />
      </ConfigureBorder>
    </FullPageSpinnerBox>
  );
};

export default RotatingSquareLoader;
