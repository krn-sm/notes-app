import { Link } from "react-router-dom"
import { ArrowLeft, FileQuestion } from "lucide-react"

import Button from "../components/atoms/Button"

const NotFoundPage = () => {
  return (
    <main
      className="
        flex
        min-h-screen
        items-center
        justify-center
        bg-paper
        px-6
      "
    >
      <section
        className="
          flex
          max-w-md
          flex-col
          items-center
          text-center
        "
      >
        <div
          className="
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-full
            border
            border-line
            bg-paper
            text-ink-muted
            shadow-sm
          "
        >
          <FileQuestion size={30} />
        </div>

        <p
          className="
            mt-8
            font-body
            text-sm
            font-medium
            tracking-widest
            text-ink-muted
          "
        >
          ERROR 404
        </p>

        <h1
          className="
            mt-3
            font-display
            text-4xl
            font-semibold
            text-ink
          "
        >
          Page not found
        </h1>

        <p
          className="
            mt-4
            font-body
            text-base
            leading-relaxed
            text-ink-muted
          "
        >
          Looks like this page got lost somewhere between
          your thoughts and memories.
        </p>

        <Link
          to="/home"
          className="mt-8"
        >
          <Button
            variant="primary"
            className="
              flex
              items-center
              gap-2
            "
          >
            <ArrowLeft size={18} />

            Back to notes
          </Button>
        </Link>
      </section>
    </main>
  )
}

export default NotFoundPage