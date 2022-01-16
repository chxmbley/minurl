import cn from 'classnames';
import { times } from 'lodash';
import { Fragment } from 'react';
import type { FC } from 'react';
import type { RulerProps } from './types';

/** Purely decorative component meant to appear like a ruler with segments */
const Ruler: FC<RulerProps> = ({ className, segments = 5 }) => (
  <div className={cn(className, 'flex items-end justify-between')}>
    {times(segments, (i) => (
      <Fragment key={i}>
        <div className="h-6 border-r border-slate-500" />
        {i < segments - 1 && times(3, (j) => <div key={`${i}.${j}`} className="h-2 border-r border-slate-500" />)}
      </Fragment>
    ))}
  </div>
);

export default Ruler;
