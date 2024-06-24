import React from 'react';

import { useNavigate } from 'react-router-dom';

import Home from '../../screens/home';

const ChatAstrologer = ({ name, expertise = [], languages = [], image, price, experience ,}) => {
  const navigate = useNavigate();





  return (
    <div>
      <Home/>

    
   </div>
  );
};


export default ChatAstrologer;
