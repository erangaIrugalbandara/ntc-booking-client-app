import React from 'react';
import Generator from '../components/Generator';
import LayoutPreview from '../components/LayoutPreview';

const LayoutGeneratorPage = ({ layouts, setLayouts, selectedLayout, setSelectedLayout }) => {
  return (
    <div>
      <h1>Layout Generator</h1>
      <Generator setLayouts={setLayouts} />
      <LayoutPreview layouts={layouts} selectedLayout={selectedLayout} setSelectedLayout={setSelectedLayout} />
    </div>
  );
};

export default LayoutGeneratorPage;