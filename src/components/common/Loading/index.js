import React from 'react';

export const Loading = ({ message }) => {
  return (
    <>
    <span className="spinner-border spinner-border-sm mr-1"></span>
    {message}
    </>
  );
};
