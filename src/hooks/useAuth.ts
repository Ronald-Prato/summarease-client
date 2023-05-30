import { firebaseApp } from "@/firebase-init";
import { useRouter } from "next/navigation";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { useState } from "react";
import { useAppDispatch } from "@/store";
import { setUserData } from "@/store/user/user.dispatchers";

export const useAuth = () => {
  const router = useRouter();
  const auth = getAuth(firebaseApp);
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSignup = async () => {
    setIsLoading(true);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const additionalInfo = getAdditionalUserInfo(result);

      // document.cookie = `uid=${user.uid}; path=/;`;

      dispatch(
        setUserData({
          uid: user.uid,
          email: user.email!,
        })
      );

      if (additionalInfo?.isNewUser) {
        try {
          await fetch(`/api/create-user`, {
            method: "POST",
            body: JSON.stringify({
              uid: user.uid,
              email: user.email,
            }),
          });

          setIsLoading(false);
        } catch (err) {
          console.log(err);
        }
      }

      router.replace("/upload");
    } catch (err) {
      console.log(err);
      setIsLoading(false);
    }
  };

  const logout = () => {
    auth.signOut();
    document.cookie = `uid=null; path=/;`;
    router.replace("/login");
  };

  return { handleGoogleSignup, isLoading, logout };
};
