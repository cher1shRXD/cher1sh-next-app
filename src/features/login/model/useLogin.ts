import { useState } from "react";
import { login } from "../api/login";
import { useCustomRouter } from "@/shared/model/useCustomRouter";
import { toast } from "@/shared/providers/ToastProvider";

export const useLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useCustomRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      if (res) {
        toast.success("환영합니다!");
        router.replace("/");
      }
    } catch {
      toast.error("네트워크 에러");
    }
  };

  return {
    handleLogin,
    setEmail,
    setPassword,
    email,
    password,
  };
};
