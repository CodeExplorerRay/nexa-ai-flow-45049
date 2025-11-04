import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react'; // This line is already correct.
import PrivacyControls from './PrivacyControls';

describe('PrivacyControls', () => {
  it('renders the initial state correctly', () => {
    render(<PrivacyControls />);
    expect(screen.getByText('Privacy Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Local AI Processing')).toBeInTheDocument();
    // Check if the switch for local processing is on by default
    const localProcessingSwitch = screen.getAllByRole('button').find(btn => btn.textContent?.includes('Local AI Processing'));
    expect(localProcessingSwitch?.nextElementSibling?.getAttribute('class')).toContain('bg-blue-600');
  });

  it('toggles a privacy setting when clicked', () => {
    render(<PrivacyControls />);
    
    // Find the button associated with 'Anonymous Usage Analytics'
    const analyticsSettingContainer = screen.getByText('Anonymous Usage Analytics').closest('div.flex.items-center.justify-between');
    const toggleButton = analyticsSettingContainer?.querySelector('button');

    if (!toggleButton) throw new Error('Toggle button not found');

    // Initially, it should be off
    expect(toggleButton.getAttribute('class')).toContain('bg-gray-200');

    // Click to toggle it on
    fireEvent.click(toggleButton);
    expect(toggleButton.getAttribute('class')).toContain('bg-blue-600');

    // Click to toggle it off again
    fireEvent.click(toggleButton);
    expect(toggleButton.getAttribute('class')).toContain('bg-gray-200');
  });

  it('changes the data retention period', () => {
    render(<PrivacyControls />);
    const select = screen.getByLabelText('Data Retention Period') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: '1-year' } });
    expect(select.value).toBe('1-year');
  });
});