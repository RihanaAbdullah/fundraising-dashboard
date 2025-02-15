import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate("/dashboard");
  };

  return (
    <div className="login">
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
