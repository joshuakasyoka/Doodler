import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const meta: Meta<typeof IconButton> = {
  title: 'Components/IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'small'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconButton>;

const SampleIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
  </svg>
);

export const Default: Story = {
  args: {
    'aria-label': 'Icon button',
    children: <SampleIcon />,
    size: 'large',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton size="large" aria-label="Large icon button">
        <SampleIcon />
      </IconButton>
      <IconButton size="small" aria-label="Small icon button">
        <SampleIcon />
      </IconButton>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <IconButton aria-label="Default icon button">
        <SampleIcon />
      </IconButton>
      <IconButton aria-label="Disabled icon button" disabled>
        <SampleIcon />
      </IconButton>
    </div>
  ),
};

export const Matrix: Story = {
  render: () => {
    const sizes: Array<'large' | 'small'> = ['large', 'small'];
    const states = [false, true]; // disabled

    const icons = [
      {
        name: 'Check',
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        ),
      },
      {
        name: 'Close',
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        ),
      },
      {
        name: 'Arrow',
        svg: (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        ),
      },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {sizes.map((size) => (
          <div key={size}>
            <h3 style={{ color: 'white', marginBottom: '16px', textTransform: 'capitalize' }}>
              {size} Size
            </h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              {icons.map((icon) =>
                states.map((disabled) => (
                  <IconButton
                    key={`${size}-${icon.name}-${disabled}`}
                    size={size}
                    disabled={disabled}
                    aria-label={`${icon.name} icon button ${disabled ? '(disabled)' : ''}`}
                  >
                    {icon.svg}
                  </IconButton>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
