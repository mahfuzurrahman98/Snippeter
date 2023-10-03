'use client';

import AceEditor from 'react-ace';

import '../imports/ace-languages';
import '../imports/ace-themes';

import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-modelist';

const AceComponent = ({
  sourceCode,
  theme,
  mode,
  readOnly
}: {
  sourceCode: string;
  theme: string;
  mode: string;
  readOnly: boolean;
}) => {
  return (
    <AceEditor
      className="font-fira-code"
      value={sourceCode}
      mode={mode}
      theme={theme}
      fontSize={18}
      width="100%"
      height="800px"
      readOnly={true}
    />
  );
};

export default AceComponent;
