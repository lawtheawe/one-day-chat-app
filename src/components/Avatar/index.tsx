import React from 'react';
import styled from 'styled-components/macro';

const Img = styled.img<any>`
  width: 48px;
  height: 48px;
  border-radius: 30px;
`;

const Avatar: React.FunctionComponent<
  React.DetailedHTMLProps<
    React.ImgHTMLAttributes<HTMLImageElement>,
    HTMLImageElement
  >
> = ({ src, alt, ...rest }) => {
  return <Img src={src} alt={alt} {...rest} />;
};

export default Avatar;
