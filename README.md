# React Native HTML Component

This allows you to render HTML content within your application. It accepts a string of HTML content as a prop and renders it within a WebView component. This makes it easy to integrate rich HTML content into your React Native application.

[![npm version](https://badge.fury.io/js/react-native-html-component.svg)](https://badge.fury.io/js/react-native-html-component)

## Installation

### Expo

```shell
expo install react-native-html-component react-native-webview
```

### Other

```shell
npm install react-native-html-component react-native-webview
# OR
yarn add react-native-html-component react-native-webview
#OR
pnpm add react-native-html-component react-native-webview

```

## Usage

```jsx
import Html from 'react-native-html-component';

export default function App() {
    return (
        <Html html="<p>Hello World!</p>" />
    )
}
```

## Props

### `html`

A string that represents the HTML content to be rendered.

➤ Type: **`string`** <br/>

---

### `allowTextSelection`

An optional boolean that determines whether text selection is allowed.

➤ Type: **`boolean`** <br/>
➤ Default: **`false`** <br/>

---

### `backgroundColor`

An optional string that sets the background color of the root html.

➤ Type: **`string`** <br/>
➤ Default: **`'transparent'`** <br/>

---

### `color`

An optional string that sets the text color of the root html.

➤ Type: **`string`** <br/>
➤ Default: **`'#000000'`** <br/>

---

### `css`

An optional string with pure css that will be injected into the html.

➤ Type: **`string`** <br/>

---

### `delay`

Delay in milliseconds to calculate the element height. It is recommended to use values above 50ms to avoid rendering whitespace.

➤ Type: **`number`** <br/>
➤ Default: **`50`** <br/>

---


### `fontSize`

An optional number that sets the font size of the root html.

➤ Type: **`number`** <br/>
➤ Default: **`16`** <br/>

---

### `style`

An optional StyleProp object that can be used to apply custom styles to the component.

➤ Type: **`StyleProp<ViewStyle>`** <br/>

---

### `onNavigate`

Event fires every time a link is pressed or the url is changed in some way.

The default action opens the url in the browser with `Linking.open(url)`.

Return `true` or `false` to enable or disable the default action.

➤ Type: **`({ url: string }) => boolean`** <br/>
