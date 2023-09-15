/* eslint-disable import/prefer-default-export */
/* eslint-disable react/display-name */
import { memo } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';

export const Message = memo(({ message }) => {
  const { user } = useAuth();
  const { author, text, id } = message;

  return (
    <div key={id} className={`text-break mb-2$ ${user === author ? 'text-end' : 'text-start'}`}>
      <b>{author}</b>
      {`: ${text}`}
    </div>
  );
});
