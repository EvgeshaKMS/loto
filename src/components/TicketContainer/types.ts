import { ReactNode } from 'react';

export interface TicketContainerProps {
  children: ReactNode;
  title: string;
  button?: ReactNode;
  onButtonClick?: () => void;
  className?: string;
}
