export const loginUser = async (email, password) => {
  // Temporary mock authentication

  return {
    id: 1,
    name: "John",
    email,
  };
};

export const registerUser = async (name, email, password) => {
  // Temporary mock registration

  return {
    id: 1,
    name,
    email,
  };
};


// export const loginUser = async (email, password) => {
//   const response = await fetch("/api/auth/login", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     credentials: "include",
//     body: JSON.stringify({
//       email,
//       password,
//     }),
//   });

//   if (!response.ok) {
//     throw new Error("Login failed");
//   }

//   return response.json();
// };
