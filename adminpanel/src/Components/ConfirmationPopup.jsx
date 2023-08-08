import { Link } from 'react-router-dom';

const ConfirmationPopup = ({  onCancel, confmessage }) => {
  
  return (
    <div className="  h-fit sticky w-fit top-72 left-[60px] sm:left-[400px] flex items-center justify-center border-2 pb-2 pt-4 px-4 bg-gray-400 dark:bg-slate-900 dark:border-stone-900 text-white dark:text-gray-400">
      <div className="popup-content">
        <h2 className='sm:text-lg p-1'>{confmessage}</h2>
        <div className="flex justify-around p-3">
          <Link >
          
          <button className='hover:bg-orange-600 border-2 hover:border-orange-600 hover:text-white   p-1 sm:w-[100px] rounded-sm' onClick={onCancel}>Okay</button>
          </Link>
           </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;