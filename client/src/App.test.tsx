import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { Square, BoardOrientation } from "react-chessboard/dist/chessboard/types";


test('renders learn react link', () => {
  render(<App parentToChild={['']} playerColor="black" playingBot={false}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
