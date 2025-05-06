
import React from 'react';

interface SocialInfoProps {
  socialHandle: string;
}

const SocialInfo: React.FC<SocialInfoProps> = ({ socialHandle }) => {
  return (
    <div className="social-text">
      SLEDUJETE NÁS NA SOCIÁLNÍCH SÍTÍCH?
      <br />
      <span className="social-handle">{socialHandle}</span>
    </div>
  );
};

export default SocialInfo;
