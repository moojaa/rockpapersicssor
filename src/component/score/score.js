import React from 'react'

const score = (props) => {
    return (
        <div className='d-flex flex-column my-1'>
            <h5 className='text-center'>{props.name}</h5>
            <div className='bg-white text-black py-1 rounded text-center'>
                {props.score}
            </div>
        </div>
    )
}

export default score