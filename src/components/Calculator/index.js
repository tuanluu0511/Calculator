import { useState } from 'react';
import { Button, Container, Current, Previous, Screen } from './Styled';

export default function Calculator() {
  const [current, setCurrent] = useState('0');
  const [previous, setPrevious] = useState('0');
  const [operation, setOperation] = useState('');

  const appendValueHandler = (e) => {
    const value = e.target.getAttribute('data');

    if (value === '.' && current.includes('.')) return;
    if (current !== '0') {
      setCurrent(current + value);
    }
    if (current === '0') {
      setCurrent(value);
    }
  };

  const deleteHandler = (e) => {
    if (current.trim().length === 1) {
      setCurrent('0');
      return;
    }
    setCurrent(current.slice(0, -1));
  };

  const allClearHandler = (e) => {
    setCurrent('0');
    setPrevious('0');
    setOperation('');
  };

  const compute = () => {
    let result;
    let previousNumber = parseFloat(previous);
    let currentNumber = parseFloat(current);
    if (isNaN(previousNumber) || isNaN(currentNumber)) return;
    switch (operation) {
      case '+':
        result = previousNumber + currentNumber;
        break;
      case '-':
        result = previousNumber - currentNumber;
        break;
      case '*':
        result = previousNumber * currentNumber;
        break;
      case '/':
        result = previousNumber / currentNumber;
        break;
      default:
        return;
    }
    return result;
  };

  const operationHandler = (e) => {
    const operationSign = e.target.getAttribute('data');
    console.log('click');
    if (current === '0') return;
    if (previous === '0') {
      setPrevious(current);
    } else {
      let value = compute();
      setPrevious(value);
    }

    setOperation(operationSign);
    setCurrent('0');
  };

  const equals = () => {
    let value = compute();
    if (value === undefined || value == null) return;
    setCurrent(value);
    setPrevious('0');
    setOperation('');
  };

  return (
    <Container>
      <Screen>
        <Previous>
          {previous} {operation}
        </Previous>
        <Current defaultValue={current}>{current}</Current>
      </Screen>
      <Button gridSpan={2} control onClick={allClearHandler}>
        AC
      </Button>
      <Button control onClick={deleteHandler}>
        DEL
      </Button>
      <Button operation data={'/'} onClick={operationHandler}>
        ÷
      </Button>
      <Button data={'7'} onClick={appendValueHandler}>
        7
      </Button>
      <Button data={'8'} onClick={appendValueHandler}>
        8
      </Button>
      <Button data={'9'} onClick={appendValueHandler}>
        9
      </Button>
      <Button operation data={'*'} onClick={operationHandler}>
        x
      </Button>
      <Button data={'4'} onClick={appendValueHandler}>
        4
      </Button>
      <Button data={'5'} onClick={appendValueHandler}>
        5
      </Button>
      <Button data={'6'} onClick={appendValueHandler}>
        6
      </Button>
      <Button operation data={'+'} onClick={operationHandler}>
        +
      </Button>
      <Button data={'1'} onClick={appendValueHandler}>
        1
      </Button>
      <Button data={'2'} onClick={appendValueHandler}>
        2
      </Button>
      <Button data={'3'} onClick={appendValueHandler}>
        3
      </Button>
      <Button operation data={'-'} onClick={operationHandler}>
        -
      </Button>
      <Button period data={'.'} onClick={appendValueHandler}>
        .
      </Button>
      <Button data={'0'} onClick={appendValueHandler}>
        0
      </Button>
      <Button equals gridSpan={2} onClick={equals}>
        =
      </Button>
    </Container>
  );
}
