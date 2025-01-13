import React, { useMemo, useRef, useState } from 'react';
import JoditEditor from 'jodit-react';

const TextEditor = ({placeholder}) => {
  const editor = useRef(null); // Reference to the editor
  const [content, setContent] = useState(''); // State to store editor content

  const config = useMemo(() => ({
    readonly: false,
    placeholder: placeholder || 'Start Typing...',
    toolbar: true,
    height: 400,
    showWordsCount: true,
  }),[placeholder]);

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        tabIndex={1}
        onBlur={(newContent) => setContent(newContent)}
      />
    </div>
  );
};

export default TextEditor;
