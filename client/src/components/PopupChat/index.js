import * as React from 'react';
import { Unstable_Popup as BasePopup, } from '@mui/base/Unstable_Popup';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faComments, } from '@fortawesome/free-regular-svg-icons';
import { faMinus, } from '@fortawesome/free-solid-svg-icons';

export default function PopupChat() {
  const [anchor, setAnchor,] = React.useState(null);

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  return (
    <div className={'fixed bottom-2 right-6 z-40'}>
      <button
        className='cursor-pointer transition text-sm font-sans font-semibold leading-normal text-white px-3.5 py-3.5 rounded-full border border-solid shadow-sm bg-[#0A61C9] hover:bg-blue-800 active:bg-violet-700 active:shadow-none focus-visible:shadow-[0_0_0_4px_#ddd6fe] dark:focus-visible:shadow-[0_0_0_4px_#a78bfa] focus-visible:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none'
        aria-describedby={id}
        type='button'
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faComments} size='lg'/>
      </button>
      <BasePopup
        id={id}
        open={open}
        anchor={anchor}
        disablePortal
        placement={'top-start'}
        className='z-50 rounded font-sans font-medium text-sm mt-2 p-3 border border-solid border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md text-slate-900 dark:text-slate-100'
        style={{
          top: '45px',
        }}
      >
        <div>
          <div className={'mr-2 mb-2 flex justify-end'} onClick={handleClick}>
            <FontAwesomeIcon icon={faMinus} size={'xl'}/>
          </div>
          <iframe
            src='https://udify.app/chatbot/Vcb3ZgzLqLes2XDw'
            className={'w-[350px] h-[520px] rounded'}
            allow='microphone'>
          </iframe>
        </div>
      </BasePopup>

    </div>
  );
}
