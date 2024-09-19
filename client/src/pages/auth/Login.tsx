import { Rabbit } from "lucide-react";
import { useState } from "react";
import { useLogin } from "../../api/user";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: login, isPending, isSuccess } = useLogin();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      login({ username, password });
      toast.success("Login successful");
    } catch (error) {
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-3 mb-8">
          <Rabbit className="h-20 w-20 text-gray-400" />
          <h1 className="text-4xl font-bold text-white">Keep</h1>
        </div>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="username" className="label">
              Username
            </label>
            <input
              type="text"
              id="username"
              className="input w-full bg-gray-700"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password" className="label">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="input w-full bg-gray-700"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="pt-4">
            <button
              type="submit"
              disabled={isPending}
              className="btn btn-primary "
            >
              {isPending ? "Signing Up..." : "Sign Up"}
            </button>
            <p className="text-gray-400 py-3">
              Already have one?{" "}
              <Link to="/login" className="underline">
                Log in
              </Link>
            </p>
          </div>
        </form>
        {isSuccess && (
          <p className="mt-4 text-center text-green-500">Log in successful!</p>
        )}
      </div>
    </div>
  );
};
