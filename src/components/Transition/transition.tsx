import React from 'react';
import { CSSTransition } from 'react-transition-group';
import { CSSTransitionProps } from 'react-transition-group/CSSTransition';

export type TransitionProps = CSSTransitionProps & {
  animation?:
  | 'zoom-in-top'
  | 'zoom-in-left'
  | 'zoom-in-right'
  | 'zoom-in-bottom';
  children: React.ReactNode;
};

const Transition: React.FC<TransitionProps> = (props) => {
  const { children, animation, ...rest } = props;
  return (
    <CSSTransition classNames={animation} unmountOnExit {...rest}>{children}</CSSTransition>
  );
};

export default Transition;
