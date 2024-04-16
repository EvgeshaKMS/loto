import styles from './FieldContainer.module.scss';
import { FieldContainerProps } from './types';

const FieldContainer = ({ children, fieldName, subName }: FieldContainerProps) => {
  return (
    <div className={styles.container}>
      <section>
        <h3>{fieldName}</h3>
        {subName && <span>{subName}</span>}
      </section>
      <section>{children}</section>
    </div>
  );
};

export default FieldContainer;
