## Installation

# npm

npm install react-intl-phone-username-input

# yarn

yarn add react-intl-phone-username-input

## Basic Usage

import IntlPhoneUsernameInput from 'react-intl-phone-username-input';

```
export default function App() {

  return (
    <IntlPhoneUsernameInput
      option={{
        mode: "phone",
        enableFlag: true,
        defaultCountry: "IN",
      }}
    />
  );
}
```

## Option Props

| Name                  | Type    | Default  | Description                                          |
| --------------------- | ------- | -------- | ---------------------------------------------------- |
| `mode`                | string  | `hybrid` | Type of input: `hybrid`, `international`, or `local` |
| `enableFlag`          | boolean | `false`  | Show country flag                                    |
| `customSelect`        | object  | `{}`     | Customize custom select UI                           |
| └── `showFlag`        | boolean | `false`  | Show flag inside custom select                       |
| └── `showDialCode`    | boolean | `false`  | Show dial code inside custom select                  |
| `multiCountry`        | boolean | `false`  | Enable multi-country selection                       |
| `defaultCountry`      | string  | `IN`     | Set default country (ISO 2-letter code)              |
| `direction`           | string  | `ltr`    | Text direction: `ltr` or `rtl`                       |
| `enforceHtmlSelect`   | boolean | `false`  | Force HTML select dropdown                           |
| `enforceCustomSelect` | boolean | `false`  | Force custom dropdown                                |
| `preferredCountries`  | array   |          | To set only required country list(eg: ["US", "SA"])  |
| `highLightCountries`  | array   |          | Countries to pin at the top of the dropdown          |
| `customArrowIcon`     | jsx     |          |                                                      |

## `classes` Prop (Styling Overrides)

| Key                                 | Type     | Description                                           |
| ----------------------------------- | -------- | ----------------------------------------------------- |
| `flag_container`                    | `string` | Container wrapper around the flag icon                |
| `flag`                              | `string` | The flag icon element                                 |
| `intlPhoneUsernameInputWrapper`     | `string` | Wrapper for the entire input component                |
| `input_box`                         | `string` | Main input element (username or phone number)         |
| `custom_select.country_list_item`   | `string` | Individual item in the custom dropdown list           |
| `custom_select.country_option`      | `string` | Content inside dropdown item (e.g., name + dial code) |
| `custom_select.flag`                | `string` | Flag icon shown in the dropdown list                  |
| `custom_select.select_container`    | `string` | Container around the custom select component          |
| `custom_select.select_overlay_btn`  | `string` | The clickable overlay dropdown button                 |
| `custom_select.list_flag`           | `string` | Flag inside the country list dropdown                 |
| `custom_select.arrow`               | `string` | Dropdown arrow icon in custom select                  |
| `custom_select.country_list`        | `string` | Container for the dropdown list                       |
| `html_select.html_select_container` | `string` | Container around the native HTML select               |
| `html_select.select_wrapper`        | `string` | Wrapper around native `<select>` for styling          |
| `html_select.select_overlay`        | `string` | Overlay element to mimic custom select styling        |
| `html_select.flag`                  | `string` | Flag icon shown next to the native select             |
| `html_select.arrow`                 | `string` | Arrow icon shown next to the native select            |

## TypeScript

This package ships with full TypeScript definitions for all props and configuration.

## Contributing

Contributions are welcome! Please open issues or pull requests.

## Issues / Support

Found a bug or have a feature request? [Open an issue](https://github.com/yourusername/repo-name/issues)
