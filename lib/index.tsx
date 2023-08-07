import { useState } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

export type HtmlComponentProps = {
  html: string | null | undefined;
  allowTextSelection?: boolean;
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  style?: StyleProp<ViewStyle>;
};

export default function HtmlComponent({
  html: body,
  allowTextSelection = false,
  color = '#000000',
  fontSize = 16,
  style,
}: HtmlComponentProps) {
  const [height, setHeight] = useState<number>();

  const scripts = `
    window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight);
  `;

  const html = `
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

          html, body {
            overflow: hidden;
          }
        </style>

        <script>
          function resize() {
            ${scripts}
          }

          document.addEventListener("DOMContentLoaded", () => {
            resize();
            (new ResizeObserver(resize)).observe(document.documentElement);
          });
        </script>
      </head>
      <body>
        ${body ?? ''}
      </body>
    </html>
  `;

  return (
    <View style={[{ height }, ...(Array.isArray(style) ? style : [style])]}>
      <WebView
        source={{ html }}
        scrollEnabled={false}
        originWhitelist={['*']}
        overScrollMode="never"
        contentInsetAdjustmentBehavior="never"
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        injectedJavaScript={scripts}
        onMessage={(e: WebViewMessageEvent) => setHeight(Number(e.nativeEvent?.data))}
        style={{ backgroundColor: 'transparent' }}
      />
    </View>
  );
}
