import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const Login = () => {
  const { loginWithGoogle, loginWithEmailPassword, signUpWithEmailPassword, user } = useAuth();
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleGoogleSignIn = async () => {
    try {
      const result = await loginWithGoogle(); // Google Sign-In
      if (!result) throw new Error("Google Sign-In failed");

      const { uid, email, displayName } = result.user;

      const response = await fetch("https://task-manager-server-two-iota.vercel.app/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: uid, email, displayName }),
      });

      if (response.ok) {
        toast.success("Login successful! User data saved.");
        navigate("/manage-task");
      } else {
        toast.error("Failed to save user data.");
      }
    } catch (error) {
      toast.error("Google Sign-In Failed.");
      console.error(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from submitting in the default way
  
    try {
      let result;
      if (isSignUp) {
        result = await signUpWithEmailPassword(formData.email, formData.password); // Sign Up
        if (result) {
          toast.success("Sign Up successful!");
  
          // Get user details
          const { uid, email, displayName } = result.user;
  
          // Save user data to the database
          const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: uid,
              email,
              displayName: displayName || formData.email,
            }),
          });
  
          if (response.ok) {
            toast.success("User data saved.");
            navigate("/manage-task");
          } else {
            toast.error("Failed to save user data.");
          }
        }
      } else {
        result = await loginWithEmailPassword(formData.email, formData.password); // Sign In
        if (result) {
          toast.success("Login successful!");
  
          // Get user details
          const { uid, email, displayName } = result.user;
  
          // Save user data to the database
          const response = await fetch("https://task-manager-server-two-iota.vercel.app/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId: uid,
              email,
              displayName: displayName || formData.email,
            }),
          });
  
          if (response.ok) {
            toast.success("User data saved.");
            navigate("/manage-task");
          } else {
            toast.error("Failed to save user data.");
          }
        }
      }
    } catch (error) {
      toast.error("Authentication Failed.");
      console.error(error);
    }
  };
  

  const toggleForm = () => setIsSignUp(!isSignUp);

  return (
    <div className="hero min-h-screen flex items-center justify-center">
      <div className="card bg-base-100 w-full max-w-md shadow-2xl p-6">
        <h2 className="text-center text-2xl font-semibold mb-4">
          {isSignUp ? "Create an Account" : "Sign In"}
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered w-full"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered w-full"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />
          <button type="submit" className="btn btn-primary w-full">
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <div className="divider">OR</div>

        <button
          onClick={handleGoogleSignIn}
          className="btn bg-white hover:shadow-2xl w-full flex items-center justify-center"
        >
          <FcGoogle className="text-2xl mr-2" />
          Sign in with Google
        </button>

        <p className="text-center mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <span className="text-blue-500 cursor-pointer" onClick={toggleForm}>
            {isSignUp ? "Sign In" : "Sign Up"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
