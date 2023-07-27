import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { useState } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export type ReactNativeHtmlComponentProps = {
  html: string | null | undefined;
  allowTextSelection?: boolean;
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  style?: StyleProp<ViewStyle>;
};

export default function ReactNativeHtmlComponent({
  html: body,
  allowTextSelection = false,
  color = '#000000',
  fontSize = 16,
  style,
}: ReactNativeHtmlComponentProps) {
  const [height, setHeight] = useState<number>();

  const script = `
    <script>
      function resize() {
        window.ReactNativeWebView.postMessage(document.body.scrollHeight);
      }

      document.addEventListener("DOMContentLoaded", () => {
        resize();
        (new ResizeObserver(resize)).observe(document.body);
      });
    </script>
  `;

  return (
    <WebView
      onMessage={(e: WebViewMessageEvent) => setHeight(Number(e.nativeEvent?.data))}
      style={[{ backgroundColor: 'transparent', height }, ...(Array.isArray(style) ? style : [style])]}
      source={{
        html: `
          <html>
            <head>
              <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>

              <style>
                html {
                  color: ${color};
                  font-size: ${fontSize}px;
                  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Variable", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
                  ${allowTextSelection ? '' : 'user-select: none;'}
                }
              </style>

              ${script}
            </head>
            <body>
              ${body ?? ''}
            </body>
          </html>
        `,
      }}
    />
  );
}
