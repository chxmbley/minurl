import cn from 'classnames';
import { forwardRef, HTMLProps } from 'react';
import type { ForwardRefRenderFunction } from 'react';

/** Styled input component */
const Input: ForwardRefRenderFunction<HTMLInputElement, HTMLProps<HTMLInputElement>> = (
  { className, ...props },
  ref,
) => (
  <input
    ref={ref}
    className={cn(
      className,
      'border border-slate-200 dark:border-slate-700 px-6 h-12 rounded-full shadow-lg text-lg dark:bg-slate-800 dark:text-slate-100 outline-none transition-colors focus:border-cyan-500',
    )}
    {...props}
  />
);

export default forwardRef(Input);
