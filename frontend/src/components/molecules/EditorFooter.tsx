type EditorFooterProps = {
  content: string
}

const EditorFooter = ({
  content,
}: EditorFooterProps) => {
  const getPlainText = (html: string) => {
    const element = document.createElement("div")

    element.innerHTML = html

    return element.textContent ?? ""
  }

  const plainText = getPlainText(content)

  const wordCount = plainText
    .trim()
    .split(/\s+/)
    .filter(Boolean).length

  return (
    <div
      className="
        flex
        items-center
        justify-end
        border-t
        border-line
        pt-4
      "
    >
      <p
        className="
          font-body
          text-sm
          text-ink-muted
        "
      >
        {wordCount} {wordCount === 1 ? "word" : "words"}
      </p>
    </div>
  )
}

export default EditorFooter