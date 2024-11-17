import * as React from 'react';
import { Unstable_Popup as BasePopup, } from '@mui/base/Unstable_Popup';
import { useTheme, } from '@mui/system';
import { FontAwesomeIcon, } from '@fortawesome/react-fontawesome';
import { faComments, } from '@fortawesome/free-regular-svg-icons';

function useIsDarkMode() {
  const theme = useTheme();
  return theme.palette.mode === 'dark';
}

export default function PopupChat() {
  const isDarkMode = useIsDarkMode();
  const [anchor, setAnchor,] = React.useState(null);

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  const open = Boolean(anchor);
  const id = open ? 'simple-popup' : undefined;

  return (
    <div className={`${isDarkMode ? 'dark' : undefined} fixed bottom-8 right-16 z-40`}>
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
        className='z-50 rounded-lg font-sans font-medium text-sm mt-2 mr-16 p-3 border border-solid border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-md text-slate-900 dark:text-slate-100'
      >
        <iframe
          src='https://udify.app/chatbot/Vcb3ZgzLqLes2XDw'
          className={'w-[400px] h-[400px] rounded'}
          allow='microphone'>
        </iframe>
      </BasePopup>
    </div>
  );
}
