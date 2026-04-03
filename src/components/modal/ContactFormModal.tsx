"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "./ContactForm";
import Thankyou from "./Thankyou";

interface ContactFormModalProps {
  dialogRef: React.RefObject<HTMLDialogElement | null>;
  isSubmitted: boolean;
  formInfo: { name: string; email: string; phone: string; message: string };
  handleCloseModal: () => void;
  handleFormChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  handleFormSubmit: (e: React.FormEvent) => void;
}

export default function ContactFormModal({
  dialogRef,
  isSubmitted,
  formInfo,
  handleCloseModal,
  handleFormChange,
  handleFormSubmit,
}: ContactFormModalProps) {
  return (
    <dialog
      ref={dialogRef}
      className="
        fixed inset-0 m-auto w-[calc(100%-11rem)] max-w-[900px] max-h-[768px]
        rounded-small shadow-[0_4px_30px_rgba(0,0,0,0.1)] border-none p-0
        max-tablet:w-[calc(100%-2rem)] max-tablet:mx-4
      "
      onClick={(e) => {
        if (e.target === dialogRef.current) handleCloseModal();
      }}
    >
      <div className="relative flex flex-col items-center w-[calc(100%-11rem)] mx-[5.5rem] my-8 max-tablet:mx-4 max-tablet:w-[calc(100%-2rem)] max-tablet:my-4">
        <button
          onClick={handleCloseModal}
          className="absolute right-0 text-[1.4rem] bg-transparent border-none cursor-pointer transition-all duration-200 hover:text-accent-1 hover:scale-110"
          aria-label="Close"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>
        {isSubmitted ? (
          <Thankyou handleClick={handleCloseModal} />
        ) : (
          <ContactForm
            formInfo={formInfo}
            handleFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit}
          />
        )}
      </div>
    </dialog>
  );
}
