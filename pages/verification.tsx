import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Verification() {
  const router = useRouter();
  const [result, setResult] = useState("");
  const [countDownToLogin, setCountDownToLogin] = useState(5);

  useEffect(() => {
    let i = 5;
    const myTimeout = setInterval(() => {
      i -= 1;
      setCountDownToLogin(i);
      if (i == 0) {
        clearInterval(myTimeout);
      }
    }, 1000);
  }, []);

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      const tempToken = token + "";
      const verificate = async () => {
        const result = await fetch(
          "https://botzone.herokuapp.com/" + `api/verificate`,
          {
            method: "POST",
            mode: "cors",
            credentials: "same-origin",
            headers: {
              accept: "application/json",
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              token: tempToken,
            }),
          }
        );
        const data = await result.json();
        setResult(data.message);
      };
      verificate();
    }
  }, [router.isReady]);

  return (
    <div className="w-full h-screen grid place-items-center">
      <div className="text-lg text-white">
        {result}, chuyển đến trang <Link href="/login">đăng nhập</Link> sau{" "}
        {countDownToLogin}
      </div>
    </div>
  );
}

export default Verification;
