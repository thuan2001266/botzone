import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const loginAut = async () => {
        const response = await fetch(`http://localhost:8080/api/login`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: userName,
                password: password,
            }),
        });
        const data = await response.json();
        if (data.code == 1) {
            router.push("/");
        }
    };

    return (
        <div className="w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500 grid place-items-center">
            <div className="sm:w-2/3 md:w-1/3 lg:1/3 bg-[#3e3e3f] m-auto rounded-xl p-5 shadow-2xl">
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
