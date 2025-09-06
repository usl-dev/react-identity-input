# React International Phone Username Input

A powerful and flexible React component for handling international phone numbers and usernames with advanced features like multi-country selection, smart input detection, keyboard navigation, and more.

## ✨ Features

- 🌍 **Multi-country Support** - Support for 200+ countries with flags and dial codes
- 📱 **Smart Input Detection** - Automatically detects phone numbers vs text input
- ⌨️ **Keyboard Navigation** - Full arrow key navigation with Enter to select
- 🔍 **Search & Filter** - Search countries by name or dial code
- 🎯 **Autofocus** - Smart focus management in dropdowns
- 🌐 **RTL Support** - Right-to-left language support
- 🎨 **Customizable** - Full styling control with CSS classes
- 🚀 **Performance Optimized** - Memoized components, no circular references
- 📱 **Mobile Friendly** - Native mobile select option
- 🔒 **TypeScript Ready** - Full TypeScript definitions

## Installation

```bash
# npm
npm install react-intl-phone-username-input

# yarn
yarn add react-intl-phone-username-input

# pnpm
pnpm add react-intl-phone-username-input
```

## Quick Start

```tsx
import { IntlPhoneUsernameInput } from "react-intl-phone-username-input";
import { useState } from "react";

export default function App() {
  const [value, setValue] = useState("");

  return (
    <IntlPhoneUsernameInput
      value={value}
      onChange={setValue}
      options={{
        mode: "phone",
        defaultCountry: "US",
        multiCountry: true,
        enableFlag: true,
      }}
      placeholder="Enter phone number"
    />
  );
}
```

### Custom Select with Search & Keyboard Navigation (ENHANCED!)

```tsx
<IntlPhoneUsernameInput
  value={value}
  onChange={setValue}
  options={{
    mode: "phone",
    multiCountry: true,
    enforceCustomSelect: true,
    customSelect: {
      showFlag: true,
      showDialCode: true,
      enableSearch: true, // Enables search with autofocus
      searchPlaceholder: "Search countries...",
    },
  }}
  placeholder="Try keyboard navigation (↑↓ + Enter)"
/>
```

### Hybrid Mode (Text + Phone)

```tsx
<IntlPhoneUsernameInput
  value={value}
  onChange={setValue}
  options={{
    mode: "hybrid", // Accepts both text and phone numbers
    defaultCountry: "US",
    enableFlag: true,
  }}
  placeholder="Enter username, email, or phone"
/>
```

### RTL Support

```tsx
<IntlPhoneUsernameInput
  value={value}
  onChange={setValue}
  options={{
    mode: "phone",
    direction: "rtl",
    defaultCountry: "AE",
    multiCountry: true,
  }}
  placeholder="أدخل رقم الهاتف"
/>
```

## Props

### Main Props

| Name              | Type     | Required | Description                                             |
| ----------------- | -------- | -------- | ------------------------------------------------------- |
| `value`           | string   | Yes      | Current input value                                     |
| `onChange`        | function | Yes      | Callback when value changes: `(value: string) => void`  |
| `onChangeSelect`  | function | No       | Callback when country changes: `(event) => void`        |
| `options`         | object   | No       | Configuration options (see below)                       |
| `placeholder`     | string   | No       | Input placeholder text                                  |
| `selectFieldName` | string   | No       | Name for the select field (default: `"country_select"`) |

### Options Object

