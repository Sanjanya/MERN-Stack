import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function UsersPage() {
    const [users, setUsers] = useState([]); // State to store user data
    const [error, setError] = useState(null); // State to store errors
    const [loading, setLoading] = useState(true); // State to handle loading state

    // Fetch users from the backend API when the component mounts
    useEffect(() => {
        const fetchUsers = async () => {
            try {
              const response = await fetch('http://localhost:3010/k-names');
              // Your backend API URL
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setUsers(data); // Store the data in the state
            } catch (error) {
                console.error('Error fetching users:', error);
                setError(error.message); // Set the error message
            } finally {
                setLoading(false); // Set loading to false after fetching is complete
            }
        };

        fetchUsers();
    }, []);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                <h1 className="text-2xl font-bold">Users whose names start with 'K'</h1>
                
                {/* Loading and error states */}
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                    <table className="border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">ID</th>
                                <th className="border border-gray-300 p-2">Name</th>
                                <th className="border border-gray-300 p-2">Email</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td className="border border-gray-300 p-2">{user.id}</td>
                                        <td className="border border-gray-300 p-2 font-bold">{user.name}</td> {/* Name displayed in bold */}
                                        <td className="border border-gray-300 p-2">{user.email}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="border border-gray-300 p-2 text-center">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </main>
            <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
                {/* Existing footer content */}
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/file.svg"
                        alt="File icon"
                        width={16}
                        height={16}
                    />
                    Learn
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/window.svg"
                        alt="Window icon"
                        width={16}
                        height={16}
                    />
                    Examples
                </a>
                <a
                    className="flex items-center gap-2 hover:underline hover:underline-offset-4"
                    href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <Image
                        aria-hidden
                        src="https://nextjs.org/icons/globe.svg"
                        alt="Globe icon"
                        width={16}
                        height={16}
                    />
                    Go to nextjs.org →
                </a>
            </footer>
        </div>
    );
}
