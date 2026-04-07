import { createContext, useContext, useState, useCallback } from "react";

const UIContext = createContext(null);

export function UIProvider({ children }) {
  const [modal, setModal]         = useState({ open: false, type: null, data: null });
  const [sidebarOpen, setSidebar] = useState(true);
  const [notification, setNotif]  = useState(null);

  const openModal  = useCallback((type, data = null) => setModal({ open: true, type, data }),  []);
  const closeModal = useCallback(() => setModal({ open: false, type: null, data: null }),        []);
  const toggleSidebar = useCallback(() => setSidebar((v) => !v),                                []);

  const showNotification = useCallback((message, type = "success") => {
    setNotif({ message, type });
    setTimeout(() => setNotif(null), 3000);
  }, []);

  return (
    <UIContext.Provider value={{ modal, openModal, closeModal, sidebarOpen, toggleSidebar, notification, showNotification }}>
      {children}
    </UIContext.Provider>
  );
}

export const useUI = () => {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside UIProvider");
  return ctx;
};