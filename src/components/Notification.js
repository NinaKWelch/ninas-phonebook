import React from 'react'

const Notification = ({ message, color }) => {
    const messageStyle = {
        marginBottom: 25,
        border: '2px solid ' + color,
        borderRadius: 7,
        backgroundColor: 'rgba(220, 220, 220, 0.3)',
        padding: 10,
        textAlign: 'center',
        color: color,
    }

    if (message === null) {
        return null
    }
    
    return(
        <div style={messageStyle}>
            {message}
        </div>
    )
}

export default Notification
