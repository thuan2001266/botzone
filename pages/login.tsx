import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useStore, actions } from "../store";

function login() {
    const [state, dispatch] = useStore();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const router = useRouter();
    let data;
    const loginAut = async () => {
        const response = await fetch(`http://localhost:8080/login`, {
            method: "POST",
            // mode: "no-cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                username: userName,
                password: password,
            }),
        });
        // .then((data) => {
        //     console.log(data);
        // })
        // .then((error) => console.log(error));

        // )
        try {
            data = await response.json();
            if (data.access_token) {
                console.log("ok");

                dispatch(actions.setToken(data.access_token));
                router.push("/");
            } else {
                setMessage(data.message);
            }
        } catch (e) {
            console.log(e);
        }
        // if (data.code == 1) {
        //     router.push("/");
        // }
    };

    return (
        <div className="w-full h-screen bg-[#3e3e3f] grid place-items-center">
            <div className="sm:w-2/3 md:w-1/3 lg:1/3 bg-[#323232] m-auto rounded-xl p-5 shadow-2xl">
                <h2 className="font-medium text-3xl text-center">Login</h2>
                <form action="" className="space-y-4 mt-6">
                    <div className="flex">
                        <div className="w-1/4">Username:</div>
                        <div className="w-3/4 flex-1 color-black">
                            <input
                                onChange={(e) => setUserName(e.target.value)}
                                type="text"
                                name="name"
                                className="w-full py-1 rounded-lg bg-[#f0f0f0] text-black pl-2"
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/4">Password:</div>
                        <div className="w-3/4 flex-1 color-black">
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                name="name"
                                className="w-full py-1 rounded-lg bg-[#f0f0f0] text-black pl-2"
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div>Chưa có tài khoản? </div>
                        <Link href="/register">
                            <div className="cursor-pointer ml-2 font-bold">
                                Đăng ký
                            </div>
                        </Link>
                    </div>
                    {message && <div className="text-red-600">{message}</div>}
                    <div
                        className="m-auto flex items-center justify-center py-2 rounded-2xl mt-3 bg-[#0071e3] cursor-pointer "
                        onClick={loginAut}
                    >
                        <div className="text-lg font-semibold ">Login</div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default login;
