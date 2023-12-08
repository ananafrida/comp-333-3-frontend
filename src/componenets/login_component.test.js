import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginComponent from './login_component.js';
import { BrowserRouter } from "react-router-dom";

describe('LoginComponent', () => {
  test('renders username and password input fields', () => {
    render(<LoginComponent />);

    const usernameInput = screen.getByLabelText(/username/i);
    const passwordInput = screen.getByLabelText(/password/i);

    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
  });

  test('simulates user input and login button click with correct values', () => {
    render(
      <BrowserRouter>
        <LoginComponent />
      </BrowserRouter>
    );

    // Simulate typing into the username input field
    const usernameInput = screen.getByLabelText(/username/i);
    fireEvent.change(usernameInput, { target: { value: 'testuser' } });

    // Simulate typing into the password input field
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

    // Simulate clicking the login button
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

  });


  test('simulates user input and login button click with incorrect values', async () => {
    render(
      <BrowserRouter>
        <LoginComponent />
      </BrowserRouter>
    );

    // Simulate typing into the username input field
    const usernameInput = screen.getByLabelText(/username/i);
    fireEvent.change(usernameInput, { target: { value: 'incorrectuser' } });

    // Simulate typing into the password input field
    const passwordInput = screen.getByLabelText(/password/i);
    fireEvent.change(passwordInput, { target: { value: 'incorrectpassword' } });

    // Simulate clicking the login button
    const loginButton = screen.getByRole('button', { name: /login/i });
    fireEvent.click(loginButton);

    // Wait for the asynchronous login function to finish
    await waitFor(() => {
      // Add assertions for failed login (adjust based on your implementation)
      // For example, check if the login failed by verifying the presence of error messages
      const errorMessage = screen.getByTestId(/Login failed/i);
      expect(errorMessage).toBeInTheDocument();
    });
  });

});