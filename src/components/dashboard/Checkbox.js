import React from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Checkbox = ({ className = '', checked = false, onChange, ...props }) => {
  return (
    <div 
      className={`inline-flex mr-4 items-center justify-center w-4 h-4 cursor-pointer ${className}`}
      onClick={onChange} // Click event passed down from parent, with propagation handled there
      role="button"
      aria-pressed={checked}
      tabIndex={0}
      {...props}
    >
      <div
        className={`w-full h-full rounded-full p-1 ${
          checked ? 'bg-gradient-to-r from-blue-300 to-cyan-400' : 'bg-white border-2 border-zinc-300'
        } flex items-center justify-center`}
      >
        <FontAwesomeIcon 
          icon={faCheck} 
          className={`text-white w-full ${checked ? 'opacity-100' : 'opacity-0'}`} 
        />
      </div>
    </div>
  );
};

export default Checkbox;
