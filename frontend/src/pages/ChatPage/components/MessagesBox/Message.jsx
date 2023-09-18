/* eslint-disable import/prefer-default-export */
/* eslint-disable react/display-name */
import { memo } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';

export const Message = memo(({ message }) => {
  const { user } = useAuth();
  const { author, text, id } = message;

  const className = [
    'text-break',
    'mb-2',
    'text-light',
    `${user === author ? 'text-end' : 'text-start'}`,
    `${user === author ? 'align-self-end' : 'align-self-start'}`,
    `${user === author ? 'bg-primary' : 'bg-secondary'}`,
    'rounded-3',
    'p-2',
    'w-75',
  ].join(' ');

  return (
    <div key={id} className={className}>
      <b>{author}</b>
      {`: ${text}`}
    </div>
  );
});
