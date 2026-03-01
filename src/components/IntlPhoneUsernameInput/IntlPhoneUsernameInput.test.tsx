import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import IntlPhoneUsernameInput from "./IntlPhoneUsernameInput";

describe("IntlPhoneUsernameInput", () => {
  it("renders an input with placeholder", async () => {
    const onChange = vi.fn();
    render(
      <IntlPhoneUsernameInput
        value=""
        onChange={onChange}
        placeholder="Enter phone"
      />
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Enter phone")).toBeInTheDocument();
    });
  });

  it("displays the controlled value", async () => {
    const onChange = vi.fn();
    render(
      <IntlPhoneUsernameInput
        value="+91 98765 43210"
        onChange={onChange}
        placeholder="Phone"
      />
    );

    await waitFor(() => {
      const input = screen.getByPlaceholderText("Phone");
      expect(input).toHaveValue("+91 98765 43210");
    });
  });

  it("calls onChange when user types", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(
      <IntlPhoneUsernameInput
        value=""
        onChange={onChange}
        placeholder="Phone"
        options={{ mode: "phone", defaultCountry: "IN", multiCountry: false }}
      />
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Phone")).toBeInTheDocument();
    });

    const input = screen.getByPlaceholderText("Phone");
    await user.type(input, "9");

    await waitFor(() => {
      expect(onChange).toHaveBeenCalled();
    });
  });

  it("renders with hybrid mode and single country", async () => {
    const onChange = vi.fn();
    render(
      <IntlPhoneUsernameInput
        value=""
        onChange={onChange}
        options={{
          mode: "hybrid",
          defaultCountry: "US",
          multiCountry: false,
          enableFlag: true,
        }}
        placeholder="Username or phone"
      />
    );

    await waitFor(() => {
      expect(screen.getByPlaceholderText("Username or phone")).toBeInTheDocument();
    });
  });

  it("renders with multiCountry true (lazy select)", async () => {
    const onChange = vi.fn();
    render(
      <IntlPhoneUsernameInput
        value="+1 "
        onChange={onChange}
        options={{
          mode: "phone",
          defaultCountry: "US",
          multiCountry: true,
        }}
        placeholder="Phone"
      />
    );

    await waitFor(() => {
      const input = screen.getByPlaceholderText("Phone");
      expect(input).toBeInTheDocument();
      expect(input).toHaveValue("+1 ");
    }, { timeout: 3000 });
  });

  it("accepts and displays value in hideDialCode mode", async () => {
    const onChange = vi.fn();
    render(
      <IntlPhoneUsernameInput
        value="9876543210"
        onChange={onChange}
        options={{
          mode: "phone",
          defaultCountry: "IN",
          multiCountry: false,
          hideDialCode: true,
        }}
        placeholder="Phone"
      />
    );

    await waitFor(() => {
      const input = screen.getByPlaceholderText("Phone");
      expect(input).toHaveValue("9876543210");
    });
  });

  it("passes through input props like disabled and required", async () => {
    const onChange = vi.fn();
    render(
      <IntlPhoneUsernameInput
        value=""
        onChange={onChange}
        placeholder="Phone"
        disabled
        required
      />
    );

    await waitFor(() => {
      const input = screen.getByPlaceholderText("Phone");
      expect(input).toBeDisabled();
      expect(input).toBeRequired();
    });
  });
});
