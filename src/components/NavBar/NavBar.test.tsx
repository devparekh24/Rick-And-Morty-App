import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar';
import { ThemeProvider } from '@mui/material/styles';
import { lightTheme, darkTheme } from '../../utils/theme/index';

describe('NavBar Component', () => {
    test('renders NavBar with initial elements', () => {
        render(
            <Router>
                <ThemeProvider theme={lightTheme}>
                    <NavBar darkMode={false} handleThemeChange={() => { }} />
                </ThemeProvider>
            </Router>
        );

        // Check if title is present
        expect(screen.getByText(/Rick and Morty/i)).toBeInTheDocument();

        // Check if navigation buttons are present
        expect(screen.getByText(/Characters/i)).toBeInTheDocument();
        expect(screen.getByText(/Episodes/i)).toBeInTheDocument();
        expect(screen.getByText(/Locations/i)).toBeInTheDocument();

        // Check if theme toggle button is present
        expect(screen.getByLabelText(/toggle theme/i)).toBeInTheDocument();
    });

    test('opens and closes drawer on menu button click', async () => {
        render(
            <Router>
                <ThemeProvider theme={lightTheme}>
                    <NavBar darkMode={false} handleThemeChange={() => { }} />
                </ThemeProvider>
            </Router>
        );

        // Open drawer
        fireEvent.click(screen.getByLabelText(/menu/i));
        expect(screen.getByLabelText(/close/i)).toBeInTheDocument();

        // Close drawer
        fireEvent.click(screen.getByLabelText(/close/i));

        // Wait for the close button to be removed from the DOM
        await waitFor(() => {
            expect(screen.queryByLabelText(/close/i)).not.toBeInTheDocument();
        });
    });

    test('toggles theme icons based on darkMode state', () => {
        const { rerender } = render(
            <Router>
                <ThemeProvider theme={lightTheme}>
                    <NavBar darkMode={false} handleThemeChange={() => { }} />
                </ThemeProvider>
            </Router>
        );

        // Check for light mode icon
        expect(screen.getByLabelText(/toggle theme/i)).toBeInTheDocument();

        rerender(
            <Router>
                <ThemeProvider theme={darkTheme}>
                    <NavBar darkMode={true} handleThemeChange={() => { }} />
                </ThemeProvider>
            </Router>
        );

        // Check for dark mode icon
        expect(screen.getByLabelText(/toggle theme/i)).toBeInTheDocument();
    });

    test('navigates to correct routes', () => {
        render(
            <Router>
                <ThemeProvider theme={lightTheme}>
                    <NavBar darkMode={false} handleThemeChange={() => { }} />
                </ThemeProvider>
            </Router>
        );

        // Check if navigation links are present
        expect(screen.getByRole('link', { name: /Characters/i })).toHaveAttribute('href', '/character');
        expect(screen.getByRole('link', { name: /Episodes/i })).toHaveAttribute('href', '/episode');
        expect(screen.getByRole('link', { name: /Locations/i })).toHaveAttribute('href', '/location');
    });

    test('responsive behavior of navigation buttons', () => {
        render(
            <Router>
                <ThemeProvider theme={lightTheme}>
                    <NavBar darkMode={false} handleThemeChange={() => { }} />
                </ThemeProvider>
            </Router>
        );

        // Test visibility of navigation buttons
        expect(screen.getByText(/Characters/i)).toBeInTheDocument();
        expect(screen.getByText(/Episodes/i)).toBeInTheDocument();
        expect(screen.getByText(/Locations/i)).toBeInTheDocument();

        // Test menu icon visibility on small screens
        expect(screen.getByLabelText(/menu/i)).toBeInTheDocument();
    });
});
