# Dialog
Represents a part of an application that a user interacts with to perform a task
All native attributes of `dialog` are supported as well as some enhancements.


```js
<script type="module">
  import '@vonage/vivid/dialog';
</script>
```

```html preview
<style>
  html { /* for demo purposes */
    block-size: 300px;
  }
</style>

<vwc-dialog icon="info" headline="Headline" subtitle="subtitle" open>
	<vwc-checkbox slot="footer" label="Checkbox"></vwc-checkbox>
	<vwc-button slot="action-items" label="Cancel" appearance="outlined"></vwc-button>
	<vwc-button slot="action-items" label="Ok" appearance="filled"></vwc-button>
</vwc-dialog>
```

## Members

### Headline

Use the `headline` attribute to set the dialog's headline.

- Type: `string`
- Default: `undefined`

```html preview
<vwc-dialog headline="Headline" open></vwc-dialog>
```

### Subtitle

Use the `subtitle` attribute to set the dialog's subtitle.

- Type: `string`
- Default: `undefined`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
</style>
<vwc-dialog subtitle="subtitle content" open></vwc-dialog>
```


### Icon

Use the `icon` attribute to set the dialog's icon.

- Type: `string`
- Default: `undefined`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
</style>
<vwc-dialog icon="info" open></vwc-dialog>
```


### Icon-placement

The `icon-placement` attribute specifies where the dialog's icon should appear (relative to the headline).

- Type: `top` | `side`
- Default: `top`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
</style>
<vwc-dialog icon-placement="side" icon="info" headline="Dialog Headline" subtitle="subtitle content" open></vwc-dialog>
```


### Open

Sets or returns whether a dialog should be open or not

- Type: `boolean`
- Default: `false`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
</style>

<vwc-button label="Toggle Dialog Open" onclick="dialog.open = !dialog.open"></vwc-button>
<vwc-dialog id="dialog" headline="Headline" subtitle="subtitle"></vwc-dialog>
```

### Return Value

Use `returnValue` to get or set the return value. Often used to indicate which button the user pressed to close it.

- Type: `string`
- Default: `""`

```html preview
<style>
  html { /* for demo purposes */
    block-size: 250px;
  }
</style>
<vwc-dialog open
            headline="Returning Dialog">
	<vwc-button slot="action-items" appearance="outlined" label="Cancel"></vwc-button>
	<vwc-button slot="action-items" appearance="filled" label="Action"></vwc-button>
</vwc-dialog>
<div>Returned Value: <span id="dialog-output"></span></div>
<vwc-button label="Open Dialog"
            onclick="openDialog()"></vwc-button>
<script>
  (function handleReturnValue() {
    function handleClick(e) {
      buttonType = e.target.label;
      console.log(buttonType);
      dialog.returnValue = buttonType;
      dialog.close();
    }

    cancelButton = document.querySelector('[label="Cancel"]');
    actionButton = document.querySelector('[label="Action"]');
    dialog = document.querySelector('vwc-dialog');
    dialogOutput = document.querySelector('#dialog-output');

    cancelButton.onclick = actionButton.onclick = handleClick;
    dialog.addEventListener('close', (e) => dialogOutput.innerText = dialog.returnValue);
    window.handleClick = handleClick;
  })();
</script>
<script>
  function openDialog() {
    dialog = document.querySelector('vwc-dialog');
    dialog.show();
  }
</script>
```

## Slots

### Graphic

Use the `graphic` slot in order to replace the icon.

```html preview
<vwc-dialog open>
  <img slot="graphic" src="https://doodleipsum.com/40x40/hand-drawn?bg=7463D9&amp;i=af462b28146d2ac91599602e083ddee5">
</vwc-dialog>
```

### Body

Use the `body` slot in order to add custom HTML to the dialog.  
Body slot after a header containing a subtitle will have a top separator.

```html preview
<style>
  html { /* for demo purposes */
    block-size: 420px;
    --dialog-max-block-size: 360px;
  }
  div {
  	margin-block-start: 24px;
  }
</style>
<vwc-dialog open headline="Dialog Content" subtitle="Dialog with body content">
  <div slot="body">
    <form>
      <vwc-layout column-basis="block">
        <vwc-text-field label="Name"></vwc-text-field>
        <vwc-text-field label="Password" type="password"></vwc-text-field>
        <vwc-button label="Login" appearance="filled"></vwc-button>
      </vwc-layout>
    </form>
  </div>
</vwc-dialog>
```

#### Full-width-body
To remove the body inline padding use `full-width-body`.

- Type: boolean
- Default: false

```html preview
<style>
  html { /* for demo purposes */
    block-size: 400px;
  }
  vwc-progress {
    margin-block-end: 24px;
    display: block;
  }
</style>
<vwc-dialog open icon-placement="side" icon="info" headline="Dialog Headline" full-width-body>
  <div slot="body">
  <vwc-progress min="0" max="50" value="12.5" shape="sharp" connotation="pacific"></vwc-progress>
  <vwc-layout column-basis="block" gutters="medium-inline">
    <form>
      <vwc-layout column-basis="block">
        <vwc-text-field label="Agent Name" placeholder="Search for an agent" icon="search-line"></vwc-text-field>
        <vwc-text-area label="Additional Note (Optional)"></vwc-text-area></vwc-layout>
    </form>
    </vwc-layout>
</vwc-dialog>

```

