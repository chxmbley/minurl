import cn from 'classnames';
import type { FC } from 'react';
import type { ButtonProps } from './types';
import styles from './Button.module.scss';

/** Styled Button component */
const Button: FC<ButtonProps> = ({ className, ...props }) => (
  <button className={cn(className, styles.button)} {...props} />
);

export default Button;
