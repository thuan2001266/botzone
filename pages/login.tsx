import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore, actions } from "../store";
import logo from "../assets/topzone";
import Head from "next/head";

function Login() {
  const [state, dispatch] = useStore();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageChange, setMessageChange] = useState(false);
  const router = useRouter();
  let data;
  const loginAut = async () => {
    const response = await fetch("https://botzone.onrender.com/" + `login`, {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: userName,
        password: password,
      }),
    });
    try {
      data = await response.json();
      if (data.access_token) {
        dispatch(actions.setToken(data.access_token));
        dispatch(actions.setRefreshToken(data.refresh_token));
        dispatch(actions.setType("asdasdasd"));
        router.push("/");
      } else {
        setMessage(data.message);
        setMessageChange((prev) => !prev);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const myTimeout = setTimeout(() => {
      setMessage("");
    }, 7500);
    return () => clearTimeout(myTimeout);
  }, [messageChange]);

  let logoV = Object.values(logo);

  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full h-screen bg-[#3e3e3f] grid place-items-center">
        <div>
          {" "}
          <Link href="/">
            <div className="w-[30%] m-auto cursor-pointer">
              <img
                src={logoV[0].src}
                alt=""
                className="object-contain w-full"
              />
            </div>
          </Link>
          <div className="md:w-[520px] max-w-[96%] bg-[#323232] m-auto rounded-xl p-5 shadow-2xl mt-4">
            <h2 className="font-medium text-4xl text-center">Login</h2>
            <form action="" className="space-y-4 mt-6">
              <div className="flex flex-col md:flex-row">
                <div className="w-[90px]">Username:</div>
                <div className="flex-1 color-black">
                  <input
                    onChange={(e) => setUserName(e.target.value)}
                    type="text"
                    name="name"
                    className="w-full py-1 rounded-lg bg-[#f0f0f0] text-black pl-2"
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row">
                <div className="w-[90px]">Password:</div>
                <div className="flex-1 color-black">
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    name="name"
                    className="w-full py-1 rounded-lg bg-[#f0f0f0] text-black pl-2"
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <div>user/123123123</div>
                <div>admin/123123123</div>
              </div>
              <div className="flex space-x-2">
                <div>Chưa có tài khoản? </div>
                <Link href="/register">
                  <div className="cursor-pointer ml-2 font-bold">Đăng ký</div>
                </Link>
                <div>|</div>
                <Link href="/">
                  <div className="cursor-pointer ml-2 font-bold">
                    Trở về trang chủ
                  </div>
                </Link>
              </div>
              {message && (
                <div className="text-red-600 w-full flex justify-center">
                  <div>{message}</div>
                </div>
              )}
              <div
                className="m-auto flex items-center justify-center py-2 rounded-2xl mt-3 bg-[#0071e3] cursor-pointer "
                onClick={loginAut}
              >
                <div className="text-lg font-semibold ">Login</div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
