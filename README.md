## Multi-Checkbox Web Component
[![Published on npm](https://img.shields.io/badge/npm-published-blue)](https://www.npmjs.com/package/multi-checkbox)
[![Version](https://img.shields.io/badge/version-0.1.8-brightgreen)](https://github.com/smontanus/multi-checkbox)

Multi-Checkbox is a web component that utilizes multiple checkboxes in a dropdown list to populate the value of an input. It is written in pure Javascript with no dependencies.

### Installation
* **NPM**
    `npm install multi-checkbox`

* **CDN**
    ```<script type="module" src="https://www.unpkg.com/multi-checkbox/multi-checkbox.js"></script>```

### Usage
The Multi-Checkbox component utilizes the custom element tag `<multi-checkbox>`. Within the custom tag the component requires a slotted `<ul>` element with the slot attribute set to `check-values`. Within the slotted `<ul>` each `<li>` element represents a checkbox label and value for the component. The custom element has two attributes:

* separator - The separator string used between the checked values.
* value - The custom element component value.

The component will automatically update when attributes are set dynamically. So changing the separator attribute dynamically will automatically replace the value attribute with the updated separator. Changing the value attribute dynamically will automatically check the corresponding checkboxes, if they exist. Additionally, if the `<li>` elements are changed dynamically the element will reset with the new checkbox values.

```html
<multi-checkbox separator="," value="">
    <ul slot="check-values">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
</multi-checkbox>
```

### CSS Style Variables
The following CSS property variables, along with their default values, are available for custom styling.
|Property Variable|Default Value|
|---|---|
|***General Element***|
|--mc-border|1px solid #000000|
|--mc-border-radius|2px|
|--mc-display|inline-block|
|--mc-font|400 0.9em Arial|
|--mc-margin|0|
|--mc-vertical-align|middle|
|***Dropdown***|
|--mc-dropdown-background|#efefef|
|--mc-dropdown-box-shadow|3px 3px 5px 1px rgba(0,0,0,0.35)|
|--mc-dropdown-text-align|left|
|--mc-dropdown-width|209px|
|***Input***|
|--mc-target-background|#efefef|
|--mc-target-color|#000000|
|--mc-target-cursor|default|
|--mc-target-height|28px|
|--mc-target-margin|0|
|--mc-target-max-height|default|
|--mc-target-min-height|default|
|--mc-target-max-width|default|
|--mc-target-min-width|default|
|--mc-target-padding|0px 0px 0px 3px|
|--mc-target-outline|none|
|--mc-vertical-align|middle|
|--mc-target-width|175px|
|***Dropdown Line Items***|
|--mc-dropdown-color|#000000|
|--mc-dropdown-line-height|2em|
|--mc-ul-margin|5px|
|--mc-ul-padding|0|
|--mc-checkbox-height|auto|
|--mc-checkbox-width|auto|
|***Toggle Button***|
|--mc-toggle-button-background|#ffffff|
|--mc-toggle-button-color|#000000|
|--mc-toggle-button-cursor|pointer|
|--mc-toggle-button-height|30px|
|--mc-toggle-button-outline|none|
|--mc-vertical-align|middle|
|--mc-toggle-button-width|30px|
|***Close Button***|
|--mc-close-button-background|#efefef|
|--mc-close-button-border|none|
|--mc-close-button-border-radius|default|
|--mc-close-button-color|#000000|
|--mc-close-button-cursor|pointer|
|--mc-close-button-display|block|
|--mc-close-button-height|22px|
|--mc-close-button-margin|5px auto|
|--mc-close-button-outline|none|
|--mc-close-button-width|22px|

### Changing the Tag Name
The Multi-Checkbox component uses the `<multi-checkbox>` tag in html. In certain cases users may want, or need, to change the tag name. This can be accomplished in Javascript by subclassing the element and registering this subclass under a new tag name.

```javascript
import {MultiCheckbox} from 'multi-checkbox';

customElements.define('my-new-tag', class extends MultiCheckbox{});
```

### Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request.
