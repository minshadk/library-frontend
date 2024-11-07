import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import TextInput from "../components/Inputs/TextInput";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useAuthContext();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!userName || !password) {
      setError("Please fill in both username and password.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/user/login", {
        method: "POST",
        body: JSON.stringify({ userName, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      const json = await response.json();

      if (!response.ok) {
        console.log(json.message);
        setError(json.message || "Login failed. Please try again.");
        setIsLoading(false);
        return;
      }

      const { token, userType } = json.data.userData;
      localStorage.setItem("token", token);

      dispatch({ type: "LOGIN", payload: json.data.userData });

      if (userType === "admin") {
        navigate("/admin/home");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Login to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleFormSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <TextInput
              placeHolder="User Name"
              type="text"
              textValue={userName}
              setText={setUserName}
            />
            <TextInput
              placeHolder="Password"
              type="password"
              textValue={password}
              setText={setPassword}
            />
          </div>
          {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <div className="text-sm text-center mt-4">
          <span>Don't have an account? </span>
          <Link to="/signup" className="text-indigo-600 hover:text-indigo-500">
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
