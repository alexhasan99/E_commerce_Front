"use client";

import Profile from "@/components/Profile";

export default function ProfilePage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto py-16 px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Min Profil</h1>
        <Profile />
      </div>
    </div>
  );
}
