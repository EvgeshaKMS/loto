import { useState } from 'react';
import { Button, FieldContainer, TicketContainer, AfterSubmitMessages } from 'components';

import makeRequest from 'hooks/makeRequest';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import {
  onCounterChange,
  onFirstFieldSelect,
  onSecondFieldSelect,
  calculateResult,
  selectRandomNumbers,
  clearField,
} from 'store/reducers/TicketSlice';

import { ReactComponent as IcMagicWand } from './assets/icons/icon_magic-wand.svg';
import { ReactComponent as IcClose } from './assets/icons/icon_close.svg';
import './assets/styles/normalize.scss';
import './assets/styles/theme.scss';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const dispatch = useAppDispatch();
  const { firstField, secondField, isSelectedAll, isResultCalculated, result, isResultSend } =
    useAppSelector((state) => state.ticket);

  const handleSelect = (isFirstField: boolean, index: number) => {
    if (isFirstField) dispatch(onFirstFieldSelect(index));
    else dispatch(onSecondFieldSelect(index));
    dispatch(onCounterChange());
  };

  const resubmit = async () => {
    return await new Promise((resolve, reject) => {
      let count = 2;

      // url нужен для имитации ошибки, для разных ситуаций можно поменять
      // рабочий - https://jsonplaceholder.typicode.com/posts
      let url = 'https://jsonplaceholder.typicode.com/posts1';
      const interval = setInterval(async () => {
        count--;
        const response = await makeRequest({
          body: JSON.stringify(result),
          url: url,
        });

        if (response.ok) {
          resolve('Результат отправлен!');
          setIsLoading(false);
          clearTimeout(interval);
        } else {
          if (count === 0) {
            reject('Произошла ошибка при отправке результата!');
            setIsLoading(false);
            clearTimeout(interval);
          }
          // url нужен для имитации ошибки, для разных ситуаций можно поменять
          // рабочий - https://jsonplaceholder.typicode.com/posts
          url = 'https://jsonplaceholder.typicode.com/posts';
        }
      }, 2000);
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    dispatch(calculateResult());

    const response = await makeRequest({
      body: JSON.stringify(result),
      url: 'https://jsonplaceholder.typicode.com/posts12131',
      // url нужен для имитации ошибки
      // рабочий - https://jsonplaceholder.typicode.com/posts
    });

    if (response.ok) {
      setIsLoading(false);
      return;
    }

    await resubmit()
      .catch((reason) => setSubmitMessage(reason))
      .then((value) => setSubmitMessage(value as string));
  };

  const handleRandomizer = () => {
    dispatch(clearField());
    if (!isSelectedAll) dispatch(selectRandomNumbers());
    dispatch(onCounterChange());
  };

  const randomButton = isSelectedAll ? <IcClose /> : <IcMagicWand />;
  const resultMessage = result.isTicketWon
    ? 'Ого, вы выиграли! Поздравляем!'
    : 'К сожалению, вы ничего не выиграли =(';

  if (isResultCalculated) {
    return (
      <div className='App'>
        <AfterSubmitMessages
          submitMessage={submitMessage}
          isLoading={isLoading}
          resultMessage={resultMessage}
        />
      </div>
    );
  }

  return (
    <div className='App'>
      <TicketContainer onButtonClick={handleRandomizer} button={randomButton} title='Билет 1'>
        <div>
          <FieldContainer fieldName='Поле 1' subName='Отметьте 8 чисел.'>
            {firstField.map((button, index) => (
              <Button
                onClick={() => handleSelect(true, index)}
                theme={button.isSelected ? 'active' : 'outlined'}
                key={button.number}
              >
                {button.number}
              </Button>
            ))}
          </FieldContainer>
          <FieldContainer fieldName='Поле 2' subName='Отметьте 1 число.'>
            {secondField.map((button, index) => (
              <Button
                onClick={() => handleSelect(false, index)}
                theme={button.isSelected ? 'active' : 'outlined'}
                key={button.number}
              >
                {button.number}
              </Button>
            ))}
          </FieldContainer>
        </div>
        <Button disabled={!isSelectedAll} onClick={handleSubmit} size='big'>
          Показать результат
        </Button>
      </TicketContainer>
    </div>
  );
}

export default App;
