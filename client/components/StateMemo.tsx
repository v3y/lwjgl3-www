import React from 'react';
import shallowEqual from 'fbjs/lib/shallowEqual';

export const StateMemo = React.memo(
  (props: any) => props.children,
  (prevProps: any, nextProps: any) => shallowEqual(prevProps.state, nextProps.state)
);
