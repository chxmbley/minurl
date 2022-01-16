import cn from 'classnames';
import { forwardRef, HTMLProps } from 'react';
import type { ForwardRefRenderFunction } from 'react';
import styles from './Input.module.scss';

/** Styled input component */
const Input: ForwardRefRenderFunction<HTMLInputElement, HTMLProps<HTMLInputElement>> = (
  { className, ...props },
  ref,
) => <input ref={ref} className={cn(className, styles.input)} {...props} />;

export default forwardRef(Input);
