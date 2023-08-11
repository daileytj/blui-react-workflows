# ErrorManager

## Description
Component that manages the display of error messages. Can be configured to display a dialog, a message box, or neither.

## Usage
```tsx
import { ErrorManager } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  return (
    <ErrorManager>
        {children}
    </ErrorManager>
  );
};
```

## AdvancedUsage

```tsx
import { ErrorManager } from '@brightlayer-ui/react-auth-workflow';

const MyComponent = () => {
  const [error, setError] = React.useState('');

  const handleClose = () => {
    setError('');
  };

  const dialogConfig = {
    title: 'Custom Dialog Title',
    dismissLabel: 'Dismiss'
  };

  const messageBoxConfig = {
    dismissible: true,
    position: 'bottom',
    fontColor: '#ffffff',
    backgroundColor: '#ff0000'
  };

  // Simulate an error after 3 seconds
  React.useEffect(() => {
    setTimeout(() => {
      setError('This is an error message');
    }, 3000);
  }, []);

  return (
    <ErrorManager
      mode="message-box"
      error={error}
      onClose={handleClose}
      dialogConfig={dialogConfig}
      messageBoxConfig={messageBoxConfig}
    >
      <div>Your main content goes here...</div>
    </ErrorManager>
  );
};

```

## API

 - **error**
   - Error text to display.
   - **Type:** `string`
 - **mode** (optional)
   - Determines whether to display a dialog, a message box, or neither.
   - **Type:** `'dialog' | 'message-box' | 'none'`
   - **Default:** `'dialog'`
 - **onClose** (optional)
   - Function to call when the close/dismiss button is clicked.
   - **Type:** `() => void`
 - **dialogConfig** (optional)
   - Configuration for the error dialog.
   - **Type:** `{title?: string, dismissLabel?: string}`
   - see [DialogConfig Props](#dialogconfigprops)
 - **messageBoxConfig** (optional)
   - Configuration for the error message box.
   - **Type:** `MessageBoxProps`
   - See [MessageBoxProps](#messageboxprops)
 - **children** (optional)
   - Children to render.
   - **Type:** `React.ReactNode`


### DialogConfigProps
   - **title** (optional)
     - Text to show in the title of the dialog.
     - **Type:** `string`
     - **Default:** `t('bluiCommon:ERRORS.ERROR')`
   - **dismissLabel** (optional)
     - Text to show in the close button.
     - **Type:** `string`
     - **Default:** `t('bluiCommon:ACTIONS.CLOSE')`


### MessageBoxProps
  - **dismissible** (optional)
    - Whether the message box can be dismissed.
    - **Type:** `boolean`
    - **Default:** `true`
  - **position** (optional)
    - Determines whether the message box should be displayed at the top or bottom of the screen.
    - **Type:** `'top' | 'bottom'`
    - **Default:** `'top'`
  - **fontColor** (optional)
    - The font color of the text inside the message box.
    - **Type:** `string`
    - **Default:** `theme.palette.error.main`
  - **backgroundColor** (optional)
    - The background color of the message box.
    - **Type:** `string`
    - **Default:** `theme.palette.error.light`
  - **sx** (optional)
    - sx styles passed to the underlying root(Box) component.
    - **Type:** `SxProps`