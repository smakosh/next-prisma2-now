import { useState, useEffect } from "react";
import axios from "axios";

declare global {
  interface Window {
    __user: {
      [key: string]: string;
    };
  }
}

const fetchUser = async (cookie = "") => {
  if (typeof window !== "undefined" && window.__user) {
    return window.__user;
  }

  const res = await axios(
    "/api/auth/me",
    cookie
      ? {
          headers: {
            cookie,
          },
        }
      : {}
  );

  if (res.status !== 200) {
    delete window.__user;
    return null;
  }

  if (typeof window !== "undefined") {
    window.__user = res.data;
  }
  return res.data;
};

export default ({ required = false }: { required?: boolean } = {}) => {
  const [loading, setLoading] = useState(
    () => !(typeof window !== "undefined" && window.__user)
  );
  const [user, setUser] = useState(() => {
    if (typeof window === "undefined") {
      return null;
    }

    return window.__user || null;
  });

  useEffect(() => {
    if (!loading && user) {
      return;
    }
    setLoading(true);
    let isMounted = true;

    fetchUser()
      .then((res) => {
        if (isMounted) {
          if (required && !res) {
            window.location.href = "/api/auth/login";
            return;
          }
          setUser(res);
          setLoading(false);
        }
      })
      .catch(() => setLoading(false));

    return () => {
      isMounted = false;
    };
  }, []);

  return { user, loading };
};
