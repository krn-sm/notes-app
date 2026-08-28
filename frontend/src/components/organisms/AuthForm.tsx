import { useState } from "react"

import Button from "../atoms/Button"
import Input from "../atoms/Input"
import AuthSwitch from "../molecules/AuthSwitch"

const AuthForm = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log({
      email,
      password,
    })
  }

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
            Welcome back.
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
            Your thoughts are waiting for you.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="mt-10 space-y-7"
        >
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
              placeholder="Enter your password"
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
            Log in
          </Button>
        </form>

        {/* Auth Switch */}
        <div className="mt-8">
          <AuthSwitch
            text="New to Memoir?"
            action="Sign up"
            to="/register"
          />
        </div>
      </div>
    </section>
  )
}

export default AuthForm