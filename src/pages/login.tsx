import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 pt-5 ">
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">email</span>
        </label>
        <input
          type="email"
          placeholder="example@example.com"
          className="input-bordered input w-full max-w-xs"
        />
        <label className="label"></label>
      </div>
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">password</span>
        </label>
        <input
          type="Password"
          placeholder="Password"
          className="input-bordered input w-full max-w-xs"
        />
        <label className="label"></label>
      </div>
      <button className="btn-primary btn w-full max-w-xs">Login</button>
    </div>
  );
}
