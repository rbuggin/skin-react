/*
 * ************************************************************
 *  Copyright 2020 eBay Inc.
 *  Author/Developer: Arturo Montoya
 *  Use of this source code is governed by an MIT-style
 *  license that can be found in the LICENSE file or at
 *  https://opensource.org/licenses/MIT.
 *  ***********************************************************
 */

import * as React from 'react';
import classNames from 'classnames';
import {Icon} from '../../Icon';

export interface DialogBase<T> extends React.HTMLProps<T> {
  tag?: any;
  open?: any;
  type?: any;
  classPrefix?: any;
  focus?: any;
  a11yCloseText?: any;
  windowClass?: any;
  baseEl?: any;
  header?: any;
  footer?: any;
  transitionEl?: any;
  isModal?: any;
  top?: any;
  buttonPosition?: any;
  allyCloseText?: string;
  onButtonClick?: any;
}
const Container = ({tag, ...props}): any => React.createElement(tag, props);

export const DialogBase = ({
  tag = 'div',
  classPrefix,
  windowClass,
  top,
  header,
  buttonPosition = 'left',
  children,
  allyCloseText,
  onButtonClick,
  footer,
  onScroll,
  ...props
}: DialogBase<HTMLElement>) => {
  const className = classNames(classPrefix, props.className);
  const containerProps = {
    ['aria-modal']: true,
    role: 'dialog',
    ['hidden:no-update']: (!props.open).toString(),
    ['aria-live']: !props.isModal && 'polite',
    ...props,
    className,
    tag
  };
  return (
    <Container {...containerProps}>
      <div key="window" className={`${classPrefix}__window ${windowClass || ''}`}>
        {top}
        {header && (
          <div className={`${classPrefix}__header`}>
            {buttonPosition === 'right' && header}
            <button
              key="close"
              className={`${classPrefix}__close`}
              type="button"
              aria-label={allyCloseText}
              onClick={onButtonClick}
            >
              <Icon type="close" />
            </button>
            {buttonPosition === 'left' && header}
          </div>
        )}
        <div key="body" className={`${classPrefix}__main`} onScroll={onScroll}>
          {children}
        </div>
        {footer && <div className={`${classPrefix}__footer`}>{footer}</div>}
      </div>
    </Container>
  );
};

export const DialogBaseWithState = ({onCollapsed, onExpanded, ...props}: any) => {
  const [expanded, setExpanded] = React.useState(props.expanded || false);
  let touches = [];
  const setExpandedState = (isExpanded) => {
    setExpanded(isExpanded);
    if (isExpanded) {
      onExpanded && onExpanded(isExpanded);
    } else {
      onCollapsed && onCollapsed(isExpanded);
    }
  };
  const handleExpand = () => setExpandedState(!expanded);
  const handleScroll = () => setExpandedState(true);
  const handleTouchStart = (event) => {
    const touches = event.changedTouches;
    debugger;
    // touches = map(touches, ({ identifier, pageY }) => ({ identifier, pageY }));
  };
  const handleTouchMove = (event) => {
    debugger;
    if (touches.length) {
      // forEach(event.changedTouches, (current) => {
      //   const compare = findIndex(touches, (item) => item.identifier === current.identifier);
      //   const diff = current.pageY - touches[compare].pageY;
      //
      //   if (diff > 30) {
      //     // Drag down, collpase
      //     if (this.state.expanded) {
      //       this.setExpandedState(false);
      //     } else {
      //       this.getComponent('dialog').state.open = false;
      //     }
      //     this.handleTouchEnd(event);
      //   } else if (diff < -30) {
      //     this.setExpandedState(true);
      //     this.handleTouchEnd(event);
      //   }
      // });
    }
  };
  const handleTouchEnd = (event) => {
    debugger;
    // forEach(event.changedTouches, (current) => {
    //   const idx = findIndex(touches, (item) => item.identifier === current.identifier);
    //   if (idx > -1) {
    //     touches.splice(idx, 1);
    //   }
    // });
  };
  return (
    <DialogBase
      {...props}
      onScroll={handleScroll}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    />
  );
};

export default DialogBaseWithState;
