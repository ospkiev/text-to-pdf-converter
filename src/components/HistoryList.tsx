import React from 'react';

interface HistoryItem {
  id: string;
  url: string;
}

interface HistoryListProps {
  history: HistoryItem[];
  onSelect: (url: string) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, onSelect }) => {
  return (
    <div>
      <h2 className='text-xl font-semibold mb-2'>Історія:</h2>
      <ul className='space-y-2'>
        {history.map((item) => (
          <li key={item.id}>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4'
              onClick={() => onSelect(item.url)}
            >
              №{item.id}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;
