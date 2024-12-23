import React from 'react'

function Input({ label, id, ...props }) {
    return (
        <p className='control'>
            <label htmlFor={id} className="input-label">{label}</label>
            <input 
                id={id} 
                name={id} 
                {...props} 
                required 
                className="input-field" 
                placeholder={`Enter ${label}`} 
            />
        </p>
    )
}

export default Input
