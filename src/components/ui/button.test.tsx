import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Settings, Download, Trash2, Mail } from "lucide-react"
import "../../index.css"
import { Button } from "./button"

describe("Button", () => {
  it("renders with default props", () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole("button", { name: "Click me" })
    expect(button).toBeInTheDocument()
  })

  it("renders with custom className", () => {
    render(<Button className="custom-class">Button</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("custom-class")
  })

  it("renders as disabled when disabled prop is true", () => {
    render(<Button disabled>Disabled Button</Button>)
    const button = screen.getByRole("button")
    expect(button).toBeDisabled()
  })

  it("calls onClick handler when clicked", async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(<Button onClick={handleClick}>Click me</Button>)
    const button = screen.getByRole("button")

    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it("does not call onClick when disabled", async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()

    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>
    )
    const button = screen.getByRole("button")

    await user.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  describe("variants", () => {
    it("renders default variant", () => {
      render(<Button variant="default">Default</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("bg-primary")
    })

    it("renders destructive variant", () => {
      render(<Button variant="destructive">Destructive</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("bg-destructive")
    })

    it("renders outline variant", () => {
      render(<Button variant="outline">Outline</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("border")
    })

    it("renders secondary variant", () => {
      render(<Button variant="secondary">Secondary</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("bg-secondary")
    })

    it("renders ghost variant", () => {
      render(<Button variant="ghost">Ghost</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("hover:bg-accent")
    })

    it("renders link variant", () => {
      render(<Button variant="link">Link</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("text-primary")
    })
  })

  describe("sizes", () => {
    it("renders small size", () => {
      render(<Button size="sm">Small</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("h-8")
    })

    it("renders default size", () => {
      render(<Button size="default">Default</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("h-9")
    })

    it("renders large size", () => {
      render(<Button size="lg">Large</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("h-10")
    })

    it("renders icon size", () => {
      render(
        <Button size="icon">
          <span>🎯</span>
        </Button>
      )
      const button = screen.getByRole("button")
      expect(button).toHaveClass("size-9")
    })

    it("renders icon-sm size", () => {
      render(
        <Button size="icon-sm">
          <span>🎯</span>
        </Button>
      )
      const button = screen.getByRole("button")
      expect(button).toHaveClass("size-8")
    })

    it("renders icon-lg size", () => {
      render(
        <Button size="icon-lg">
          <span>🎯</span>
        </Button>
      )
      const button = screen.getByRole("button")
      expect(button).toHaveClass("size-10")
    })
  })

  describe("asChild prop", () => {
    it("renders as anchor element when asChild is true", () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      )
      const link = screen.getByRole("link")
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute("href", "/test")
    })

    it("maintains button styles when rendered as child", () => {
      render(
        <Button asChild variant="destructive">
          <a href="/test">Link</a>
        </Button>
      )
      const link = screen.getByRole("link")
      expect(link).toHaveClass("bg-destructive")
    })
  })

  describe("accessibility", () => {
    it("has correct data-slot attribute", () => {
      render(<Button>Button</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveAttribute("data-slot", "button")
    })

    it("maintains aria-invalid styles", () => {
      render(<Button aria-invalid="true">Invalid</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("aria-invalid:ring-destructive/20")
    })
  })

  describe("focus behavior", () => {
    it("has focus-visible styles", () => {
      render(<Button>Focus Me</Button>)
      const button = screen.getByRole("button")
      expect(button).toHaveClass("focus-visible:ring-ring/50")
    })
  })

  describe("integration tests from stories", () => {
    it("renders all variants together", async () => {
      const user = userEvent.setup()

      render(
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      )

      const defaultBtn = screen.getByRole("button", { name: "Default" })
      const destructiveBtn = screen.getByRole("button", { name: "Destructive" })
      const outlineBtn = screen.getByRole("button", { name: "Outline" })

      expect(defaultBtn).toBeInTheDocument()
      expect(destructiveBtn).toBeInTheDocument()
      expect(outlineBtn).toBeInTheDocument()

      await user.click(defaultBtn)
      await user.click(destructiveBtn)
      await user.click(outlineBtn)
    })

    it("renders different sizes together", async () => {
      const user = userEvent.setup()

      render(
        <div className="flex flex-wrap items-center gap-4">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      )

      const smallBtn = screen.getByRole("button", { name: "Small" })
      const defaultBtn = screen.getByRole("button", { name: "Default" })
      const largeBtn = screen.getByRole("button", { name: "Large" })

      expect(smallBtn).toBeInTheDocument()
      expect(defaultBtn).toBeInTheDocument()
      expect(largeBtn).toBeInTheDocument()

      await user.click(smallBtn)
      await user.click(defaultBtn)
      await user.click(largeBtn)
    })

    it("renders icon-only buttons", async () => {
      const user = userEvent.setup()

      render(
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
      )

      const buttons = screen.getAllByRole("button")
      expect(buttons).toHaveLength(3)

      for (const button of buttons) {
        await user.click(button)
      }
    })

    it("renders buttons with icons and text", async () => {
      const user = userEvent.setup()

      render(
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
      )

      const downloadBtn = screen.getByRole("button", { name: "Download" })
      const emailBtn = screen.getByRole("button", { name: "Send Email" })
      const deleteBtn = screen.getByRole("button", { name: "Delete" })
      const settingsBtn = screen.getByRole("button", { name: "Settings" })

      expect(downloadBtn).toBeInTheDocument()
      expect(emailBtn).toBeInTheDocument()
      expect(deleteBtn).toBeInTheDocument()
      expect(settingsBtn).toBeInTheDocument()

      await user.click(downloadBtn)
      await user.click(emailBtn)
      await user.click(deleteBtn)
      await user.click(settingsBtn)
    })

    it("renders all disabled button variants", () => {
      render(
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
      )

      const defaultDisabledBtn = screen.getByRole("button", {
        name: "Default Disabled",
      })
      const destructiveDisabledBtn = screen.getByRole("button", {
        name: "Destructive Disabled",
      })
      const outlineDisabledBtn = screen.getByRole("button", {
        name: "Outline Disabled",
      })

      expect(defaultDisabledBtn).toBeDisabled()
      expect(destructiveDisabledBtn).toBeDisabled()
      expect(outlineDisabledBtn).toBeDisabled()
    })

    it("renders different sizes with icons", async () => {
      const user = userEvent.setup()

      render(
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
      )

      const smallButtons = screen.getAllByRole("button", { name: "Small" })
      expect(smallButtons).toHaveLength(2)

      await user.click(smallButtons[0])

      const defaultButtons = screen.getAllByRole("button", { name: "Default" })
      const largeButtons = screen.getAllByRole("button", { name: "Large" })

      await user.click(defaultButtons[0])
      await user.click(largeButtons[0])
    })

    it("supports keyboard navigation", async () => {
      const user = userEvent.setup()

      render(<Button>Click me</Button>)
      const button = screen.getByRole("button", { name: "Click me" })

      expect(button).toBeInTheDocument()

      await user.click(button)

      await user.keyboard("{Tab}")
      await user.keyboard("{Enter}")
    })

    it("renders with asChild prop as link", async () => {
      const user = userEvent.setup()

      render(
        <div className="flex flex-wrap gap-4">
          <Button asChild>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Link as Button
            </a>
          </Button>
          <Button variant="outline" asChild>
            <a
              href="https://example.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Link as Outline Button
            </a>
          </Button>
        </div>
      )

      const linkAsButton = screen.getByRole("link", { name: "Link as Button" })
      const linkAsOutlineButton = screen.getByRole("link", {
        name: "Link as Outline Button",
      })

      expect(linkAsButton).toBeInTheDocument()
      expect(linkAsOutlineButton).toBeInTheDocument()

      expect(linkAsButton).toHaveAttribute("href", "https://example.com")
      expect(linkAsOutlineButton).toHaveAttribute("href", "https://example.com")

      await user.click(linkAsButton)
      await user.click(linkAsOutlineButton)
    })
  })
})
