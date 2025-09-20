import { create } from "zustand";
import { JwtPayload } from "@/Insfraestructure/Interfaces/auth/auth.interface";
import { jwtDecode } from "jwt-decode";

const KEY_JWT = process.env.NEXT_PUBLIC_KEY_JWT || "auth_key";

const getCookie = (name: string): string => {
  if (typeof window === "undefined") return "";

  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift() || "";
  }

  return "";
};

const setCookie = (name: string, value: string, days: number = 30) => {
  if (typeof window === "undefined") return;

  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${value}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
};

const deleteCookie = (name: string) => {
  if (typeof window === "undefined") return;

  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; Secure; SameSite=Strict`;
};

const isValidJWT = (token: string): boolean => {
  if (!token || typeof token !== "string") return false;
  const parts = token.split(".");
  return parts.length === 3;
};

const decodeJwt = (jwt: string): JwtPayload | null => {
  try {
    if (!isValidJWT(jwt)) return null;

    const decoded = jwtDecode<JwtPayload>(jwt);

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

interface AuthStore {
  jwt: string;
  userDataSession: JwtPayload | null;
  isHydrated: boolean;

  setJwt: (jwt: string) => void;
  logout: () => void;
  initializeFromStorage: () => void;
  setUserDataSession: (userData: JwtPayload | null) => void;
}

const useAuthStore = create<AuthStore>((set, get) => ({
  jwt: "",
  userDataSession: null,
  isHydrated: false,

  setJwt: (jwt: string) => {
    if (!isValidJWT(jwt)) {
      console.error("Invalid JWT provided");
      return;
    }

    const decodedJwt = decodeJwt(jwt);

    if (!decodedJwt) {
      console.error("Failed to decode JWT or token expired");
      return;
    }

    setCookie(KEY_JWT, jwt);

    set({
      jwt,
      userDataSession: decodedJwt,
      isHydrated: true,
    });
  },

  initializeFromStorage: () => {
    if (typeof window === "undefined") return;

    try {
      const savedJwt = getCookie(KEY_JWT);

      if (savedJwt) {
        const decodedJwt = decodeJwt(savedJwt);

        if (decodedJwt) {
          set({
            jwt: savedJwt,
            userDataSession: decodedJwt,
            isHydrated: true,
          });
          return;
        } else {
          deleteCookie(KEY_JWT);
        }
      }

      set({ isHydrated: true });
    } catch (error) {
      console.error("Error initializing from storage:", error);
      set({ isHydrated: true });
    }
  },

  logout: () => {
    deleteCookie(KEY_JWT);

    set({
      jwt: "",
      userDataSession: null,
    });

    import("@/lib/zustand/CartZustand").then(({ useCartStore }) => {
      const { resetCart } = useCartStore.getState();
      resetCart();
    });
  },

  setUserDataSession: (userData: JwtPayload | null) =>
    set({ userDataSession: userData }),
}));

export default useAuthStore;
