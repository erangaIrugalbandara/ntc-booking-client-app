import React from 'react';
import ViewLayout from './ViewLayout';

const LayoutPreview = ({ layouts, selectedLayout, setSelectedLayout }) => {
  if (!Array.isArray(layouts)) {
    return <div>Error: Layouts data is not an array</div>;
  }

  return (
    <div>
      <h2>Layout Preview</h2>
      <div>
        <label>Select Layout:</label>
        <select value={selectedLayout ? selectedLayout.layoutName : ''} onChange={(e) => {
          const layout = layouts.find(l => l.layoutName === e.target.value);
          setSelectedLayout(layout);
        }}>
          <option value="">Select a layout</option>
          {layouts.map((layout, index) => (
            <option key={index} value={layout.layoutName}>{layout.layoutName}</option>
          ))}
        </select>
      </div>
      {selectedLayout && <ViewLayout layout={selectedLayout} />}
    </div>
  );
};

export default LayoutPreview;