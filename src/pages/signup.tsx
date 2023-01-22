import * as Z from "zod";
import { useState } from "react";
import { supabase } from "../../utils/supabaseClient";

const emailSchema = Z.string().email();

export default function Signup() {
  const [email, setEmail] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  async function signUpWithEmail() {
    try {
      emailSchema.parse(email);
    } catch {
      alert("Invalid email");
      return;
    }
    try {
      if (email && password) {
        const resp = await supabase.auth.signUp({ email, password });
        if (resp.error) throw resp.error;
        const userId = resp.data.user?.id;
        console.log("userId", userId);
      }
    } catch {}
  }
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
          onChange={(e) => {
            setEmail(e.target.value);
          }}
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
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <label className="label"></label>
      </div>
      <button
        className="from-indigo-primary btn w-full max-w-xs bg-gradient-to-r from-primary to-secondary"
        onClick={signUpWithEmail}
      >
        Login
      </button>
    </div>
  );
}
