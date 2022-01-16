import cn from 'classnames';
import { times } from 'lodash';
import { Fragment } from 'react';
import type { FC } from 'react';
import type { RulerProps } from './types';

/** Purely decorative component meant to appear like a ruler with major and minor segments */
const Ruler: FC<RulerProps> = ({ className, majorSegments = 5, minorSegments = 3 }) => (
  <div className={cn(className, 'flex items-end justify-between')}>
    {times(majorSegments, (i) => (
      <Fragment key={i}>
        <div className="h-6 border-r border-slate-500" />
        {i < majorSegments - 1 &&
          times(minorSegments, (j) => <div key={`${i}.${j}`} className="h-2 border-r border-slate-500" />)}
      </Fragment>
    ))}
  </div>
);

export default Ruler;
