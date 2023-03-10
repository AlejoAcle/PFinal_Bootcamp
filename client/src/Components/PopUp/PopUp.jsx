import React, { useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const PopUp = () => {
  const [position, setPosition] = useState('top-start');

  return (
    <ToastContainer>
      <Toast>
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-3" alt="" />
          <strong className="me-auto">LemonPair</strong>
        </Toast.Header>
        <Toast.Body>No estás registrado</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default PopUp