| Name                      | Type                    | Default       | Description                                    |
| ------------------------- | ----------------------- | ------------- | ---------------------------------------------- |
| **Core Options**          |
| `mode`                    | `"phone"` \| `"hybrid"` | `"hybrid"`    | Input mode: phone-only or hybrid (text+phone)  |
| `defaultCountry`          | string                  | `"US"`        | Default country (ISO 2-letter code)            |
| `multiCountry`            | boolean                 | `false`       | Enable country selection dropdown              |
| `format`                  | boolean                 | `true`        | Enable phone number formatting                 |
| `enableFlag`              | boolean                 | `false`       | Show country flag (when multiCountry is false) |
| `hideDialCode`            | boolean                 | `false`       | Hide dial code from input field                |
| **Custom Select Options** |
| `enforceCustomSelect`     | boolean                 | `false`       | Force custom dropdown (vs auto-detect mobile)  |
| `enforceHtmlSelect`       | boolean                 | `false`       | Force native HTML select                       |
| `customSelect`            | object                  | `{}`          | Custom select configuration                    |
| └── `showFlag`            | boolean                 | `false`       | Show flags in dropdown                         |
| └── `showDialCode`        | boolean                 | `false`       | Show dial codes in dropdown                    |
| └── `enableSearch`        | boolean                 | `true`        | Enable search with autofocus                   |
| └── `searchPlaceholder`   | string                  | `"Search..."` | Search input placeholder                       |
| **Country Management**    |
| `preferredCountries`      | string[]                | `[]`          | Countries to show at top: `["US", "CA", "GB"]` |
| `highLightCountries`      | string[]                | `[]`          | Countries to highlight in list                 |
| **Styling & Layout**      |
| `direction`               | `"ltr"` \| `"rtl"`      | `"ltr"`       | Text direction for RTL languages               |
| `classes`                 | object                  | `{}`          | CSS class overrides (see Styling section)      |
| `customArrowIcon`         | ReactNode               | `null`        | Custom dropdown arrow icon                     |

## Styling with `classes` Prop

Customize the appearance by providing CSS class names:

```tsx
<IntlPhoneUsernameInput
  // ... other props
  options={{
    // ... other options
    classes: {
      intlPhoneUsernameInputWrapper: "my-input-wrapper",
      input_box: "my-input-field",
      flag_container: "my-flag-container",
      custom_select: {
        select_container: "my-dropdown",
        country_option: "my-country-item",
        search_input: "my-search", // NEW: Search input styling
      },
    },
  }}
/>
```

### Available Class Keys

| Key                                 | Description                             |
| ----------------------------------- | --------------------------------------- |
| **Main Component**                  |
| `intlPhoneUsernameInputWrapper`     | Main container wrapper                  |
| `input_box`                         | Text input field                        |
| `flag_container`                    | Flag container (non-multi-country mode) |
| `flag`                              | Flag image element                      |
| **Custom Select**                   |
| `custom_select.select_container`    | Dropdown container                      |
| `custom_select.select_overlay_btn`  | Dropdown trigger button                 |
| `custom_select.dropdown_container`  | Dropdown panel container                |
| `custom_select.search_input`        | Search input field                      |
| `custom_select.country_list`        | Countries list container                |
| `custom_select.country_list_item`   | Individual country list item            |
| `custom_select.country_option`      | Country option button                   |
| `custom_select.flag`                | Flag in dropdown trigger                |
| `custom_select.list_flag`           | Flag in dropdown options                |
| `custom_select.arrow`               | Dropdown arrow icon                     |
| **HTML Select**                     |
| `html_select.html_select_container` | Native select container                 |
| `html_select.select_wrapper`        | Select wrapper                          |
| `html_select.select_overlay`        | Styled overlay                          |
| `html_select.flag`                  | Flag next to select                     |
| `html_select.arrow`                 | Arrow next to select                    |

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Run the test suite: `npm run test`
4. Test your changes in the example app: `cd example && npm start`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

### Development Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run example app
cd example
npm install
npm start
```

## License

MIT License - see LICENSE file for details.

## Issues & Support

- 🐛 **Bug Reports**: [GitHub Issues](https://github.com/yourusername/react-intl-phone-username-input/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/yourusername/react-intl-phone-username-input/discussions)
- 📧 **Email**: support@yourpackage.com

---

**Made with ❤️ by [Your Name](https://github.com/yourusername)**
