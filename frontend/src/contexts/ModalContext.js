import React, { createContext, useState, useContext } from 'react';

const ModalContext = createContext();

export const useModal = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
    const [activeModal, setActiveModal] = useState(null);

    const closeModal = () => {
        setActiveModal(null);
    };

    const openModal = (modalName) => {
        setActiveModal(modalName);
    };

    const switchToModal = (modalName) => {
        setActiveModal(modalName);
    };

    return (
        <ModalContext.Provider value={{ activeModal, openModal, closeModal, switchToModal }}>
            {children}
        </ModalContext.Provider>
    );
};
