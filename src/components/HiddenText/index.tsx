import cn from 'classnames';
import { useEffect, useState } from 'react';
import styles from './index.module.css';

export const HiddenText = ({ children }: React.PropsWithChildren) => {
  const [isHide, setIsHide] = useState(true);
  const toggle = () => {
    setIsHide((state) => !state);
  };

  useEffect(() => {
    setIsHide(true);
  }, [children]);

  return (
    <div className={cn(styles.container, isHide && styles.hide)} onClick={toggle}>
      {children}
    </div>
  );
};
