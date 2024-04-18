import { Button, FieldContainer, TicketContainer } from 'components';

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
  const dispatch = useAppDispatch();
  const { firstField, secondField, isSelectedAll, isResultCalculated, result } = useAppSelector(
    (state) => state.ticket,
  );
// todo: добавить отправку результата
  const handleSelect = (isFirstField: boolean, index: number) => {
    if (isFirstField) dispatch(onFirstFieldSelect(index));
    else dispatch(onSecondFieldSelect(index));
    dispatch(onCounterChange());
  };

  const handleSubmit = () => {
    dispatch(calculateResult());
  };

  const handleRandomizer = () => {
    dispatch(clearField());
    if (!isSelectedAll) dispatch(selectRandomNumbers());
    dispatch(onCounterChange());
  };

  const randomButton = isSelectedAll ? <IcClose /> : <IcMagicWand />;

  if (isResultCalculated) {
    return (
      <div className='App'>
        <TicketContainer title='Билет 1'>
          <div>
            {result.isTicketWon
              ? 'Ого, вы выиграли! Поздравляем!'
              : 'К сожалению, вы ничего не выиграли =('}
          </div>
          {/* <div>Пожалуйста, подождите. Идет отправка результатов.</div> */}
        </TicketContainer>
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
