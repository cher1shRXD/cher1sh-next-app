"use client";

import Input from "@/shared/ui/Input";
import Button from "@/shared/ui/Button";
import { useSignup } from "../model/useSignup";

const SignupForm = () => {
  const {
    handleSignup,
    email,
    setEmail,
    password,
    setPassword,
    username,
    setUsername,
    setConfirmPassword,
    confirmPassword,
  } = useSignup();

  return (
    <form onSubmit={handleSignup} className="space-y-4">
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
        id="username"
        name="username"
        type="text"
        autoComplete="username"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="아이디"
      />
      <Input
        id="password"
        name="password"
        type="password"
        autoComplete="new-password"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="비밀번호"
      />
      <Input
        id="confirm-password"
        name="confirm-password"
        type="password"
        autoComplete="new-password"
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder="비밀번호 확인"
      />
      <Button type="submit">회원가입</Button>
    </form>
  );
};

export default SignupForm;
