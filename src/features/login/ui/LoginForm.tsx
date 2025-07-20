"use client";

import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import { useLogin } from "../model/useLogin";

const LoginForm = () => {
  const { handleLogin, email, setEmail, password, setPassword } = useLogin();

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <Input
        id="email"
        name="email"
        type="email"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="이메일"
      />
      <Input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <Button type="submit">
        로그인
      </Button>
    </form>
  );
}

export default LoginForm