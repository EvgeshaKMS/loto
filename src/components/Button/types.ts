import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

type TTheme = 'outlined' | 'active';
type TSize = 'small' | 'big';

export interface ButtonProps
  extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  theme?: TTheme;
  size?: TSize;
  children?: ReactNode;
}
