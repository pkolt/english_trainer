import cn from 'classnames';
import { useState } from 'react';
import styles from './index.module.css';

export const HiddenText = ({ children }: React.PropsWithChildren) => {
  const [isHide, setIsHide] = useState(true);
  const toggle = () => {
    setIsHide((state) => !state);
  };
  return (
    <div className={cn(styles.container, isHide && styles.hide)} onClick={toggle}>
      {children}
    </div>
  );
};
