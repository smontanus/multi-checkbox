/**
 * @file multi-checkbox.js
 * @fileOverview Multi-checkbox vanilla javascript component. Provides
 * an input with a dropdown of multiple checkboxes that are concatenated.
 * in the input when selected. See the README file for usage.
 * @version 0.1.8
 * @author Stephen Montanus <steve@stevemontanus.com>
 * @copyright ©2021 Stephen Montanus Software Engineering.
 * @license MIT
 */

/** @constant {Object} */
const template = document.createElement('template');
template.innerHTML = `
<style>
    .multi-checkbox {
        display: var(--mc-display, inline-block);
        margin: var(--mc-margin, 0);
        width: initial;
    }

    .checkbox-container {
        background: var(--mc-dropdown-background, #efefef);
        border-bottom: var(--mc-border, 1px solid #000000);
        border-left: var(--mc-border, 1px solid #000000);
        border-right: var(--mc-border, 1px solid #000000);
        border-top: none;
        border-bottom-left-radius: var(--mc-border-radius, 2px);
        border-bottom-right-radius: var(--mc-border-radius, 2px);
        box-sizing: border-box;
        box-shadow: var(--mc-dropdown-box-shadow, 3px 3px 5px 1px rgba(0,0,0,0.35));
        -webkit-box-shadow: var(--mc-dropdown-box-shadow, 3px 3px 5px 1px rgba(0,0,0,0.35));
        -moz-box-shadow: var(--mc-dropdown-box-shadow, 3px 3px 5px 1px rgba(0,0,0,0.35));
        display: block;
        position: absolute;
        text-align: var(--mc-dropdown-text-align, left);
        transform: scale(1, 0);
        transform-origin: top left;
        transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
        width: var(--mc-dropdown-width, fit-content);
    }

    input {
        background: var(--mc-target-background, #efefef);
        border: var(--mc-border, 1px solid #000000);
        border-bottom-left-radius: var(--mc-border-radius, 2px);
        border-top-left-radius: var(--mc-border-radius, 2px);
        color: var(--mc-target-color, #000000);
        cursor: var(--mc-target-cursor, default);
        font: var(--mc-font, 400 0.9em Arial);
        height: var(--mc-target-height, 28px);
        margin: var(--mc-target-margin, 0);
        max-height: var(--mc-target-max-height);
        min-height: var(--mc-target-min-height);
        max-width: var(--mc-target-max-width);
        min-width: var(--mc-target-min-width);
        padding: var(--mc-target-padding, 0px 0px 0px 3px);
        outline: var(--mc-target-outline, none);
        vertical-align: var(--mc-vertical-align, middle);
        width: var(--mc-target-width, 175px);
    }

    svg {
        vertical-align: middle;
    }

    ::slotted(ul) {
        color: var(--mc-dropdown-color, #000000);
        font: var(--mc-font, 400 0.9em Arial) !important;
        line-height: var(--mc-dropdown-line-height, 2em);
        list-style-type: none;
        margin: var(--mc-ul-margin, 5px);
        padding: var(--mc-ul-padding, 0);
        overflow-wrap: break-word;
    }

    #toggle-button {
        background: var(--mc-toggle-button-background, #ffffff);
        border: var(--mc-border, 1px solid #000000);
        border-bottom-right-radius: var(--mc-border-radius, 2px);
        border-top-right-radius: var(--mc-border-radius, 2px);
        color: var(--mc-toggle-button-color, #000000);
        cursor: var(--mc-toggle-button-cursor, pointer);
        height: var(--mc-toggle-button-height, 30px);
        margin-left: -5px;
        outline: var(--mc-toggle-button-outline, none);
        vertical-align: var(--mc-vertical-align, middle);
        width: var(--mc-toggle-button-width, 30px);
    }

    #close-button {
        background: var(--mc-close-button-background, #efefef);
        border: var(--mc-close-button-border, none);
        border-radius: var(--mc-close-button-border-radius, default);
        color: var(--mc-close-button-color, #000000);
        cursor: var(--mc-close-button-cursor, pointer);
        display: var(--mc-close-button-display, block);
        height: var(--mc-close-button-height, 22px);
        margin: var(--mc-close-button-margin, 5px auto);
        outline: var(--mc-close-button-outline, none);
        width: var(--mc-close-button-width, 22px);
    }
</style>

<div class="multi-checkbox">
    <input type="text" readonly disabled />
    <button id="toggle-button">
        <svg x="0px" y="0px" viewBox="0 0 330 330">
            <path fill="currentColor" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,
            0.001l-139.39,139.393L25.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,
            5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
            s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,
            325.607,79.393z"/>
        </svg>
    </button>
    <div class="checkbox-container">
        <div><slot name="check-values" /></div>
        <button id="close-button">
        <svg x="0px" y="0px" viewBox="0 0 330 330">
            <path fill="currentColor" d="M324.001,209.25L173.997,96.75c-5.334-4-12.667-4-18,
            0L6.001,209.25c-6.627,4.971-7.971,14.373-3,21c2.947,3.93,7.451,6.001,12.012,
            6.001c3.131,0,6.29-0.978,8.988-3.001L164.998,127.5l141.003,105.75c6.629,
            4.972,16.03,3.627,21-3C331.972,223.623,330.628,214.221,324.001,209.25z"/>
        </svg>
        </button>
    </div>
</div>`;

