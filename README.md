## Multi-Checkbox Web Component
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/owner/my-element)

Multi-Checkbox is a web component that utilizes multiple checkboxes in a dropdown list to populate the value of an input. It is written in pure Javascript with no dependencies.

### Installation
* **NPM**
    `npm install multi-checkbox --save-dev`

* **CDN**
    ```html<script type="module" src="https://????????????????????"></script>```

### Usage
The Multi-Checkbox component utilizes the custom element tag `html<multi-checkbox>`. Within the custom tag the component requires a slotted `html<ul>` element with the slot attribute set to `check-values`. Within the slotted `html<ul>` each `html<li>` element represents a checkbox label and value for the component. The custom element has two attributes:

* separator - The separator string used between the checked values.
* value - The custom element component value.

The component will automatically update when attributes are set dynamically. So changing the separator attribute dynamically will automatically replace the value attribute with the updated separator. Changing the value attribute dynamically will automatically check the corresponding checkboxes, if they exist. Additionally, if the `html<li>` elements are changed dynamically the element will reset with the new checkbox values.

```html
<multi-checkbox separator="," value="">
    <ul slot="check-values">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
    </ul>
</multi-checkbox>
```

### CSS
The following CSS property variables are available for custom styling along with their default values.
|Property Variable|Default Value|
|---|---|
|*General Element*|
|'css --mc-border|1px solid #000000|


### Contributing
1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request.
