import type { Dispatch, SetStateAction } from "react";
import { useEffect } from "react";

interface Props {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
}

function SnackBar({ show, setShow }: Props) {
  useEffect(() => {
    setTimeout(() => {
      setShow(false);
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
    </>
  );
}

export default SnackBar;
