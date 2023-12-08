// Importing necessary dependencies for testing React components
import React from "react";
import { render, screen } from "@testing-library/react";

// Importing the RegisterComponent to be tested
import RegisterComponent from "./register_component.js";

// Describe block for grouping related test cases for RegisterComponent
describe("RegisterComponent", () => {
    // Test case: checking if the username input field is rendered
    test("renders username input field", () => {
        // Rendering the RegisterComponent
        render(<RegisterComponent />);
        
        // Retrieving the username input field using the label text
        const usernameInput = screen.getByLabelText(/username/i);
        
        // Asserting that the username input field is present in the rendered component
        expect(usernameInput).toBeInTheDocument();
    });

    // Test case: checking if the password input field is rendered
    test("renders password input field", () => {
        // Rendering the RegisterComponent
        render(<RegisterComponent />);
        
        // Retrieving the password input field using the label text
        const passwordInput = screen.getByLabelText(/raw-password/i);
        
        // Asserting that the password input field is present in the rendered component
        expect(passwordInput).toBeInTheDocument();
    });

    // Test case: checking if the confirm password input field is rendered
    test("renders confirm password input field", () => {
        // Rendering the RegisterComponent
        render(<RegisterComponent />);
        
        // Retrieving the confirm password input field using the label text
        const confirmPasswordInput = screen.getByLabelText(/confirm-password/i);
        
        // Asserting that the confirm password input field is present in the rendered component
        expect(confirmPasswordInput).toBeInTheDocument();
    });
});
