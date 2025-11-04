import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import WellnessCoach from './WellnessCoach';

describe('WellnessCoach', () => {
  it('renders correctly and shows high workload by default', () => {
    render(<WellnessCoach />);
    expect(screen.getByText('Wellness Check')).toBeInTheDocument();
    expect(screen.getByText('High Workload')).toBeInTheDocument();
    expect(screen.getByText('High Stress Detected')).toBeInTheDocument();
  });

  it('changes workload level when a button is clicked', () => {
    render(<WellnessCoach />);
    
    // Check initial state
    expect(screen.getByText('High Workload')).toBeInTheDocument();
    expect(screen.getByText('High Stress Detected')).toBeInTheDocument();

    // Click 'Medium'
    const mediumButton = screen.getByRole('button', { name: 'Medium' });
    fireEvent.click(mediumButton);

    // Verify state change
    expect(screen.getByText('Medium Workload')).toBeInTheDocument();
    expect(screen.queryByText('High Stress Detected')).not.toBeInTheDocument();
  });

  it('starts and stops a wellness activity', () => {
    render(<WellnessCoach />);
    
    // Find the 'Start' button for 'Desk Stretches'
    const deskStretchContainer = screen.getByText('Desk Stretches').closest('div.flex-1');
    const startButton = deskStretchContainer?.querySelector('button');
    
    if (!startButton) throw new Error('Start button for Desk Stretches not found');

    fireEvent.click(startButton);
    expect(screen.getByText('Desk Stretches in Progress')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Stop' })).toBeInTheDocument();
  });
});