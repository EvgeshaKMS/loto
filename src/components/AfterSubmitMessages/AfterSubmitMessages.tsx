import { Loader, TicketContainer } from 'components';

import { AfterSubmitMessagesProps } from './types';
import styles from './AfterSubmitMessages.module.scss';

const AfterSubmitMessages = ({
  submitMessage,
  resultMessage,
  isLoading,
}: AfterSubmitMessagesProps) => {
  return (
    <TicketContainer className={styles.container} title='Билет 1'>
      <div className={styles.result}>{resultMessage}</div>
      {isLoading && (
        <div className={styles.submit}>
          Пожалуйста, подождите. Идет отправка результатов.
          <Loader />
        </div>
      )}
      {submitMessage && <div className={styles.submit}>{submitMessage}</div>}
    </TicketContainer>
  );
};

export default AfterSubmitMessages;
