import { useStore, actions } from "../store";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";

function register() {
    const [state, dispatch] = useStore();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();
    let data;
    // useEffect(() => {
    const register = async () => {
        const response = await fetch(`http://localhost:8080/api/register`, {
            method: "POST",
            // mode: "no-cors",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
                name: userName,
                email: email,
                password: password,
            }),
        });
        try {
            data = await response.json();
            if (data.code == 0) {
                setError(data.message);
            } else {
                setError(data.message);
            }
        } catch (e) {
            console.log(e);
        }
    };
    // }, []);

    return (
        <div className="w-full h-screen bg-[#3e3e3f] grid place-items-center">
            <div className="w-1/3 bg-[#323232] m-auto rounded-xl p-5 shadow-2xl">
                <h2 className="font-medium text-3xl text-center">Register</h2>
                <form action="" className="space-y-4 mt-6">
                    <div className="flex">
                        <div className="w-1/4">Email:</div>
                        <div className="flex-1 color-black">
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                name="name"
                                className="w-full py-1 rounded-lg bg-[#f0f0f0] text-black pl-2"
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <div className="w-1/4">Username:</div>
                        <div className="flex-1 color-black">
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
                        <div>Đã có tài khoản? </div>
                        <Link href="/login">
                            <div className="cursor-pointer ml-2 font-bold">
                                Đăng nhập
                            </div>
                        </Link>
                        <div>hoặc</div>
                        <Link href="/">
                            <div className="cursor-pointer ml-2 font-bold">
                                Trở về trang chủ
                            </div>
                        </Link>
                    </div>

                    {error && <div className="text-red-600">{error}</div>}
                    <div className="m-auto flex items-center justify-center py-2 rounded-2xl mt-3 bg-[#0071e3] cursor-pointer ">
                        <div
                            className="text-lg font-semibold "
                            onClick={register}
                        >
                            Register
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default register;
