import { TicketContainerProps } from './types';
import styles from './TicketContainer.module.scss';

const TicketContainer = ({ children, title, button, onButtonClick }: TicketContainerProps) => {
  const handleButtonClick = () => {
    if (onButtonClick) onButtonClick();
  };

  return (
    <div className={styles.container}>
      <header>
        <h2>{title}</h2>
        {button && <button onClick={handleButtonClick}>{button}</button>}
      </header>
      {children}
    </div>
  );
};

export default TicketContainer;
