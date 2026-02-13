"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, useTransition } from "react";
import { loginAction, LoginState } from "../../actions/login";
import type { z } from "zod";
import { LoginSchema } from "../../../lib/validations/auth";

type LoginForm = z.infer<typeof LoginSchema>;

export default function LoginPage() {
  const [state, setState] = useState<LoginState>({});
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (data: LoginForm) => {
    startTransition(async () => {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);

      const result = await loginAction({}, formData);
      setState(result);
    });
    // router.refresh();
  };

  useEffect(() => {
    if (state.success) {
      window.location.href = "/";
    }
  }, [state.success]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-4 space-y-3 max-w-md mx-auto"
    >
      {/* Email */}
      <div>
        <input
          {...register("email")}
          placeholder="Email"
          className="border p-2 w-full"
          autoFocus
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="border p-2 w-full"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      {state.error && <p className="text-red-500 text-center">{state.error}</p>}

      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white p-2 w-full"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>

      <p className="text-center mt-4 text-gray-600">
        You don&apos;t have an account?{" "}
        <a href="/auth/signup" className="text-blue-600">
          Sign up
        </a>
      </p>
    </form>
  );
}
