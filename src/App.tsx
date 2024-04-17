import { Button, FieldContainer, TicketContainer } from 'components';

import { useAppDispatch, useAppSelector } from './hooks/redux';
import {
  onCounterChange,
  onFirstFieldSelect,
  onSecondFieldSelect,
  onSubmit,
} from './store/reducers/TicketSlice';

import { ReactComponent as IcMagicWand } from './assets/icons/icon_magic-wand.svg';
import { ReactComponent as IcClose } from './assets/icons/icon_close.svg';
import './assets/styles/normalize.scss';
import './assets/styles/theme.scss';

function App() {
  const dispatch = useAppDispatch();
  const { firstField, secondField, isSelectedAll } = useAppSelector((state) => state.ticket);

  const handleSelect = (isFirstField: boolean, index: number) => {
    if (isFirstField) dispatch(onFirstFieldSelect(index));
    else dispatch(onSecondFieldSelect(index));
    dispatch(onCounterChange());
  };

  const handleSubmit = () => {
    dispatch(onSubmit());
  };

  const randomButton = isSelectedAll ? <IcClose /> : <IcMagicWand />;

  return (
    <div className='App'>
      <TicketContainer button={randomButton} title='Билет 1'>
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
        <Button onClick={handleSubmit} size='big'>
          Показать результат
        </Button>
      </TicketContainer>
    </div>
  );
}

export default App;
