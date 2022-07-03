import React from 'react'

const Card = (props) => {
  return (
    <>
        <div className="card p-3">
            <div className="card-body text-center">
                <i className={props.font}></i>
                <h5 className="card-title mb-3 fs-4 fw-bold">{props.title}</h5>
                <p className="card-text lead">{props.content}</p>
                
            </div>
        </div>
    </>
  )
}

export default Card;
