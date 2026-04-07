import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth }     from "../contexts/AuthContext";

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(email, password);
    if (result.success) navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-logo">
          <span className="login-logo-icon">🏢</span>
        </div>
        <h1>Welcome Back</h1>
        <p className="subtitle">Sign in to your portal account</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              className="input"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@company.com"
              autoComplete="off"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="off"
              required
            />
          </div>

          {error && <p className="error-msg login-error">{error}</p>}

          <button
            className="btn btn-primary full-width"
            type="submit"
            disabled={loading}
          >
            {loading ? <span className="spinner" /> : null}
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>
      </div>
    </div>
  );
}