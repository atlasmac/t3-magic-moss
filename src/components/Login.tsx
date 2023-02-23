import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

function Login() {
  return (
    <div>
      <div className="flex flex-col items-center gap-y-3 pt-6">
        <button
          type="button"
          onClick={() => signIn()}
          className="btn-accent btn"
        >
          <span className="flex flex-row items-center gap-x-1">
            <FcGoogle size={20} />
            Login / Sign up
          </span>
        </button>
      </div>
    </div>
  );
}

export default Login;
