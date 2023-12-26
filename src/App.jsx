function App() {
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mt-10 rounded shadow-md md:w-[70%] mx-auto">
                <form>
                    <div className="p-6 flex justify-center">
                        <input
                            type="text"
                            className="pl-4 border border-r-0 py-2 focus:outline-none rounded-l-lg md:w-[65%]"
                            placeholder="Write your email"
                        />
                        <button className="bg-blue-700 rounded-r-lg px-7 py-3 border text-white text-sm lg:text-lg">
                            Search
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default App;
