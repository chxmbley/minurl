import type { HTMLProps } from 'react';

/** Props for the Button component */
export type ButtonProps = HTMLProps<HTMLButtonElement> & {
  /** Type of the button. Note that this type is explicitly defined because HTMLProps<HTMLButtonElement> defines the `type` prop incorrectly. */
  type?: 'button' | 'submit' | 'reset';
  /** Whether the button should use primary styling */
  primary?: boolean;
};
