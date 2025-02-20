"use client";

import { useEffect, useState } from "react";
import fetchUsers from "../utils/api/UserFetcher";
import { User } from "../utils/interfaces/User";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers
      .getUserProfile()
      .then((data) => {
        console.log("Fetched user profile:", data);
        setUser(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching user profile:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center text-gray-600">Laddar profil...</div>;
  if (!user) return <div className="text-center text-red-500">Ingen användarinformation tillgänglig.</div>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold">{user.firstname} {user.lastname}</h2>
      <p className="text-gray-600">E-post: {user.email}</p>
      <p className="text-gray-600">Telefon: {user.phone}</p>

      <h3 className="mt-4 font-semibold">Adresser:</h3>
      <ul className="list-disc list-inside text-sm">
        {user.addresses.map(address => (
          <li key={address.id}>
            {address.street}, 
            {address.city}, {address.zip},
            {address.country}
          </li>
        ))}
      </ul>
    </div>
  );
}
