type EditorTitleProps = {
  value: string;
  onChange: (value: string) => void;
};

const EditorTitle = ({ value, onChange }: EditorTitleProps) => {
  return (
    <input
      type="text"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Untitled"
      className="
        block
        w-full
        bg-transparent
        font-display
        text-[26px]
        font-semibold
        leading-tight
        text-ink
        outline-none
        placeholder:text-ink-muted
      "
    />
  );
};

export default EditorTitle;
