import { Button, FieldContainer, TicketContainer } from 'components';

import { ReactComponent as IcMagicWand } from './assets/icons/icon_magic-wand.svg';
import './assets/styles/normalize.scss';
import './assets/styles/theme.scss';

function App() {
  const firstFieldButtons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const secondFieldButtons = [1, 2];
  return (
    <div className='App'>
      <TicketContainer button={<IcMagicWand />} title='Билет 1'>
        <div>
          <FieldContainer fieldName='Поле 1' subName='Отметьте 8 чисел.'>
            {firstFieldButtons.map((number) => (
              <Button key={number}>{number}</Button>
            ))}
          </FieldContainer>
          <FieldContainer fieldName='Поле 2' subName='Отметьте 1 число.'>
            {secondFieldButtons.map((number) => (
              <Button key={number}>{number}</Button>
            ))}
          </FieldContainer>
        </div>
        <Button size='big'>Показать результат</Button>
      </TicketContainer>
    </div>
  );
}

export default App;
