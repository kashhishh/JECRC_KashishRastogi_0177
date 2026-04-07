import { useUI } from "../contexts/UIContext";

export default function Notification() {
  const { notification } = useUI();
  if (!notification) return null;
  return <div className={`notification ${notification.type}`}>{notification.message}</div>;
}