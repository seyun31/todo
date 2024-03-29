import React from 'react';

import styled from 'styled-components';

const Circle = styled.div`
  width: 36px;
  min-width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
export default function CircleButton({
  className,
  onClick,
  imageSrc,
}: {
  className?: string;
  onClick: () => void;
  imageSrc: string;
}) {
  return (
    <button className={className} onClick={onClick}>
      <img src={imageSrc} alt="Button Icon" height="24px" width="24px" />
    </button>
  );
}
