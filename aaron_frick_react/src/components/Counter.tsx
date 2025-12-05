import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white shadow-lg rounded-lg w-64">
      <h2 className="text-2xl font-bold">Counter</h2>
      <div className="text-5xl font-bold text-blue-600">{count}</div>
      <div className="flex gap-3">
        <button
          onClick={() => setCount(count + 1)}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded transition-colors"
        >
          ➕ Increase
        </button>
        <button
          onClick={() => setCount(count - 1)}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-6 py-2 rounded transition-colors"
        >
          ➖ Decrease
        </button>
      </div>
    </div>
  );
}
