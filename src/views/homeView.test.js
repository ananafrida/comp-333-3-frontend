//this is for 4.2(b)
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import HomeView from './homeView';

test('navigates to "/create" when the "Create" link is clicked', () => {
  render(
    <Router>
      <HomeView />
    </Router>
  );

  const createLink = screen.getByText('Create');
  fireEvent.click(createLink);

  // After clicking the link, you can assert that the navigation has occurred
  expect(window.location.pathname).toBe('/create');
});

// test('renders HomeView component', () => {
//   render(
//     <Router>
//       <HomeView />
//     </Router>
//   );

//   // You can add more specific assertions based on your UI
//   expect(screen.getByText('Search by Artist')).toBeInTheDocument();
// });