import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";

interface Props {
  show: boolean;
  // showError: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  // setShowError: Dispatch<SetStateAction<boolean>>;
}

function SnackBar({ show, setShow }: Props) {
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
      // setShowError(false);
    }, 5000);
  });

  return (
    <>
      {show && (
        <div className="alert alert-success mt-9 shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Data Successfully Saved!</span>
          </div>
        </div>
      )}
      {/* {showError && (
        <div className="alert alert-error shadow-lg">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Error! Task failed successfully.</span>
          </div>
        </div>
      )} */}
    </>
  );
}

export default SnackBar;
