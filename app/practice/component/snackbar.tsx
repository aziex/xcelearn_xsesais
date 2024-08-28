import * as React from 'react';
import { Transition } from 'react-transition-group';
import { styled } from '@mui/system';
import ReplayIcon from '@mui/icons-material/Replay';
import CloseIcon from '@mui/icons-material/Close';
import { Snackbar } from '@mui/base/Snackbar';
import { SnackbarCloseReason } from '@mui/base/useSnackbar';

const SnackbarContent = styled('div')(
  () => `
    display: flex;
    flex-grow: 1;
    gap: 8px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 8px;
    border: 1px solid #DAE2ED;
    box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
    padding: 0.75rem;
    color: #1C2025;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 500;
    text-align: start;
    position: relative;
  
    & .snackbar-message {
      flex: 1 1 0%;
      max-width: 100%;
    }
  
    & .snackbar-title {
      margin: 0;
      line-height: 1.5rem;
      margin-right: 0.5rem;
      text-align: left;
    }
  
    & .snackbar-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: #434D5B;
      text-align: left;
    }
  
    & .snackbar-close-icon {
      cursor: pointer;
      flex-shrink: 0;
      padding: 2px;
      border-radius: 4px;
  
      &:hover {
        background: #F3F6F9;
      } 
    }
  `
);

const positioningStyles = {
  entering: 'translateX(0)',
  entered: 'translateX(0)',
  exiting: 'translateX(500px)',
  exited: 'translateX(500px)',
  unmounted: 'translateX(500px)',
};

const StyledSnackbar = styled(Snackbar)`
  position: fixed;
  z-index: 5500;
  display: flex;
  bottom: 16px;
  right: 16px;
  max-width: 560px;
  min-width: 300px;
`;

interface SimpleSnackbarProps {
  open: boolean;
  onClose: (
    event: React.SyntheticEvent<any> | null,
    reason?: SnackbarCloseReason
  ) => void;
  title: string;
  message: string;
}

export default function SimpleSnackbar({
  open,
  onClose,
  title,
  message,
}: SimpleSnackbarProps) {
  const [exited, setExited] = React.useState(true);
  const nodeRef = React.useRef<HTMLDivElement>(null);

  const handleOnEnter = () => {
    setExited(false);
  };

  const handleOnExited = () => {
    setExited(true);
  };

  return (
    <StyledSnackbar
      autoHideDuration={3000}
      open={open}
      close={onClose}
      exited={exited}
    >
      <Transition
        timeout={{ enter: 400, exit: 400 }}
        in={open}
        appear
        unmountOnExit
        onEnter={handleOnEnter}
        onExited={handleOnExited}
        nodeRef={nodeRef}
      >
        {(status) => (
          <SnackbarContent
            style={{
              transform: positioningStyles[status],
              transition: 'transform 300ms ease',
            }}
            ref={nodeRef}
          >
            <div className="snackbar-message">
              <p className="snackbar-title">{title}</p>
              <p className="snackbar-description">{message}</p>
            </div>
            <CloseIcon onClick={onClose} className="snackbar-close-icon" />
          </SnackbarContent>
        )}
      </Transition>
    </StyledSnackbar>
  );
}
