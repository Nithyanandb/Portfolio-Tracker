
// Unit tests for: NavigationMenu

import NavigationMenu from '../NavigationMenu';


import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';


// Mocking the cn function
jest.mock("../../../utils/cn", () => {
  const actual = jest.requireActual("../../../utils/cn");
  return {
    ...actual,
    cn: jest.fn(),
  };
});

// Mocking the useAuth hook
// jest.mock("../../../hooks/useAuth", () => ({
//   useAuth: jest.fn(),
// }));

// Mocking the AuthModal component

// jest.mock("../../Auth/AuthModal", () => MockAuthModal);

describe('NavigationMenu() NavigationMenu method', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Happy Paths', () => {
    it('should render the navigation menu with all items', () => {
      // Mocking useAuth to return authenticated state
      jest.mocked(useAuth).mockReturnValue({ isAuthenticated: true } as any);

      render(<NavigationMenu className="test-class" />);

      // Check if all main navigation items are rendered
      expect(screen.getByText('Markets')).toBeInTheDocument();
      expect(screen.getByText('Trading')).toBeInTheDocument();
      expect(screen.getByText('Learn')).toBeInTheDocument();
      expect(screen.getByText('About')).toBeInTheDocument();
    });

    it('should open the auth modal when trying to navigate while not authenticated', () => {
      // Mocking useAuth to return unauthenticated state
      jest.mocked(useAuth).mockReturnValue({ isAuthenticated: false } as any);

      render(<NavigationMenu className="test-class" />);

      // Simulate clicking a navigation link
      fireEvent.click(screen.getByText('Markets'));

      // Check if the auth modal is opened
      expect(screen.getByTestId('auth-modal')).toBeInTheDocument();
    });

    it('should navigate to the pending link after successful authentication', () => {
      // Mocking useAuth to return unauthenticated state
      jest.mocked(useAuth).mockReturnValue({ isAuthenticated: false } as any);

      render(<NavigationMenu className="test-class" />);

      // Simulate clicking a navigation link
      fireEvent.click(screen.getByText('Markets'));

      // Simulate successful authentication
      fireEvent.click(screen.getByText('Success'));

      // Check if the window location is updated
      expect(window.location.href).toContain('/');
    });
  });

  describe('Edge Cases', () => {
    it('should handle mouse enter and leave events correctly', () => {
      jest.mocked(useAuth).mockReturnValue({ isAuthenticated: true } as any);

      render(<NavigationMenu className="test-class" />);

      const marketsItem = screen.getByText('Markets');

      // Simulate mouse enter
      fireEvent.mouseEnter(marketsItem);
      expect(marketsItem).toHaveClass('hovered');

      // Simulate mouse leave
      fireEvent.mouseLeave(marketsItem);
      expect(marketsItem).not.toHaveClass('hovered');
    });

    it('should close the auth modal when close button is clicked', () => {
      jest.mocked(useAuth).mockReturnValue({ isAuthenticated: false } as any);

      render(<NavigationMenu className="test-class" />);

      // Simulate clicking a navigation link
      fireEvent.click(screen.getByText('Markets'));

      // Simulate closing the auth modal
      fireEvent.click(screen.getByText('Close'));

      // Check if the auth modal is closed
      expect(screen.queryByTestId('auth-modal')).not.toBeInTheDocument();
    });
  });
});

// End of unit tests for: NavigationMenu
