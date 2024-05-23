import React, { useState } from "react";
import Lottie from "react-lottie";
import spinnerAnimation from "./spinner.json"; // Ensure this path is correct

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  const [status, setStatus] = useState(null);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setStatus("loading");
    await onConfirm(setStatus);
  };

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: spinnerAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
      <div className="m-2 rounded-xl bg-gradient-to-r from-blue-300 to-cyan-400 p-1 shadow-xl max-w-2xl">
        <div className="z-50 flex flex-col items-center justify-center rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-2 w-full text-left text-sm font-bold text-cyan-500">
            DELETE ACCOUNT
          </h2>
          <p className="mb-4 w-full text-xl text-left">
            Are you sure you want to delete your account? This action cannot be
            undone.
          </p>
          <div className="flex w-full font-semibold justify-start text-base">
            {!status && (
              <>
                <button
                  onClick={onClose}
                  className="mr-4 rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirm}
                  className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </>
            )}
            {status === "loading" && (
              <button
                disabled
                className="rounded bg-red-500 px-4 py-2 text-white flex items-center justify-center"
              >
                <Lottie options={defaultOptions} height={24} width={24} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
