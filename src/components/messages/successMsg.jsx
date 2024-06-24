import React, { useState, useEffect } from 'react';
import Alert from 'react-bootstrap/Alert';

function SuccessMessage({ message }) {
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    if (message !== '') {
      setShowSuccessMessage(true);

      setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
    }
  }, [message]);

  return (
    <div className="text-center">
      {showSuccessMessage && (
        <Alert variant="success" style={{ borderRadius: '20px' }}>
          {message}
        </Alert>
      )}
    </div>
  );
}

export default SuccessMessage;