# Styling and customization

This library follows **recommended patterns** for letting consumers customize styles. You can use them together depending on how much control you need.

---

## 1. Root `className` (recommended for layout and scoping)

Pass a **top-level `className`** to style the whole component from the outside (e.g. layout, spacing, or CSS that targets inner elements).

```tsx
<IntlPhoneUsernameInput
  className="my-phone-field"
  value={value}
  onChange={setValue}
/>
```

```css
.my-phone-field {
  max-width: 400px;
}
.my-phone-field:focus-within {
  border-color: blue;
}
```

This is the **standard React/HTML pattern**: one class on the root, then use selectors in your CSS. Use it when you want to fit the component into your layout or theme without changing every internal part.

---

## 2. `options.classes` (per-part overrides)

For **per-element** control, use the `options.classes` object. Each key maps to a specific part of the component; your class names are **merged** with the library’s default classes (additive, not replace).

```tsx
<IntlPhoneUsernameInput
  value={value}
  onChange={setValue}
  options={{
    defaultCountry: "IN",
    multiCountry: true,
    classes: {
      intlPhoneUsernameInputWrapper: "my-wrapper",
      input_box: "my-input",
      flag_container: "my-flag-wrap",
      custom_select: {
        select_container: "my-dropdown",
        country_option: "my-option",
        search_input: "my-search",
      },
    },
  }}
/>
```

This is the same idea as **MUI’s `classes` / `slotProps`** or **Radix’s per-part class names**: explicit slots, no reliance on internal DOM structure or selectors. Use it when you need to change specific parts (input, dropdown, flag, etc.) without overriding the whole tree.

**Behavior:**

- Library uses **CSS Modules** for its default styles (scoped, no global clashes).
- Your classes are applied with **`clsx(libraryClass, yourClass)`**, so your styles add to (or override) the defaults.
- Nested keys (e.g. `custom_select.country_option`) map to sub-components.

---

## 3. Global overrides (if you don’t use classes)

If you don’t pass `options.classes`, you can still target the component via **data attributes** or the **root `className`**:

- Root wrapper: use the root `className` you pass (e.g. `my-phone-field`).
- Internal elements use `data-component` where applicable (e.g. `data-component="input-field"`, `data-component="custom-select"`), so you can do:

```css
[data-component="input-field"] {
  font-size: 1rem;
}
```

Prefer **root `className`** or **`options.classes`** when possible; use attribute selectors only when you need to style without passing props.

---

## Summary

| Need | Use |
|------|-----|
| Layout, spacing, or “one class for the whole thing” | **Root `className`** |
| Change specific parts (input, dropdown, flag, etc.) | **`options.classes`** |
| Theme colors/sizes without per-part classes | Root `className` + CSS variables or child selectors |
| Maximum control over every slot | **`options.classes`** with all keys |

This matches common React library practice: root `className` for the “single hook” use case, and a `classes`-style API for fine-grained customization.
