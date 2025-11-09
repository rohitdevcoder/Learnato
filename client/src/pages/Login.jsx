import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";

function Login() {
  const { setShowUserLogin , axios} = useAppContext();
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");

const onSubmitHandeler = async (e) => {
    e.preventDefault();

    let payload = { email, password };
    let url = `${import.meta.env.API_URL}/api/login`;

    if (state === "register") {
      payload = { name, email, password, role };
      url = `${import.meta.env.API_URL}/api/register`;
    }

    try {
      const response = await axios.post(url, payload);
      
      // Get the token from the response
      const { token } = response.data;

      // Save the token to local storage
      localStorage.setItem("token", token);
      
      // Close the modal
      setShowUserLogin(false);
      
      alert(state === 'login' ? 'Login successful!' : 'Registration successful!');
      // You might want to reload the page or update app context here
      
    } catch (err) {
      // Handle errors
      console.error("Authentication error:", err.response?.data?.msg || err.message);
      alert(err.response?.data?.msg || "An error occurred.");
    }
  };
  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 flex items-center text-sm  text-gray-600 bg-black/70 z-30"
    >
      <form
        onSubmit={onSubmitHandeler}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-primary">User</span>{" "}
          {state === "login" ? "Login" : "Sign Up"}
        </p>
        {state === "register" && (
          <div  className="w-full">
            <div className="w-full mb-2">
              <p>Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                placeholder="type here"
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
                type="text"
                required
              />
            </div>
            <div className="flex flex-col gap-2 w-full max-w-sm">
              <label
                htmlFor="role"
              >
                Select Role
              </label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 bg-white text-gray-800 focus:ring-2 focus:ring-black focus:outline-none"
              >
                <option value="student">Student</option>
                <option value="instructor">Instructor</option>
              </select>
            </div>
          </div>
        )}
        <div className="w-full ">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="email"
            required
          />
        </div>
        <div className="w-full ">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            placeholder="type here"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-primary"
            type="password"
            required
          />
        </div>
        {state === "register" ? (
          <p>
            Already have account?{" "}
            <span
              onClick={() => setState("login")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        ) : (
          <p>
            Create an account?{" "}
            <span
              onClick={() => setState("register")}
              className="text-primary cursor-pointer"
            >
              click here
            </span>
          </p>
        )}
        <button className="bg-primary hover:bg-gray-800 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
