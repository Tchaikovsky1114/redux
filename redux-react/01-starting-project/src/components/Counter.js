import { useState } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import classes from './Counter.module.css';

//Counter.js에 전역 액션 객체를 불러와서 사용하겠다는 뜻.
import {counterActions} from '../store/counterSlice'

const Counter = () => {
  //store에 action을 보낸다
  const dispatch = useDispatch();
  // UseSelector
  // 원하는 값만 선택할 수 있게 한다.
  // 자동으로 구독을 관리한다.
  // state.counter(store의 reducer에 저장된 mapping된 이름).counter(initialState의 프로퍼티 키 counter)
  const counter = useSelector(state => state.counter.counter);
  // state.counter(store의 reducer에 저장된 mapping된 이름).counter(initialState의 프로퍼티 키 showCounter)
  const show = useSelector(state => state.counter.showCounter);

  const [value,setValue] = useState(0);

  const incrementHandler = () => {
    dispatch(counterActions.increment());
  };

  const decrementHandler = () => {
    dispatch(counterActions.decrement());
  }
  const onChange = ({target}) => {
    if(!target.value){
      
      return;
    }else{
      setValue(parseInt(target.value))
    };
  
  }

  const increaseHandler = () => {
    //payload가 필요하다면 인수로 전달해준다.
    // 자동으로 액션 생성자를 생성하고 type: SOME-unique-identifier를 전달하고
    // 인자로서 실행하고자 하는 액션 메서드에 전달한 값을
    // 추가 필드명이 payload인 곳에 저장하기 때문입니다.
    dispatch(counterActions.increase(value))
  }

  const toggleCounterHandler = () => {
    dispatch(counterActions.toggoleCounter())
  };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      {show && <div className={classes.value}>{counter}</div>}
      
      <input type="text" value={value} onChange={onChange}/>
      
      <div>
        <button onClick={incrementHandler}>Increment</button>
        <button onClick={increaseHandler}>Increment by inputValue</button>
        <button onClick={decrementHandler}>Decrement</button>
      </div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
