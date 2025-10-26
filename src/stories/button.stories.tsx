import type { Meta, StoryObj } from "@storybook/react-vite"
import { Settings, Download, Trash2, Mail } from "lucide-react"

import { Button } from "@/components/ui/button"

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A versatile button component with multiple variants and sizes. Built with Radix UI Slot for composition flexibility.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "destructive", "outline", "secondary", "ghost", "link"],
      description: "The visual style variant of the button",
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon", "icon-sm", "icon-lg"],
      description: "The size of the button",
    },
    asChild: {
      control: "boolean",
      description: "Compose the button with other components using Radix UI Slot",
    },
    disabled: {
      control: "boolean",
      description: "Whether the button is disabled",
    },
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: "Button",
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}

export const IconButtons: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="icon-sm" variant="outline">
        <Settings />
      </Button>
      <Button size="icon" variant="outline">
        <Settings />
      </Button>
      <Button size="icon-lg" variant="outline">
        <Settings />
      </Button>
    </div>
  ),
}

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button>
        <Download />
        Download
      </Button>
      <Button variant="outline">
        <Mail />
        Send Email
      </Button>
      <Button variant="destructive">
        <Trash2 />
        Delete
      </Button>
      <Button variant="ghost" size="sm">
        <Settings />
        Settings
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button disabled>Default Disabled</Button>
      <Button variant="destructive" disabled>
        Destructive Disabled
      </Button>
      <Button variant="outline" disabled>
        Outline Disabled
      </Button>
      <Button variant="secondary" disabled>
        Secondary Disabled
      </Button>
      <Button variant="ghost" disabled>
        Ghost Disabled
      </Button>
      <Button variant="link" disabled>
        Link Disabled
      </Button>
    </div>
  ),
}

export const SizesWithIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm">
          <Download />
          Small
        </Button>
        <Button size="default">
          <Download />
          Default
        </Button>
        <Button size="lg">
          <Download />
          Large
        </Button>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button size="sm" variant="outline">
          <Download />
          Small
        </Button>
        <Button size="default" variant="outline">
          <Download />
          Default
        </Button>
        <Button size="lg" variant="outline">
          <Download />
          Large
        </Button>
      </div>
    </div>
  ),
}

export const Interactive: Story = {
  args: {
    children: "Click me",
  },
}

export const AllVariantsDefault: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-4">
        <Button variant="default">Default</Button>
        <Button variant="destructive">Destructive</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="link">Link</Button>
      </div>
    </div>
  ),
}

export const AsChild: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button asChild>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Link as Button
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Link as Outline Button
        </a>
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Using the `asChild` prop allows you to compose the button styles with other elements like anchors or custom components.",
      },
    },
  },
}
