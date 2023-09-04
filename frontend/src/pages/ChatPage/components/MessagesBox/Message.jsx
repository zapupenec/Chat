/* eslint-disable import/prefer-default-export */
/* eslint-disable react/display-name */
import { memo } from 'react';

export const Message = memo(({ message }) => {
  const { author, text, id } = message;

  return (
    <div key={id} className="text-break mb-2">
      <b>{author}</b>
      {`: ${text}`}
    </div>
  );
});
