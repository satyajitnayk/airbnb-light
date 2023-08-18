// This component is written to handle hydration for any client component
'use client';
import React, { useEffect, useState } from 'react';

interface ClientOnlyProps {
  children: React.ReactNode;
}
const ClientOnly: React.FunctionComponent<ClientOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
};

export default ClientOnly;
