import cn from 'classnames';
import { ExclamationCircleIcon } from '@heroicons/react/solid';
import type { FC } from 'react';
import type { ErrorMessageProps } from '~components/ErrorMessage/types';

/** Container to semantically display an error message */
const ErrorMessage: FC<ErrorMessageProps> = ({ children, className, title = 'oops' }) => (
  <div
    className={cn(
      className,
      'flex border border-red-300 bg-red-800 bg-opacity-10 text-red-800 dark:text-red-50 p-4 rounded',
    )}>
    <ExclamationCircleIcon className="w-5 h-5 mr-2 mt-1 text-red-600 dark:text-red-400" />
    <div className="text-sm">
      <h3 className="block text-lg font-bold text-red-600 dark:text-white mb-1">{title}</h3>
      {children}
    </div>
  </div>
);

export default ErrorMessage;
