import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'outline'],
    },
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
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'large',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
      <Button size="large">Large Button</Button>
      <Button size="small">Small Button</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button
        variant="primary"
        startIcon={
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        }
      >
        Start Icon
      </Button>
      <Button
        variant="primary"
        endIcon={
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        }
      >
        End Icon
      </Button>
      <Button
        variant="outline"
        startIcon={
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        }
        endIcon={
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
          </svg>
        }
      >
        Both Icons
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Button variant="primary">Default</Button>
      <Button variant="primary" disabled>
        Disabled
      </Button>
      <Button variant="outline">Default</Button>
      <Button variant="outline" disabled>
        Disabled
      </Button>
    </div>
  ),
};

export const Matrix: Story = {
  render: () => {
    const variants: Array<'primary' | 'outline'> = ['primary', 'outline'];
    const sizes: Array<'large' | 'small'> = ['large', 'small'];
    const states = [false, true]; // disabled

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {variants.map((variant) => (
          <div key={variant}>
            <h3 style={{ color: 'white', marginBottom: '16px', textTransform: 'capitalize' }}>
              {variant} Variant
            </h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
              {sizes.map((size) =>
                states.map((disabled) => (
                  <Button
                    key={`${variant}-${size}-${disabled}`}
                    variant={variant}
                    size={size}
                    disabled={disabled}
                  >
                    {size} {disabled ? '(disabled)' : ''}
                  </Button>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
