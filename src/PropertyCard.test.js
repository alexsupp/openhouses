import React from 'react';
import ReactDOM from 'react-dom';
import PropertyCard from './components/PropertyCard';
import mockData from './sample-data.json';

it('renders with metadata', () => {
  const div = document.createElement('div');
  ReactDOM.render(<PropertyCard metadata={mockData[0]} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
