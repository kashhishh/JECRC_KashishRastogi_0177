import { useUI } from "../contexts/UIContext";
import EmployeeForm from "./EmployeeForm";

export default function Modal() {
  const { modal, closeModal } = useUI();
  if (!modal.open) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{modal.type === "add" ? "Add Employee" : "Edit Employee"}</h2>
          <button className="icon-btn" onClick={closeModal}>✕</button>
        </div>
        <EmployeeForm existing={modal.data} onClose={closeModal} />
      </div>
    </div>
  );
}