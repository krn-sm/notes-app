import { useState } from "react";

import Button from "../atoms/Button";
import Input from "../atoms/Input";
import AuthSwitch from "../molecules/AuthSwitch";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLogin) {
      console.log({
        email,
        password,
      });
    } else {
      console.log({
        name,
        email,
        password,
      });
    }
  };

  const handleSwitch = () => {
    setIsLogin((previous) => !previous);

    setName("");
    setEmail("");
    setPassword("");
  };

  return (
    <section
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-paper
        px-8
        py-12
      "
    >
      <div className="w-full max-w-md">
        <div
          key={isLogin ? "login" : "register"}
          className="
            animate-in
            fade-in
            duration-300
          "
        >
          {/* Heading */}
          <div>
            <h1
              className="
                font-display
                text-4xl
                font-medium
                text-ink
              "
            >
              {isLogin ? "Welcome back." : "Begin your story."}
            </h1>

            <p
              className="
                mt-3
                font-body
                text-base
                leading-relaxed
                text-ink-muted
              "
            >
              {isLogin
                ? "Your thoughts are waiting for you."
                : "Give your thoughts a place to stay."}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-10 space-y-7">
            {/* Name — Register only */}
            {!isLogin && (
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
                  onChange={(event) => setName(event.target.value)}
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
                onChange={(event) => setEmail(event.target.value)}
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
                placeholder={
                  isLogin ? "Enter your password" : "Create a password"
                }
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              className="
                mt-3
                h-12
                w-full
                text-[15px]
              "
            >
              {isLogin ? "Log in" : "Create account"}
            </Button>
          </form>

          {/* Auth Switch */}
          <div className="mt-8">
            <AuthSwitch
              text={isLogin ? "New to Memoir?" : "Already have an account?"}
              action={isLogin ? "Sign up" : "Log in"}
              onClick={handleSwitch}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthForm;
