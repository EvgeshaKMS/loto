import { Loader, TicketContainer } from 'components';

import { AfterSubmitMessagesProps } from './types';
import styles from './AfterSubmitMessages.module.scss';

const AfterSubmitMessages = ({
  submitMessage,
  resultMessage,
  isLoading,
}: AfterSubmitMessagesProps) => {
  return (
    <TicketContainer title='Билет 1'>
      <div className={styles.result}>{resultMessage}</div>
      {isLoading && (
        <div className={styles.loader}>
          Пожалуйста, подождите. Идет отправка результатов.
          <Loader />
        </div>
      )}
      {submitMessage && <div>{submitMessage}</div>}
    </TicketContainer>
  );
};

export default AfterSubmitMessages;