### Action Items

Use the `action-items` slot to add action items to the bottom of the dialog.

```html preview
<style>
	html { /* for demo purposes */
		block-size: 250px;
	}
</style>
<vwc-dialog open
	headline="Dialog with primary and secondary actions"
	subtitle="This is an example of the dialog with slotted buttons">
	<vwc-button slot="action-items" appearance="outlined" label="Cancel"></vwc-button>
	<vwc-button slot="action-items" appearance="filled" label="Action"></vwc-button>
</vwc-dialog>
```

### Footer

Use the `footer` slot in order to add additional content to the bottom of the dialog.

When used in combination with `action-items` slot, the `footer` content will appear to the left of the action items.

```html preview
<style>
  html { /* for demo purposes */
    block-size: 250px;
  }
</style>
<vwc-dialog open
  headline="Dialog with footer"
  subtitle="this is an example of the dialog with a checkbox inside footer">
	<vwc-checkbox slot="footer" label="I agree"></vwc-checkbox>
	<vwc-button slot="action-items" appearance="filled" label="Ok"></vwc-button>
</vwc-dialog>
```

### Main

Dialog is battery charged with an opinionated template.
Assign nodes to the main slot to fully override a dialog’s predefined flow and style with your own.
Note that all styles will be overridden including the dialog's padding. See the example below on how to set padding to a dialog using the `main` slot.

```html preview
<style>
  .demo-main {
    padding: 8px;
  }
</style>

<vwc-dialog open>
  <div slot="main" class="demo-main">
    Use main slot for your own layout and content
  </div>
</vwc-dialog>
```

## CSS Variables

### Z-index

When the dialog is not set as `modal` its initial z-index can be changed if needed by setting `--dialog-z-index`.

### Inline min & Max size

The Dialog has default `--dialog-min-inline-size` and `--dialog-max-inline-size`.   
This can be changed with setting a new value.  
setting the same value for `--dialog-min-inline-size` and `--dialog-max-inline-size` will set a definitive width to the dialog.  
When setting a new value for `--dialog-min-inline-size` and `--dialog-max-inline-size` take in consideration if defendant value are needed for mobile.  

```html preview
<style>
  html { /* for demo purposes */
    block-size: 230px;
  }
vwc-dialog {
  --dialog-min-inline-size: 560px;
}
</style>

<vwc-dialog icon="info" headline="Headline" subtitle="subtitle content" open></vwc-dialog>
```

### Block-Size

The Dialog has default `--dialog-max-block-size`, if content is larger - there will be scroll.

```html preview
<style>
  html { /* for demo purposes */
    block-size: 250px;
  }
vwc-dialog {
  --dialog-max-block-size: 100px;
}
</style>

<vwc-dialog icon="info" headline="Headline" subtitle="subtitle content" open></vwc-dialog>
```

## Events

<div class="table-wrapper">

| Name    | Description                                                                                                                                                   |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `close` | The `close` event fires when the dialog closes (either via user interaction or via the API). It returns the return value inside the event's details property. |

</div>

## Methods

<div class="table-wrapper">

| Name| Returns  | Description  |
| ----------- | ------- | ---------------- |
| `show`      | `void`  | Shows the dialog. Positioned in a top position by default. |
| `close`     | `void`  | Closes the dialog.       |
| `showModal` | `void`  | Shows the dialog and makes it the top-most modal dialog. Positioned in a center position by default. Interaction outside the dialog is blocked and the content outside it is rendered inert For more information, see the native [Dialog.showModal](https://developer.mozilla.org/en-US/docs/Web/API/HTMLDialogElement/showModal).  |

</div>

## Accessibility

- The dialog's role is `dialog`.  When opened as a modal (via showModal) it adds `aria-modal` to the dialog.
- It is consumer's concern to add `aria-label` to the dialog element.
- `aria-labelledby` and `aria-describedby` can also be used.

## Use Cases

### Dialog Form

```html preview
<style>
  html { /* for demo purposes */
    block-size: 400px;
  }
</style>
<vwc-button label="Open Dialog" onclick="openDialog()"></vwc-button>
<vwc-dialog headline="Dialog With Form">
  <form slot="body" method="dialog">
   <vwc-layout column-basis="block">
        <vwc-text-field label="Agent Name" placeholder="Search for an agent" icon="search-line"></vwc-text-field>
        <vwc-text-area label="Additional Note (Optional)"></vwc-text-area>
      <vwc-button type="submit" label="Submit"></vwc-button>
      </vwc-layout>
  </form>
</vwc-dialog>

<script>
  function openDialog() {
    dialog = document.querySelector('vwc-dialog');
    dialog.show();
  }
</script>
```

### Modal Dialog with Scrim

```html preview
<vwc-button label="Open Modal Dialog" onclick="openDialog()"></vwc-button>
<vwc-dialog headline="Modal Dialog"></vwc-dialog>

<script>
  function openDialog() {
    dialog = document.querySelector('vwc-dialog');
    dialog.showModal();
  }
</script>
```