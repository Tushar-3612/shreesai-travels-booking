"use client";

import { FiAlertTriangle } from "react-icons/fi";
import Modal from "./Modal";

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmLabel?: string;
  busy?: boolean;
}

export default function ConfirmDialog({
  open,
  onClose,
  onConfirm,
  title,
  message,
  confirmLabel = "Delete",
  busy,
}: ConfirmDialogProps) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <button className="adm-btn adm-btn-ghost" onClick={onClose} disabled={busy}>
            Cancel
          </button>
          <button
            className="adm-btn adm-btn-danger"
            onClick={onConfirm}
            disabled={busy}
          >
            <FiAlertTriangle size={15} />
            {busy ? "Please wait..." : confirmLabel}
          </button>
        </>
      }
    >
      <div className="flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center shrink-0">
          <FiAlertTriangle size={20} />
        </div>
        <p className="text-sm text-slate-600 leading-relaxed pt-1">{message}</p>
      </div>
    </Modal>
  );
}
