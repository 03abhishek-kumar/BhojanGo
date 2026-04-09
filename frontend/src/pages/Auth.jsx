import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, User, ArrowRight, AlertCircle, ChefHat } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        if (!name) {
          setError("Please enter your name");
          setIsLoading(false);
          return;
        }
        await register(name, email, password);
      }
      navigate("/"); // Redirect to home on success
    } catch (err) {
      setError(err.message.replace("Firebase: ", ""));
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
      <div className="relative w-full max-w-md overflow-hidden bg-white rounded-3xl shadow-2xl shadow-orange-200 border border-orange-100">
        
        {/* Decorative Top Banner */}
        <div className="h-32 bg-gradient-to-r from-[#F4521E] to-[#FF8A65] flex items-center justify-center p-6 relative">
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm pointer-events-none"></div>
          <Link to="/" className="z-10 flex items-center gap-3 no-underline group">
            <div className="bg-white p-2 text-[#F4521E] rounded-xl shadow-lg transform group-hover:scale-105 transition-all">
               <ChefHat size={32} />
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
              BhojanGo
            </h1>
          </Link>
        </div>

        {/* Content */}
        <div className="p-8 pt-10 relative">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
              {isLogin ? "Welcome Back" : "Join the Feast"}
            </h2>
            <p className="text-gray-500 mt-2 text-sm">
              {isLogin
                ? "Sign in to pick up where you left off"
                : "Create an account to start your culinary journey"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="flex items-center gap-2 p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 animate-pulse">
               <AlertCircle size={18} />
               <span>{error}</span>
              </div>
            )}

            {!isLogin && (
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#F4521E] transition-colors">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F4521E]/30 focus:border-[#F4521E] transition-all"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#F4521E] transition-colors">
                <Mail size={20} />
              </div>
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F4521E]/30 focus:border-[#F4521E] transition-all"
                required
              />
            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400 group-focus-within:text-[#F4521E] transition-colors">
                <Lock size={20} />
              </div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#F4521E]/30 focus:border-[#F4521E] transition-all"
                required
                minLength={6}
              />
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm font-medium text-[#F4521E] hover:text-[#D84315] hover:underline"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#F4521E] hover:bg-[#E64A19] text-white font-semibold py-3.5 rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#F4521E]/30 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Sign Up"}
                  <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              onClick={toggleAuthMode}
              className="font-bold text-[#F4521E] hover:text-[#D84315] hover:underline"
            >
              {isLogin ? "Sign up now" : "Log in instead"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
