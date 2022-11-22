function register() {
    return (
        <div className="w-full h-screen bg-gradient-to-r from-cyan-500 to-blue-500 grid place-items-center">
            <div className="w-1/3 bg-[#3e3e3f] m-auto rounded-xl p-5 shadow-2xl">
                <h2 className="font-medium text-3xl text-center">Register</h2>
                <form action="" className="space-y-4 mt-6">
                    <div className="flex">
                        <div className="w-1/4">Email:</div>
                        <div className="flex-1 color-black">
                            <input
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
                                type="password"
                                name="name"
                                className="w-full py-1 rounded-lg bg-[#f0f0f0] text-black pl-2"
                            />
                        </div>
                    </div>
                    <div className="m-auto flex items-center justify-center py-2 rounded-2xl mt-3 bg-[#0071e3] cursor-pointer ">
                        <div className="text-lg font-semibold ">Register</div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default register;
