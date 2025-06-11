import React, { useState, useEffect } from 'react';
import styles from '../Modal.module.scss';

const TypewriterPlaceholder = ({ text, speed = 150, delay = 1000 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    let timeout;
    
    if (waiting) {
      timeout = setTimeout(() => {
        setWaiting(false);
        setIsDeleting(true);
      }, delay);
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (displayedText.length === 0) {
        setIsDeleting(false);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(displayedText.slice(0, -1));
        }, speed / 2);
      }
    } else {
      if (displayedText.length === text.length) {
        setWaiting(true);
      } else {
        timeout = setTimeout(() => {
          setDisplayedText(text.slice(0, displayedText.length + 1));
        }, speed);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, waiting, text, speed, delay]);

  return (
    <span className={styles.typewriter_text}>
      {displayedText}
      <span className={styles.typewriter_caret}>|</span>
    </span>
  );
};

export default TypewriterPlaceholder;