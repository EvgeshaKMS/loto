import clsx from 'clsx';

import { ButtonProps } from './types';
import styles from './Button.module.scss';

const Button = ({
  theme = 'outlined',
  className = '',
  children,
  color = 'blue',
  size='small',
  ...props
}: ButtonProps) => {
  const buttonStyle: string = clsx(styles.button, {
    [className]: className,
    [styles.active]: theme === 'active',
    [styles.big]: size === 'big',
  });

  return (
    <button className={buttonStyle} {...props}>
      {children}
    </button>
  );
};

export default Button;
