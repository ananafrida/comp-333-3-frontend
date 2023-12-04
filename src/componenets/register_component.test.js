import React from "react";
import { render, screen } from "@testing-library/react";
import RegisterComponent from "./register_component.js";

describe("RegisterComponent", () => { 
    test("renders username input field", () => { render(<RegisterComponent />);
    const usernameInput = screen.getByLabelText(/username/i);
    expect(usernameInput).toBeInTheDocument();
    })

    test("renders password input field", () => { render(<RegisterComponent />);
    const passwordInput = screen.getByLabelText(/raw-password/i);
    expect(passwordInput).toBeInTheDocument();
    })

    test("renders confirm password input field", () => { render(<RegisterComponent />);
    const confirmpasswordInput = screen.getByLabelText(/confirm-password/i);
    expect(confirmpasswordInput).toBeInTheDocument();
    })
    // const usernameInput = screen.getByLabelText(/username/i) 
    // expect(usernameInput).toBeInTheDocument() 
    // expect(usernameInput).toHaveAttribute("type", "text") })

    // test("renders password input field", () => { render(<RegisterComponent />) 
    // const passwordInput = screen.getByLabelText(/password/i) 
    // expect(passwordInput).toBeInTheDocument() 
    // expect(passwordInput).toHaveAttribute("type", "password") })

    // test("renders confirm password input field", () => { render(<RegisterComponent />) 
    // const confirmPasswordInput = screen.getByLabelText(/confirm password/i) 
    // expect(confirmPasswordInput).toBeInTheDocument() 
    // expect(confirmPasswordInput).toHaveAttribute("type", "password") 

 })