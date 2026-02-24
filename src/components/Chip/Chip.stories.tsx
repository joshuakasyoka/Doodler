import type { Meta, StoryObj } from '@storybook/react';
import { Chip } from './Chip';

const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'outline'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

export const Default: Story = {
  args: {
    children: 'Chip',
    variant: 'default',
  },
};

export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Chip variant="default">Default</Chip>
      <Chip variant="secondary">Secondary</Chip>
      <Chip variant="outline">Outline</Chip>
    </div>
  ),
};

export const WithContent: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
      <Chip variant="default">Label</Chip>
      <Chip variant="secondary">Tag</Chip>
      <Chip variant="outline">Category</Chip>
      <Chip variant="default">Longer Text Content</Chip>
    </div>
  ),
};

export const Matrix: Story = {
  render: () => {
    const variants: Array<'default' | 'secondary' | 'outline'> = ['default', 'secondary', 'outline'];
    const contents = ['Label', 'Tag', 'Category', 'Longer Text Content'];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {variants.map((variant) => (
          <div key={variant}>
            <h3 style={{ color: 'white', marginBottom: '16px', textTransform: 'capitalize' }}>
              {variant} Variant
            </h3>
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
              {contents.map((content) => (
                <Chip key={`${variant}-${content}`} variant={variant}>
                  {content}
                </Chip>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};
