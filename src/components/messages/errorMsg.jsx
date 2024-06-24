import React, { useEffect, useState } from "react";
import Alert from 'react-bootstrap/Alert';

function ErrorMsg ({ message }) {
    const [showErrorMsg, setShowErrorMsg] = useState(false);

    useEffect(() => {
        console.log(message, "error");
        if (message !== '') {
            setShowErrorMsg(true);

            setTimeout(() => {
                setShowErrorMsg(false);
            }, 3000);
        }
    }, [message]);

    return (
        <div className="text-center">
            {showErrorMsg && (
                <Alert variant="danger" style={{ borderRadius: '20px' }}>
                    {message}
                </Alert>
            )}
        </div>
    );
}

export default ErrorMsg;