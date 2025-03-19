import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const renderWithRouter = (component: React.ReactElement) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

describe('App Component', () => {
  test('renders navigation links', () => {
    renderWithRouter(<App />);
    
    // Check if navigation links are present
    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Instagram')).toBeInTheDocument();
    expect(screen.getByText('WhatsApp')).toBeInTheDocument();
    expect(screen.getByText('Leads')).toBeInTheDocument();
  });

  test('renders dashboard by default', () => {
    renderWithRouter(<App />);
    expect(screen.getByText('Marketing Automation Dashboard')).toBeInTheDocument();
  });
}); 