'use client';
import React from 'react';

const GlobalContainer = ({ children }) => {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return children;
};

export default GlobalContainer;
