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
  androidLayerType?: 'none' | 'software' | 'hardware';
};

export default function HtmlComponent({
  html: body,
  allowTextSelection = false,
  color = '#000000',
  fontSize = 16,
  style,
  androidLayerType = 'none',
}: HtmlComponentProps) {
  // must have value greater than 0, or may cause crash on android
  const [height, setHeight] = useState<number>(1);

  const scripts = `
    if (document && document.documentElement) {
      window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight);
    }
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
        javaScriptEnabled
        allowsFullscreenVideo
        allowsInlineMediaPlayback
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        injectedJavaScript={scripts}
        androidLayerType={androidLayerType}
        onMessage={(e: WebViewMessageEvent) => setHeight(Number(e.nativeEvent?.data || 1))}
        style={{ backgroundColor: 'transparent' }}
      />
    </View>
  );
}
