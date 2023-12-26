import { useState } from "react";
import GitHubCalendar from "react-github-calendar";

function App() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        const userName = e.target.user.value;
        console.log(userName);

        fetch(`https://api.github.com/search/users?q=${userName}`)
            .then((res) => res.json())
            .then((res) => {
                setLoading(true);
                console.log(res);
                setUsers(res.items);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
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
                    <div className="mt-8 flex justify-center gap-6 items-center" key={user?.id}>
                        <div>
                            <div className="avatar flex justify-center">
                                <div className="w-24 rounded-full">
                                    <img src={user?.avatar_url} alt={user?.login} />
                                </div>
                            </div>
                            <div className="text-center mt-2">
                                <p>{user?.login}</p>
                                <a className="text-blue-600 font-medium" href="{user?.html_url}">
                                    Repository Link
                                </a>
                            </div>
                        </div>

                        <div>
                            <GitHubCalendar username={user?.login} colorScheme="light" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
