import React from 'react';

const OAuth2Login: React.FC = () => {
    const openLoginPopup = () => {
        const popup = window.open(
            '/oauth2/authorization/github', // Updated to match the Spring Security GitHub login endpoint
            'OAuth2 Login',
            'width=600,height=600'
        );

        if (popup) {
            const timer = setInterval(() => {
                if (popup.closed) {
                    clearInterval(timer);
                    alert('Login process completed.');
                    // Perform any necessary follow-up actions here
                    // You can fetch user data or update the app state
                    window.location.reload();
                }
            }, 500);
        } else {
            alert('Popup blocked. Please enable popups for this site.');
        }
    };

    return (
        <div>
            <button onClick={openLoginPopup} style={buttonStyle}>
                Login with GitHub
            </button>
        </div>
    );
};

const buttonStyle: React.CSSProperties = {
    padding: '10px 20px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    outline: 'none',
};

export default OAuth2Login;
