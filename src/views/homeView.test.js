// Importing necessary dependencies from React, testing-library, and react-router-dom
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

// Importing the component to be tested (HomeView in this case)
import HomeView from './homeView';

// Test case: checking navigation to "/create" when the "Create" link is clicked
test('navigates to "/create" when the "Create" link is clicked', () => {
  // Rendering the HomeView component within a Router
  render(
    <Router>
      <HomeView />
    </Router>
  );

  // Retrieving the "Create" link from the rendered component
  const createLink = screen.getByText('Create');
  
  // Simulating a click on the "Create" link
  fireEvent.click(createLink);

  // After clicking the link, asserting that the navigation has occurred
  // by checking the current pathname in the window location
  expect(window.location.pathname).toBe('/create');
});
