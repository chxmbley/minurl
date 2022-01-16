import type { HTMLProps } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'accent';

/** Props for the Button component */
export type ButtonProps = HTMLProps<HTMLButtonElement> & {
  // Whether the button is a circle
  round?: boolean;
  /** Type of the button. Note that this type is explicitly defined because HTMLProps<HTMLButtonElement> defines the `type` prop incorrectly. */
  type?: 'button' | 'submit' | 'reset';
  /** Style variant */
  variant?: ButtonVariant;
};
