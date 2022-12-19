import { Tooltip } from '@mui/material';
import copy from 'copy-to-clipboard';
import { useState } from 'react';

interface CopyToolTip {
  text: string;
  children: string | JSX.Element;
}

export default function CopyToolTip({
  text,
  children
}: CopyToolTip) {
  const [isCopied, setCopy] =
    useState(false);

  const copyToClipboardHandler = () => {
    copy(text);
    setCopy(true);
  };

  return (
    <Tooltip
      style={{ cursor: 'pointer' }}
      title={
        isCopied ? 'copied' : 'copy'
      }
      arrow
      onClick={copyToClipboardHandler}
      onMouseLeave={() =>
        setTimeout(
          () => setCopy(false),
          1e3
        )
      }
    >
      <span>{children}</span>
    </Tooltip>
  );
}