/**
 * Creates a new MultiCheckbox custom HTML element. Utilized in HTML as the
 * <multi-checkbox> tag.
 * @name MultiCheckbox
 * @class
 * @extends HTMLElement
 */
export class MultiCheckbox extends HTMLElement {
    /**
     * @description Specify observed attributes so that attributeChangedCallback will work.
     * @return {String[]} String array of attributes to be observed.
     */
    static get observedAttributes() {
        return ['separator', 'value'];
    }

    /**
     * @description Create a MultiCheckbox element. Fires when an instance of
     * the element is created or updated.
     */
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));
        // Component variables.
        this.dropDownVisible = false;
        this.inputRadius = this.shadowRoot.querySelector('input')
            .style.borderBottomLeftRadius;
        this.toggleRadius = this.shadowRoot.querySelector('#toggle-button')
            .style.borderBottomRightRadius;
        this.items = [];
    }

    /**
     * @description Get the MultiCheckbox element value.
     * @return {string} The value.
     */
    get value() {
        return this.getAttribute('value');
    }

    /**
     * @description Set the MultiCheckbox element value.
     * @param {string} newValue The new value of the element.
     */
    set value(newValue) {
        this.setAttribute('value', newValue);
    }

    /**
     * @description Get the MultiCheckbox item separator value.
     * @return {string} The separator value.
     */
    get separator() {
        return this.getAttribute('separator');
    }

    /**
     * @descriptionSet the MultiCheckbox item separator value.
     * @param {string} newValue The new value of the item separator.
     */
    set separator(newValue) {
        this.setAttribute('separator', newValue);
    }

    /**
     * @name updateItems
     * @description Update the item list when slot content changes.
     * @return {void}
     */
    updateItems() {
        // Remove original slot data.
        const itemList = this.shadowRoot.querySelector('slot')
            .assignedNodes({flatten: true})[0];
        if (itemList.childNodes[itemList.childNodes.length - 1].nodeName == 'UL') {
            itemList.removeChild(itemList.childNodes[itemList.childNodes.length - 1]);
        }
        // Update slot with new elements.
        this.items = this.shadowRoot.querySelector('slot')
            .assignedElements({flatten: true})[0]
            .children;
        // Add checkboxes to the component list items.
        this.addCheckBoxes();
        // Clear the input and custom element value.
        this.shadowRoot.querySelector('input').value = '';
        this.setAttribute('value', '');
    }

    /**
     * @name addCheckBoxes
     * @description Add check box inputs to the elements of the items list.
     * @return {void}
     */
    addCheckBoxes() {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].innerHTML = '<input type="checkbox" style="' +
            'height: var(--mc-checkbox-height, auto); ' +
            'vertical-align: middle; ' +
            'width: var(--mc-checkbox-width, auto);" ' +
            'id="item-' + i + '" value="' + this.items[i].innerHTML + '" /> ' +
            this.items[i].innerHTML;
        }
    }

    /**
     * @name updateValue
     * @description Update the custom element value based on checked boxes.
     * @return {void}
     */
    updateValue() {
        // Only run this when checkboxes are being clicked, not dynamically changed.
        if (this.dropDownVisible == true) {
            // Get the separator string.
            const sep = this.getAttribute('separator');
            // Initialize the string to store the new element value.
            let newVal = '';
            // Iterate over the list items, adding the values of checked checkboxes to
            // the new string.
            for (let i = 0; i < this.items.length; i++) {
                const chkBox = this.items[i].querySelector('input[type="checkbox"]');
                if (chkBox.checked) {
                    // Concatenate the checked value.
                    newVal = newVal + chkBox.value + sep;
                }
            }
            // Remove the last separator.
            newVal = newVal.slice(0, -sep.length);
            // Update the value attribute to the new string.
            this.setAttribute('value', newVal);
        }
    }

    /**
     * @name showDropDown
     * @description Show the drop down item list.
     * @return {void}
     */
    showDropDown() {
        this.shadowRoot.querySelector('.checkbox-container').style.transform = 'scale(1, 1)';
        this.shadowRoot.querySelector('input').style.borderBottomLeftRadius = '0px';
        this.shadowRoot.querySelector('#toggle-button').style.borderBottomRightRadius = '0px';
        this.shadowRoot.querySelector('#toggle-button').innerHTML =
            `<svg x="0px" y="0px" viewBox="0 0 330 330">
                <path fill="currentColor" d="M324.001,209.25L173.997,96.75c-5.334-4-12.667-4-18,
                0L6.001,209.25c-6.627,4.971-7.971,14.373-3,21c2.947,3.93,7.451,6.001,12.012,
                6.001c3.131,0,6.29-0.978,8.988-3.001L164.998,127.5l141.003,105.75c6.629,
                4.972,16.03,3.627,21-3C331.972,223.623,330.628,214.221,324.001,209.25z"/>
            </svg>`;
    }

    /**
     * @name hideDropDown
     * @description Hide the drop down item list.
     * @return {void}
     */
    hideDropDown() {
        this.shadowRoot.querySelector('.checkbox-container').style.transform = 'scale(1, 0)';
        this.shadowRoot.querySelector('input').style.borderBottomLeftRadius = this.inputRadius;
        this.shadowRoot.querySelector('#toggle-button')
            .style.borderBottomRightRadius = this.toggleRadius;
        this.shadowRoot.querySelector('#toggle-button').innerHTML =
            `<svg x="0px" y="0px" viewBox="0 0 330 330">
                <path fill="currentColor" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,
                0.001l-139.39,139.393L25.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,
                5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393
                s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,
                325.607,79.393z"/>
            </svg>`;
    }

    /**
     * @name toggleDropDown
     * @description Toggle display of the drop down item list.
     * @return {void}
     */
    toggleDropDown() {
        this.dropDownVisible = !this.dropDownVisible;
        if (this.dropDownVisible) {
            this.showDropDown();
        } else {
            this.hideDropDown();
        }
    }

    /**
     * @name connectedCallback
     * @description Fires when an instance is inserted into the document.
     * @return {void}
     */
    connectedCallback() {
        // Add button event listeners.
        this.shadowRoot.querySelector('#toggle-button')
            .addEventListener('click', () => this.toggleDropDown());
        this.shadowRoot.querySelector('#close-button')
            .addEventListener('click', () => this.toggleDropDown());
        // Add slot change event listener
        this.shadowRoot.addEventListener('slotchange', () => this.updateItems());
        // Add checkbox event listener.
        this.shadowRoot.addEventListener('click', (event) => {
            if (event.target && event.target.id.split('-')[0] == 'item') {
                this.updateValue();
            }
        });
        // Add event listener to hide the dropdown when click is outside the component.
        document.addEventListener('click', (event) => {
            if (!event.composedPath().includes(this)) {
                this.dropDownVisible = false;
                this.hideDropDown();
            }
        });
    }

    /**
     * @name disconnectedCallback
     * @description Fires when an instance was removed from the document.
     * @return {void}
     */
    disconnectedCallback() {
        // Remove button event listeners.
        this.shadowRoot.querySelector('#toggle-button')
            .removeEventListener('click', () => this.toggleDropDown());
        this.shadowRoot.querySelector('#close-button')
            .removeEventListener('click', () => this.toggleDropDown());
        // Remove slot event listener.
        this.shadowRoot.querySelector('slot')
            .removeEventListener('slotchange', () => this.updateItems());
    }

    /**
     * @name attributeChangedCallback
     * @description Fires when an attribute was added, removed, or updated.
     * @param {string} attrName The element attribute name.
     * @param {string} oldVal The old value of the attribute.
     * @param {string} newVal The new value of the attribute.
     * @return {void}
     */
    attributeChangedCallback(attrName, oldVal, newVal) {
        switch (attrName) {
        case 'value':
            // Update the input.
            this.shadowRoot.querySelector('input').value = newVal;
            if (this.dropDownVisible == false) {
                // Get the separator string.
                const sep = this.getAttribute('separator');
                // Split newVal into array using separator
                const newVals = newVal.split(sep);
                // Update the checkboxes.
                for (let i = 0; i < this.items.length; i++) {
                    const chkBox = this.items[i].querySelector('input[type="checkbox"]');
                    if (chkBox) { // Filter out nulls on page load.
                        if (newVals.includes(chkBox.value)) {
                            chkBox.checked = true;
                        } else {
                            chkBox.checked = false;
                        }
                    }
                }
            }
            break;
        case 'separator':
            if (newVal !== oldVal) {
                let valueString = this.getAttribute('value');
                // Replace the separator string.
                valueString = valueString.split(oldVal).join(newVal);
                // Update the input and custom element value.
                this.shadowRoot.querySelector('input').value = valueString;
                this.setAttribute('value', valueString);
            }
            break;
        }
    }
}

customElements.define('multi-checkbox', MultiCheckbox);
