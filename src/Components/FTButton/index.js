import React from 'react';
import './index.scss';

const FTButton = (props) => {
  let { title, type, onClick, hidden, onChange, className, borderColor, bgColor, loading, disabled } = props

  return (
    <div className="btnComponentMain">
      <button disabled={disabled} type={type} onClick={onClick} className={hidden ? 'noEmployee' : (disabled ? 'greyBtn' : 'yellowBtn')}>
       {title}
      </button>
    </div>
  );
}

FTButton.defaultProps = {
  disabled: false,
  hidden: false
}


export default FTButton;
