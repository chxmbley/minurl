import cn from 'classnames';
import type { FC } from 'react';
import type { ButtonProps } from './types';
import styles from './Button.module.scss';

/** Styled Button component */
const Button: FC<ButtonProps> = ({ className, round = false, variant = 'secondary', ...props }) => (
  <button className={cn(className, styles.button, styles[variant], { [styles.round]: round })} {...props} />
);

export default Button;
