import { useState } from 'react';

export default function LightSwitch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div
      className={`flex flex-col items-center gap-4 p-8 rounded-lg transition-colors ${
        isOn ? 'bg-yellow-300' : 'bg-gray-400'
      }`}
    >
      <div className="text-8xl">
        {isOn ? '💡' : '🌙'}
      </div>
      <button
        onClick={() => setIsOn(!isOn)}
        className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
          isOn
            ? 'bg-gray-700 hover:bg-gray-800 text-white'
            : 'bg-yellow-500 hover:bg-yellow-600 text-gray-900'
        }`}
      >
        {isOn ? 'Turn Off' : 'Turn On'}
      </button>
    </div>
  );
}
