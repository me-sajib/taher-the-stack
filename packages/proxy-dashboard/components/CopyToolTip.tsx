import copy from 'copy-to-clipboard';
import { useState } from 'react';

interface CopyToolTip {
  text: string;
  children: string | JSX.Element;
}

export default function CopyToolTip({ text, children }: CopyToolTip) {
  const [isCopied, setCopy] = useState(false);

  const copyToClipboardHandler = () => {
    copy(text);
    setCopy(true);
  };

  return (
    <span
      className="tooltip tooltip-bottom cursor-pointer"
      data-tooltip={isCopied ? 'copied' : 'copy'}
      onClick={copyToClipboardHandler}
      onMouseLeave={() => setCopy(false)}
    >
      <span>{children}</span>
    </span>
  );
}
