import React, { useEffect, useState } from "react";

function App() {
  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen p-8">
      <Pagination />
    </div>
  );
}

const Pagination = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await fetch("https://randomuser.me/api?results=19");
        const data = await response.json();
        const cleanedData = data.results.map((user) => ({
          name: `${user.name.first} ${user.name.last}`,
          age: user.dob.age,
          email: user.email,
        }));
        setUsers(cleanedData);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-gray-600 text-lg">Loading...</p>;
  }

  return (
    <div className="w-full max-w-xl bg-white shadow-md rounded-md p-6">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">User List</h1>
      <Pages content={users} itemsPerPage={itemsPerPage} />
    </div>
  );
};

const Pages = ({ content, itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(content.length / itemsPerPage);

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = content.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div>
      <ul className="space-y-4">
        {currentItems.map((user, index) => (
          <li
            key={index}
            className="border rounded-md p-4 bg-gray-50 shadow-sm hover:shadow-md transition"
          >
            <p>
              <strong>Name:</strong> {user.name}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
          </li>
        ))}
      </ul>
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageClick(index + 1)}
            className={`px-4 py-2 rounded-md ${
              index + 1 === currentPage
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-800"
            } hover:bg-blue-500 hover:text-white transition`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
