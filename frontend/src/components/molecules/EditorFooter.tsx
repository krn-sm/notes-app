type EditorFooterProps = {
  content: string;
};

const EditorFooter = ({ content }: EditorFooterProps) => {
  const getPlainText = (html: string) => {
    const element = document.createElement("div");

    element.innerHTML = html;

    return element.textContent ?? "";
  };

  const plainText = getPlainText(content);

  const wordCount = plainText.trim().split(/\s+/).filter(Boolean).length;

  return (
    <div
      className="
        flex
        shrink-0
        items-center
        justify-end
        border-t
        border-line
        pt-3
        sm:pt-4
      "
    >
      <p
        className="
          font-body
          text-xs
          text-ink-muted
          sm:text-sm
        "
      >
        {wordCount} {wordCount === 1 ? "word" : "words"}
      </p>
    </div>
  );
};

export default EditorFooter;
