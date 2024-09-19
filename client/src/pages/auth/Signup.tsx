import { useState } from "react";
import { useSignUp } from "../../api/user";
import { Rabbit } from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { mutate: signUp, isPending, isSuccess } = useSignUp();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      signUp({ name, username, email, password });
      toast.success("Signup success!");
    } catch (error) {
      toast.error("Signup failed");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center gap-3 mb-8">
          <Rabbit className="h-20 w-20 text-gray-400" />
          <h1 className="text-4xl font-bold text-white">Keep</h1>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="label">
              Name
            </label>
            <input
              type="text"
              id="name"
              className="input w-full bg-gray-700"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="input w-full bg-gray-700"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <p className="mt-4 text-center text-green-500">Sign up successful!</p>
        )}
      </div>
    </div>
  );
};
