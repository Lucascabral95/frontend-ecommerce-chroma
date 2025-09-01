import { create } from "zustand";
import { JwtPayload } from "@/Insfraestructure/Interfaces/auth/auth.interface";
import { jwtDecode } from "jwt-decode";

const KEY_JWT = process.env.NEXT_PUBLIC_KEY_JWT as string;

const isValidJWT = (token: string): boolean => {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  return parts.length === 3;
};

const decodeJwt = (jwt: string): JwtPayload | null => {
  try {
    if (!isValidJWT(jwt)) return null;
    return jwtDecode<JwtPayload>(jwt);
  } catch (error) {
    console.error("Error decodificando JWT:", error);
    return null;
  }
};

interface AuthStore {
  initializeFromStorage: () => void;
  jwt: string;
  setJwt: (jwt: string) => void;
  logout: () => void;
  userDataSession: JwtPayload | null;
  setUserDataSession: (userData: JwtPayload | null) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  jwt: "",

  setJwt: (jwt: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(KEY_JWT, jwt);
    }

    const decodedJwt = decodeJwt(jwt);
    set(() => ({
      jwt,
      userDataSession: decodedJwt,
    }));
  },

  initializeFromStorage: () => {
    if (typeof window !== "undefined") {
      const savedJwt = localStorage.getItem(KEY_JWT) || "";

      const decodedJwt = savedJwt ? decodeJwt(savedJwt) : null;

      set(() => ({
        jwt: savedJwt,
        userDataSession: decodedJwt,
      }));
    }
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(KEY_JWT);
    }
    set(() => ({ jwt: "", userDataSession: null }));
  },

  userDataSession: null,
  setUserDataSession: (userData: JwtPayload | null) =>
    set(() => ({ userDataSession: userData })),
}));

export default useAuthStore;
