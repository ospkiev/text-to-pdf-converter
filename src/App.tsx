import React from 'react';
import { useState, useEffect, useRef } from 'react';

import api from './api/api';
import apiUrl from './api/apiUrl';
import TextInput from './components/TextInput';
import PDFViewer from './components/PDFViewer';
import HistoryList from './components/HistoryList';

//TODO: This should move to .env but there is problem with running test via import .meta.env
const apiKey = '78684310-850d-427a-8432-4a6487f6dbc4';

interface HistoryItem {
  id: string;
  url: string;
}

const App = () => {
  const [text, setText] = useState('');
  const [pdfUrl, setPdfUrl] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const saved = localStorage.getItem('pdf-history');
    if (saved) {
      setHistory(JSON.parse(saved));
    }
  }, []);

  const handleConvert = async () => {
    if (text.trim() === '') {
      alert('Будь ласка, введіть текст для конвертації!');
      return;
    }

    try {
      setLoading(true);
      setText('');
      const response = await api.post(`${apiUrl.createPdf}?apiKey=${apiKey}`, {
        text,
      });

      const blob = await response.blob();
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPdfUrl(base64);
        const newItem = { id: Date.now().toString(), url: base64 };
        const updatedHistory = [newItem, ...history];
        setHistory(updatedHistory);
        localStorage.setItem('pdf-history', JSON.stringify(updatedHistory));
      };
      reader.readAsDataURL(blob);
      setTimeout(() => {
        pdfRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleHistoryClick = (url: string) => {
    setPdfUrl(url);
    setTimeout(() => {
      pdfRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className='container mx-auto grid grid-cols-1 lg:grid-cols-[50%_1fr_180px] gap-4'>
      <div>
        <TextInput value={text} onChange={setText} />
        {loading && <p>Конвертація триває...</p>}
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mb-4'
          onClick={handleConvert}
        >
          Конвертувати в PDF
        </button>
      </div>
      <PDFViewer pdfUrl={pdfUrl || ''} />
      <HistoryList history={history} onSelect={handleHistoryClick} />
    </div>
  );
};

export default App;
