import { ReactNode } from 'react';

export interface FieldContainerProps {
  children: ReactNode;
  fieldName: string;
  subName?: string;
}
