import cn from 'classnames';
import type { FC } from 'react';
import type { ButtonProps } from './types';

/** Styled Button component */
const Button: FC<ButtonProps> = ({ className, ...props }) => (
  <button
    className={cn(
      className,
      'flex justify-center items-center bg-cyan-500 dark:bg-cyan-500 text-white transition-colors hover:bg-cyan-400 focus:bg-cyan-400 outline-none disabled:bg-slate-300 disabled:text-slate-400 disabled:dark:bg-slate-700 disabled:dark:text-slate-500 disabled:cursor-not-allowed',
    )}
    {...props}
  />
);

export default Button;
