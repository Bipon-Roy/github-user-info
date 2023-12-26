import { useState } from "react";
import GitHubCalendar from "react-github-calendar";
import "./App.css";
function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const handleSubmit = (e) => {
        e.preventDefault();
        const userName = e.target.user.value;
        console.log(userName);
        setLoading(true);
        fetch(
            `https://api.github.com/search/users?q=${userName}&per_page=${itemsPerPage}&page=${currentPage}`
        )
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                setUsers(res.items);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    if (loading) {
        return (
            <div className="flex justify-center items-center">
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }
    return (
        <div className="max-w-7xl mx-auto">
            <div className="mt-10 rounded shadow-md md:w-[70%] mx-auto">
                <form onSubmit={handleSubmit}>
                    <div className="p-6 flex justify-center">
                        <input
                            name="user"
                            type="text"
                            className="pl-4 border border-r-0 py-2 focus:outline-none rounded-l-lg md:w-[65%]"
                            placeholder="Search Github Username"
                        />
                        <button className="bg-blue-700 rounded-r-lg px-7 py-3 border text-white text-sm lg:text-lg">
                            Search
                        </button>
                    </div>
                </form>
            </div>
            <div>
                {users.map((user) => (
                    <div
                        className="my-8 shadow-md rounded-md max-w-fit mx-auto  p-8"
                        key={user?.id}
                    >
                        <div>
                            <div className="avatar flex justify-center">
                                <div className="w-24 rounded-full">
                                    <img src={user?.avatar_url} alt={user?.login} />
                                </div>
                            </div>
                            <div className="text-center mt-2 mb-1">
                                <p>{user?.login}</p>
                                <a
                                    href={user?.html_url}
                                    className="text-blue-600 font-medium"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Repository Link
                                </a>
                            </div>
                        </div>

                        <div className="flex flex-col justify-center items-center gap-3 mt-4">
                            <p className="text-sm font-medium bg-blue-400 text-white max-w-fit px-3 rounded-3xl">
                                Contribution Graph
                            </p>
                            <GitHubCalendar username={user?.login} colorScheme="light" />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex items-center justify-between gap-5 my-5">
                <button
                    className="font-medium bg-blue-400 text-white max-w-fit px-3 rounded-3xl"
                    onClick={handlePrevPage}
                >
                    Prev
                </button>
                <span className="font-medium">Page {currentPage}</span>
                <button
                    className="font-medium bg-blue-400 text-white max-w-fit px-3 rounded-3xl"
                    onClick={handleNextPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
}

export default App;
