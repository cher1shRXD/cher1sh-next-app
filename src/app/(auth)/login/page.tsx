"use client";

import {
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/libs/firebase/firebase-config";
import { FirebaseError } from "firebase/app";
import { toast } from "@/components/provider/ToastProvider";
import { customFetch } from "@/libs/fetch/customFetch";

const Login = () => {
  const handleLogin = async (provider: "google" | "github") => {
    try {
      const result = await signInWithPopup(
        auth,
        provider === "google"
          ? new GoogleAuthProvider()
          : new GithubAuthProvider()
      );
      const user = result.user;
      const idToken = await user.getIdTokenResult();
      if(idToken) {
        console.log(idToken)
        const data = await customFetch.post("/auth/verify", { idToken: idToken.token });
        console.log(data);
      }
    } catch (error) {
      const err = error as FirebaseError;
      if (err.code === "auth/account-exists-with-different-credential") {
        toast.error(`이미 가입된 계정입니다.`);
        return;
      }
      toast.error("네트워크 에러");
    }
  };

  return (
    <div>
      <button onClick={() => handleLogin("google")}>구글 로그인</button>
      <button onClick={() => handleLogin("github")}>깃허브 로그인</button>
    </div>
  );
};

export default Login;
