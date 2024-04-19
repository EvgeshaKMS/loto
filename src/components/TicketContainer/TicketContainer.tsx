import { TicketContainerProps } from './types';
import styles from './TicketContainer.module.scss';
import clsx from 'clsx';

const TicketContainer = ({
  children,
  title,
  button,
  onButtonClick,
  className = '',
}: TicketContainerProps) => {
  const containerStyles = clsx(styles.container, {
    [className]: className,
  });

  return (
    <div className={containerStyles}>
      <header>
        <h2>{title}</h2>
        {button && <button onClick={onButtonClick}>{button}</button>}
      </header>
      {children}
    </div>
  );
};

export default TicketContainer;
