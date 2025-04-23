import React, { useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import marked from 'marked';

const MathMarkdownViewer = ({ content, style }) => {
  const [height, setHeight] = useState(1);

  // Convert markdown to HTML
  const processContent = (content) => {
    try {
      // Replace math delimiters before processing markdown
      // This ensures that math formulas are recognized by MathJax
      let processedContent = content;

      // Replace inline math: \( ... \) with $ ... $
      processedContent = processedContent.replace(/\\\(([\s\S]*?)\\\)/g, '$$$1$');

      // Replace display math: \[ ... \] with $$ ... $$
      processedContent = processedContent.replace(/\\\[([\s\S]*?)\\\]/g, '$$$$1$$');

      // Process the markdown to HTML
      return marked.parse(processedContent);
    } catch (error) {
      console.error('Error processing markdown:', error);
      return content; // Return original content if processing fails
    }
  };

  const wrapHTML = (bodyContent) => {
    // Convert markdown to HTML before wrapping
    const htmlContent = processContent(bodyContent);

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <style>
          body {
            font-size: 16px;
            color: black;
            padding: 0;
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          }
          p {
            margin: 0.8em 0;
            line-height: 1.5;
          }
          h1, h2, h3, h4, h5, h6 {
            margin-top: 1.2em;
            margin-bottom: 0.6em;
            font-weight: bold;
            color: #333;
          }
          h1 { font-size: 1.8em; }
          h2 { font-size: 1.6em; }
          h3 { font-size: 1.4em; }
          h4 { font-size: 1.2em; }
          h5 { font-size: 1.1em; }
          h6 { font-size: 1em; }
          a { color: #0066cc; text-decoration: underline; }
          img { max-width: 100%; border-radius: 4px; margin: 1em 0; }
          ul, ol { padding-left: 2em; margin: 0.8em 0; }
          li { margin: 0.3em 0; }
          blockquote {
            border-left: 4px solid #ddd;
            padding-left: 1em;
            margin-left: 0;
            color: #666;
          }
          code {
            background-color: #f5f5f5;
            padding: 0.2em 0.4em;
            border-radius: 3px;
            font-family: monospace;
          }
          pre {
            background-color: #f5f5f5;
            padding: 1em;
            border-radius: 5px;
            overflow-x: auto;
          }
          pre code {
            background-color: transparent;
            padding: 0;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin: 1em 0;
          }
          th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f5f5f5;
          }
          .MathJax_Display {
            text-align: center !important;
            display: block !important;
            margin: 1em 0 !important;
          }
        </style>

        <script type="text/x-mathjax-config">
          MathJax.Hub.Config({
            messageStyle: 'none',
            extensions: ['tex2jax.js'],
            jax: ['input/TeX', 'output/HTML-CSS'],
            tex2jax: {
              inlineMath: [['$', '$'], ['\\\\(', '\\\\)']],
              displayMath: [['$$', '$$'], ['\\\\[', '\\\\]']],
              processEscapes: true,
            },
            TeX: {
              extensions: ['AMSmath.js', 'AMSsymbols.js']
            }
          });

          MathJax.Hub.Queue(function () {
            var height = document.documentElement.scrollHeight;
            window.ReactNativeWebView.postMessage(String(height));
          });
        </script>

        <script src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js"></script>
      </head>
      <body>
        ${htmlContent}
      </body>
      </html>
    `;
  };

  return (
    <View style={[{ height }, style]}>
      <WebView
        scrollEnabled={false}
        originWhitelist={['*']}
        source={{ html: wrapHTML(content) }}
        onMessage={(event) => setHeight(Number(event.nativeEvent.data))}
      />
    </View>
  );
};

export default MathMarkdownViewer;