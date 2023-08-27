import React from 'react';
import styles from './Detail.module.css';

const failModal = ({ content }) => {

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <div className={styles.failModalContainer}>
            <div className={styles.failModalContent}>
                <button className={styles.closeBtn} onClick={closeModal}>
                    X
                </button>
                
                {content}
            </div>
        </div>
    );
};

export default failModal;
