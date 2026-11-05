import { useEffect, useRef } from "react";

// Opens a <dialog> as a modal when it appears, and tells the parent when it is closed.
export function useModalDialog(onClose: () => void) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);

  useEffect(() => {
    closeRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handleClose = () => closeRef.current();
    el.addEventListener("close", handleClose);
    if (!el.open) el.showModal();
    return () => el.removeEventListener("close", handleClose);
  }, []);

  return ref;
}