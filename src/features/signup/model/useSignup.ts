import { toast } from "@/shared/providers/ToastProvider";
import { useState } from "react";
import { signup } from "../api/signup";
import { useCustomRouter } from "@/shared/model/useCustomRouter";

export const useSignup = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useCustomRouter();

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      if (password !== confirmPassword) {
        toast.warning("비밀번호가 일치하지 않습니다.");
        return;
      }
      const res = await signup({ email, username, password });
      if (res) {
        toast.success("서비스 이용을 위해 로그인 해주세요.");
        router.replace("/login");
      }
    } catch {
      toast.error("네트워크 에러");
    }
  };

  return {
    handleSignup,
    setEmail,
    setUsername,
    setPassword,
    setConfirmPassword,
    email,
    username,
    password,
    confirmPassword,
  };
};
