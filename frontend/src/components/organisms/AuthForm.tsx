import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../atoms/Button";
import Input from "../atoms/Input";
import Spinner from "../atoms/Spinner";

import AuthSwitch from "../molecules/AuthSwitch";
import Brand from "../molecules/Brand";

import {
  login,
  register,
} from "../../services/authService";

type AuthMode = "login" | "register";

const AuthForm = () => {
  const navigate = useNavigate();

  const [mode, setMode] = useState<AuthMode>("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setError("");
    setIsLoading(true);

    try {
      if (mode === "register") {
        await register({
          name,
          email,
          password,
        });

        setMode("login");
        setPassword("");

        return;
      }

      await login({
        email,
        password,
      });

      navigate("/home");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const switchMode = () => {
    setError("");
    setPassword("");

    setMode((currentMode) =>
      currentMode === "login"
        ? "register"
        : "login",
    );
  };

  return (
    <section
      className="
        flex
        items-center
        justify-center
        bg-paper
        px-6
        py-14

        sm:px-10
        sm:py-16

        lg:min-h-screen
        lg:px-8
        lg:py-12
      "
    >
      <div className="w-full max-w-md">

        <div className="mb-14 lg:hidden">
          <Brand />
        </div>

        {/* Heading */}
        <div>
          <h1
            className="
              font-display
              text-3xl
              font-medium
              text-ink

              sm:text-4xl
            "
          >
            {mode === "login"
              ? "Welcome back."
              : "Start your memoir."}
          </h1>

          <p
            className="
              mt-3
              font-body
              text-[15px]
              leading-relaxed
              text-ink-muted
              sm:text-base
            "
          >
            {mode === "login"
              ? "Your thoughts are waiting for you."
              : "A place for your thoughts, ideas, and memories."}
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6 sm:mt-10 sm:space-y-7"
        >
          {/* Name */}
          {mode === "register" && (
            <div>
              <label
                htmlFor="name"
                className="
                  mb-2
                  block
                  font-body
                  text-sm
                  font-medium
                  text-ink
                "
              >
                Name
              </label>

              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                required
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="
                mb-2
                block
                font-body
                text-sm
                font-medium
                text-ink
              "
            >
              Email
            </label>

            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              required
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="
                mb-2
                block
                font-body
                text-sm
                font-medium
                text-ink
              "
            >
              Password
            </label>

            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              minLength={8}
              required
            />
          </div>

          {/* Error */}
          {error && (
            <p
              className="
                rounded-lg
                border
                border-red-200
                bg-red-50
                px-4
                py-3
                font-body
                text-sm
                text-red-700
              "
            >
              {error}
            </p>
          )}

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            disabled={isLoading}
            className="
              mt-3
              h-12
              w-full
              text-[15px]
            "
          >
            {isLoading ? (
              <Spinner />
            ) : mode === "login" ? (
              "Log in"
            ) : (
              "Create account"
            )}
          </Button>
        </form>

        {/* Auth Switch */}
        <div className="mt-8">
          <AuthSwitch
            text={
              mode === "login"
                ? "New to Memoir?"
                : "Already have an account?"
            }
            action={
              mode === "login"
                ? "Sign up"
                : "Log in"
            }
            onClick={switchMode}
          />
        </div>
      </div>
    </section>
  );
};

export default AuthForm;