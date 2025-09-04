import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, incrementByAmount } from '../redux/features/counterSlice';

function Counter() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="text-center p-6">
      <h2 className="text-2xl font-bold mb-4">Redux Counter Example</h2>
      <div className="text-4xl font-bold mb-4">{count}</div>
      <div className="space-x-4">
        <button
          onClick={() => dispatch(decrement())}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Decrease
        </button>
        <button
          onClick={() => dispatch(increment())}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Increase
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(5))}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Add 5
        </button>
      </div>
    </div>
  );
}

export default Counter;
