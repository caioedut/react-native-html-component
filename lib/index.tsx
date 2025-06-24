import { useRef, useState } from 'react';
import { Linking, StyleProp, View, ViewStyle } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';

export type HtmlComponentProps = {
  html: string | null | undefined;
  allowTextSelection?: boolean;
  backgroundColor?: string;
  color?: string;
  fontSize?: number;
  css?: string;
  delay?: number;
  style?: StyleProp<ViewStyle>;
  androidLayerType?: 'none' | 'software' | 'hardware';
  onNavigate?: (state: { url: string }) => boolean;
};

export default function HtmlComponent({
  html: body,
  allowTextSelection = false,
  color = '#000000',
  fontSize = 16,
  css = '',
  delay = 50,
  androidLayerType = 'none',
  style,
  onNavigate,
}: HtmlComponentProps) {
  const baseUrlRef = useRef<string>(undefined);

  // must have value greater than 0, or may cause crash on android
  const [height, setHeight] = useState<number>(1);

  const scripts = `
    setTimeout(function () {
      if (document && document.documentElement) {
        window.ReactNativeWebView.postMessage(document.documentElement.scrollHeight + '');
      }
    }, ${delay});

    true; // note: this is required, or you'll sometimes get silent failures
  `;

  const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0"/>

    <style>
      ${
        allowTextSelection
          ? ''
          : '* { -webkit-user-select: none; -moz-user-select: none; -ms-user-select: none; user-select: none; }'
      }

      html {
        color: ${color};
        font-size: ${fontSize}px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI Variable", "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
        overflow: hidden;
      }

      body {
        margin: 0;
        padding: 0;
      }
    </style>

    ${css ? `<style>${css}</style>` : ''}

    <script>
      function resize() {
        ${scripts}
      }

      document.addEventListener("DOMContentLoaded", () => {
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
        setSupportMultipleWindows={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        injectedJavaScript={scripts}
        androidLayerType={androidLayerType}
        onMessage={(e: WebViewMessageEvent) => {
          const newHeight = Number(e.nativeEvent?.data);

          if (typeof newHeight === 'number' && !Number.isNaN(newHeight)) {
            setHeight(Math.max(newHeight, 1));
          }
        }}
        style={{ backgroundColor: 'transparent' }}
        onLoadStart={({ nativeEvent }) => {
          if (!baseUrlRef.current) {
            // detect native OS "about:blank"
            baseUrlRef.current = decodeURIComponent(nativeEvent.url);
          }
        }}
        onShouldStartLoadWithRequest={(request) => {
          if (!baseUrlRef.current) {
            return true;
          }

          let url = decodeURIComponent(request.url);

          // is root url
          if (baseUrlRef.current === url) {
            return true;
          }

          if (url.startsWith(baseUrlRef.current)) {
            url = url.substring(baseUrlRef.current?.length);
          }

          let isDefaultPrevented = false;
          if (onNavigate instanceof Function) {
            isDefaultPrevented = !onNavigate({ url });
          }

          if (!isDefaultPrevented) {
            Linking.openURL(url).catch(() => null);
          }

          return false;
        }}
      />
    </View>
  );
}
