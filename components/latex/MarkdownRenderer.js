// import React from 'react';
// import Markdown from 'react-native-markdown-display';
// import KaTeX from 'react-native-katex';
// import { View } from 'react-native';

// const MarkdownRenderer = ({ markdown }) => {
//   const rules = {
//     inlineMath: (node) => {
//       return (
//         <KaTeX 
//           expression={node.content} 
//           displayMode={false}
//           throwOnError={false}
//         />
//       );
//     },
//     math: (node) => {
//       return (
//         <KaTeX 
//           expression={node.content} 
//           displayMode={true}
//           throwOnError={false}
//         />
//       );
//     }
//   };

//   return (
//     <Markdown
//       rules={rules}
//       patterns={[
//         { pattern: /\$\$(.*?)\$\$/gs, renderComponent: rules.math },
//         { pattern: /\$(.*?)\$/g, renderComponent: rules.inlineMath },
//       ]}
//     >
//       {markdown}
//     </Markdown>
//   );
// };

// export default MarkdownRenderer;

import React from 'react';
import Markdown from 'react-native-markdown-display';
import KaTeX from 'react-native-katex';
import { View } from 'react-native';

const MarkdownRenderer = ({ markdown }) => {
  const rules = {
    paragraph: (node, children, parent, styles) => {
      // Xử lý công thức inline
      if (typeof node.content === 'string') {
        const inlineMathRegex = /\$(.*?)\$/g;
        const parts = node.content.split(inlineMathRegex);
        
        if (parts.length > 1) {
          return (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' }}>
              {parts.map((part, index) => {
                if (index % 2 === 0) {
                  return <Text key={index}>{part}</Text>;
                } else {
                  return (
                    <KaTeX
                      key={index}
                      expression={part}
                      displayMode={false}
                      throwOnError={false}
                    />
                  );
                }
              })}
            </View>
          );
        }
      }
      return children;
    },
    blockmath: {
      match: (source) => /^\$\$([\s\S]*?)\$\$/.exec(source),
      render: (node) => {
        return (
          <View style={{ marginVertical: 10 }}>
            <KaTeX
              expression={node.content}
              displayMode={true}
              throwOnError={false}
            />
          </View>
        );
      }
    }
  };

  return (
    <Markdown
      rules={rules}
      style={{
        body: { fontSize: 16 },
        paragraph: { marginVertical: 8 },
      }}
    >
      {markdown}
    </Markdown>
  );
};

export default MarkdownRenderer;