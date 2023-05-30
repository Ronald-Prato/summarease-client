import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, getAuth, onAuthStateChanged } from "firebase/auth";

import { firebaseApp } from "@/firebase-init";
import { useAppDispatch } from "@/store";
import { setUserData } from "@/store/user/user.dispatchers";

type UsePersistenceProps = {
  isLoggedPath?: string;
  isNotLoggedPath?: string;
};

export const usePersistence = ({
  isLoggedPath,
  isNotLoggedPath,
}: UsePersistenceProps) => {
  const router = useRouter();
  const auth = getAuth(firebaseApp);
  const [isSingedIn, setIsSingedIn] = useState(false);
  const dispatch = useAppDispatch();

  const handleUserIsSignedIn = (user: User) => {
    setIsSingedIn(true);
    dispatch(setUserData({ uid: user.uid, email: user.email! }));
    isLoggedPath && router.replace(isLoggedPath);
  };

  const handleUserIsnotSignedIn = () => {
    isNotLoggedPath && router.replace(isNotLoggedPath);
  };

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      user && handleUserIsSignedIn(user);

      !user && handleUserIsnotSignedIn();
    });
  }, []);

  return { isSingedIn };
};
