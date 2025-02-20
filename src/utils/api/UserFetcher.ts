import { Console } from "console";
import { User } from "../interfaces/User";

const API_URL = "http://localhost:8081/api/user";

const fetchUsers = {
    registerUser: async (userData: User): Promise<User> => { 
        try {
          const response = await fetch(`${API_URL}/create-user`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });
    
          if (!response.ok) {
            throw new Error("Registrering misslyckades");
          }
    
          return await response.json(); //
        } catch (error) {
          console.error("Error vid registrering:", error);
          throw error;
        }
    },
    getUserProfile: () => {
        const token = localStorage.getItem("accessToken");

        return fetch(`${API_URL}/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch user profile");
            }
            return response.json();
        })
        .then((json) => json as User);
    }
};



export default fetchUsers;
