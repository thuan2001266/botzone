import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Verification() {
  const router = useRouter();
  const [result, setResult] = useState("");
  // const [token, setToken] = useState("");

  // if (router.isReady) console.log(router.query);

  useEffect(() => {
    if (router.isReady) {
      const { token } = router.query;
      const tempToken = token + "";
      const verificate = async () => {
        const result = await fetch(`http://localhost:8080/api/verificate`, {
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
        });
        const data = await result.json();
        setResult(data.message);
      };
      verificate();
    }
  }, [router.isReady]);

  return <div className="text-lg text-white">{result}</div>;
}

export default Verification;
