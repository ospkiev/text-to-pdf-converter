import React from 'react';

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
  return (
    <div className='my-4 min-h-[500px]'>
      <iframe
        src={pdfUrl}
        className='w-full h-full'
        title='PDF Viewer'
      ></iframe>
    </div>
  );
};

export default PDFViewer;
