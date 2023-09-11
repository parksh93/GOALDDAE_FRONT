import React from 'react';
import styles from './Detail.module.css';


const ApplyModal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        {children}
        <button className={styles.closeBtn} onClick={onClose}>
          취소
        </button>
      </div>
    </div>
  );
};

export default ApplyModal;
