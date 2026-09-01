import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react"

export type EditorFormatState = {
  bold: boolean
  italic: boolean
  underline: boolean
  bulletList: boolean
  orderedList: boolean
}

export type EditorContentHandle = {
  format: (command: string) => void
  insertChecklist: () => void
  getFormatState: () => EditorFormatState
  focus: () => void
}

type EditorContentProps = {
  value: string
  onChange: (value: string) => void
  onFormatChange?: (
    state: EditorFormatState,
  ) => void
  textSizeClassName?: string
}

const EditorContent = forwardRef<
  EditorContentHandle,
  EditorContentProps
>(
  (
    {
      value,
      onChange,
      onFormatChange,
      textSizeClassName = "text-lg",
    },
    ref,
  ) => {
    const editorRef = useRef<HTMLDivElement>(null)

    const updateFormatState = () => {
      const state: EditorFormatState = {
        bold: document.queryCommandState("bold"),
        italic: document.queryCommandState("italic"),
        underline:
          document.queryCommandState("underline"),
        bulletList:
          document.queryCommandState(
            "insertUnorderedList",
          ),
        orderedList:
          document.queryCommandState(
            "insertOrderedList",
          ),
      }

      onFormatChange?.(state)
    }

    useImperativeHandle(ref, () => ({
      format: (command: string) => {
        editorRef.current?.focus()

        document.execCommand(
          command,
          false,
        )

        if (editorRef.current) {
          onChange(
            editorRef.current.innerHTML,
          )
        }

        updateFormatState()
      },

      insertChecklist: () => {
        editorRef.current?.focus()

        document.execCommand(
          "insertHTML",
          false,
          `
            <div class="flex items-center gap-2 my-1">
              <input
                type="checkbox"
                class="h-4 w-4 accent-ink"
              />
              <span>Checklist item</span>
            </div>
          `,
        )

        if (editorRef.current) {
          onChange(
            editorRef.current.innerHTML,
          )
        }
      },

      getFormatState: () => ({
        bold: document.queryCommandState("bold"),
        italic:
          document.queryCommandState("italic"),
        underline:
          document.queryCommandState("underline"),
        bulletList:
          document.queryCommandState(
            "insertUnorderedList",
          ),
        orderedList:
          document.queryCommandState(
            "insertOrderedList",
          ),
      }),

      focus: () => {
        editorRef.current?.focus()
      },
    }))

    useEffect(() => {
      if (
        editorRef.current &&
        editorRef.current.innerHTML !== value
      ) {
        editorRef.current.innerHTML = value
      }
    }, [value])

    const handleInput = () => {
      if (!editorRef.current) {
        return
      }

      onChange(editorRef.current.innerHTML)

      updateFormatState()
    }

    const handleSelectionChange = () => {
      if (!editorRef.current) {
        return
      }

      const selection =
        window.getSelection()

      if (!selection?.anchorNode) {
        return
      }

      if (
        editorRef.current.contains(
          selection.anchorNode,
        )
      ) {
        updateFormatState()
      }
    }

    return (
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyUp={handleSelectionChange}
        onMouseUp={handleSelectionChange}
        onClick={handleSelectionChange}
        data-placeholder="Start writing..."
        className={`
          min-h-[400px]
          w-full
          whitespace-pre-wrap
          font-body
          ${textSizeClassName}
          leading-[2]
          text-ink
          outline-none

          empty:before
          empty:before:content-[attr(data-placeholder)]
          empty:before:text-ink-muted

          [&_ul]:my-4
          [&_ul]:list-disc
          [&_ul]:pl-6

          [&_ol]:my-4
          [&_ol]:list-decimal
          [&_ol]:pl-6

          [&_input[type=checkbox]]:cursor-pointer
        `}
      />
    )
  },
)

EditorContent.displayName = "EditorContent"

export default EditorContent