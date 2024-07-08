'use client'
// components/EpubReader.js
import React, { useState, useRef } from 'react';
import { EpubView, IEpubViewProps, ReactReader } from 'react-reader';

const EpubReader = ({ fileUrl }) => {
  const [location, setLocation] = useState(0);
  const renditionRef = useRef(null);

  const onLocationChange = (epubcifi) => {
    setLocation(epubcifi);
  };

  return (
    <div style={{ height: '100vh' }}>
      {/* <EpubView
        url={fileUrl}
        location={location}
        locationChanged={onLocationChange}
        ref={renditionRef}
        styles={{
          readerArea: {
            maxWidth: '800px',
            margin: '0 auto',
            backgroundColor: '#f5f5f5',
          },
        }}
      /> */}

      {/* <div style={{ height: '100vh' }}> */}
        <ReactReader
          url={fileUrl}
          location={location}
          locationChanged={onLocationChange}
        />
      {/* </div> */}
    </div>
  );
};

export default EpubReader;
