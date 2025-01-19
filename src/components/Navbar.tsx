"use client";

import React, { useState } from "react";
import { Navbar, MobileNav, Typography, Button, IconButton, Input } from "@/components/MaterialTailwindWrapper";
import { useAuth } from "@/context/AuthContext";


export default function NavbarWithSearch() {
  const [openNav, setOpenNav] = useState(false);
  const { token, login, logout } = useAuth();

  React.useEffect(() => {
    if (token) {
      console.log("Token:", token);
    }
  }, [token]);



  const navList = (
    <ul className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
      <li><a href="#" className="text-blue-gray-700 hover:text-blue-500">Home</a></li>
      <li><a href="#" className="text-blue-gray-700 hover:text-blue-500">Categories</a></li>
      <li><a href="/about" className="text-blue-gray-700 hover:text-blue-500">About</a></li>
      <li><a href="#" className="text-blue-gray-700 hover:text-blue-500">Contact</a></li>
    </ul>
  );

  return (
    <Navbar className="max-w-screen mx-2 bg-white py-2">
      <div className="flex items-center justify-between">
        <Typography as="a" href="#" className="mr-4 text-xl font-bold text-blue-gray-700">MyStore</Typography>
        <div className="hidden lg:block">{navList}</div>
        <div className="hidden lg:flex items-center gap-2">
          <Input placeholder="Search" className="min-w-[200px]" />
          <Button>Search</Button>
        </div>
        <div className="flex items-center gap-4">
          <Button
            className="hidden lg:inline-block bg-blue-600 text-white"
            onClick={token ? logout : login} 
          >
            {token ? "Logga ut" : "Logga in"} 
          </Button>
        </div>
        <IconButton
          variant="text"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? <span>✖</span> : <span>☰</span>}
        </IconButton>
      </div>
    </Navbar>
  );
}
