import { Check, Pencil, Tag, Trash2, X } from "lucide-react";

import { useState } from "react";

import Button from "../atoms/Button";
import Drawer from "../molecules/Drawer";

import { useToast } from "../../contexts/ToastContext";
import getErrorMessage from "../../utils/getErrorMessage";

import {
  deleteTag,
  updateTag,
  type TagWithCount,
} from "../../services/tagService";

type TagsDrawerProps = {
  isOpen: boolean;
  onClose: () => void;

  tags: TagWithCount[];

  onTagsChange: React.Dispatch<React.SetStateAction<TagWithCount[]>>;
};

const TagsDrawer = ({
  isOpen,
  onClose,
  tags,
  onTagsChange,
}: TagsDrawerProps) => {
  const { showToast } = useToast();

  const [editingTagId, setEditingTagId] = useState<number | null>(null);

  const [editingName, setEditingName] = useState("");

  const handleStartEditing = (tag: TagWithCount) => {
    setEditingTagId(tag.id);
    setEditingName(tag.name);
  };

  const handleCancelEditing = () => {
    setEditingTagId(null);
    setEditingName("");
  };

  const handleSaveTag = async (tagId: number) => {
    const trimmedName = editingName.trim();

    if (!trimmedName) {
      return;
    }

    try {
      const updatedTag = await updateTag(tagId, {
        name: trimmedName,
      });

      onTagsChange((currentTags) =>
        currentTags.map((tag) =>
          tag.id === tagId
            ? {
                ...tag,
                name: updatedTag.name,
              }
            : tag,
        ),
      );

      handleCancelEditing();
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    }
  };

  const handleDeleteTag = async (tagId: number) => {
    try {
      await deleteTag(tagId);

      onTagsChange((currentTags) =>
        currentTags.filter((tag) => tag.id !== tagId),
      );
    } catch (error) {
      showToast(getErrorMessage(error), "error");
    }
  };

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose}>
        {/* Header */}

        <header
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-line
            px-7
            py-6
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-xl
                bg-gold/10
                text-gold
              "
            >
              <Tag size={20} />
            </div>

            <div>
              <h2
                className="
                  font-heading
                  text-xl
                  text-ink
                "
              >
                Tags
              </h2>

              <p
                className="
                  mt-1
                  font-body
                  text-sm
                  text-ink-muted
                "
              >
                Manage your tags
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={onClose}
            aria-label="Close tags drawer"
            className="
              h-10
              w-10
              !p-0
            "
          >
            <X size={20} />
          </Button>
        </header>

        {/* Tags List */}

        <div
          className="
            min-h-0
            flex-1
            overflow-y-auto
            px-5
            py-5
          "
        >
          {tags.length === 0 ? (
            <div
              className="
                flex
                flex-col
                items-center
                justify-center
                py-20
                text-center
              "
            >
              <Tag
                size={40}
                strokeWidth={1.5}
                className="
                  text-ink-muted/40
                "
              />

              <p
                className="
                  mt-4
                  font-body
                  text-sm
                  text-ink-muted
                "
              >
                No tags yet.
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {tags.map((tag) => {
                const isEditing = editingTagId === tag.id;

                return (
                  <div
                    key={tag.id}
                    className="
                      group
                      flex
                      min-h-14
                      items-center
                      gap-3
                      rounded-xl
                      border
                      border-line
                      bg-paper
                      px-4
                      py-3
                      transition
                      hover:bg-paper-dark
                    "
                  >
                    <Tag
                      size={18}
                      strokeWidth={1.7}
                      className="
                        shrink-0
                        text-gold
                      "
                    />

                    <div className="min-w-0 flex-1">
                      {isEditing ? (
                        <input
                          autoFocus
                          value={editingName}
                          onChange={(event) =>
                            setEditingName(event.target.value)
                          }
                          onKeyDown={(event) => {
                            if (event.key === "Enter") {
                              handleSaveTag(tag.id);
                            }

                            if (event.key === "Escape") {
                              handleCancelEditing();
                            }
                          }}
                          className="
                            w-full
                            rounded-lg
                            border
                            border-gold
                            bg-paper
                            px-3
                            py-1.5
                            font-body
                            text-sm
                            text-ink
                            outline-none
                          "
                        />
                      ) : (
                        <p
                          className="
                            truncate
                            font-body
                            text-[15px]
                            text-ink
                          "
                        >
                          {tag.name}
                        </p>
                      )}
                    </div>

                    {!isEditing && (
                      <span
                        className="
                          shrink-0
                          rounded-full
                          bg-gold/10
                          px-2.5
                          py-1
                          font-body
                          text-xs
                          text-gold-dark
                        "
                      >
                        {tag.note_count}
                      </span>
                    )}

                    <div
                      className="
                        flex
                        shrink-0
                        items-center
                        gap-1
                      "
                    >
                      {isEditing ? (
                        <>
                          <Button
                            variant="ghost"
                            onClick={() => handleSaveTag(tag.id)}
                            className="
                              h-8
                              w-8
                              !p-0
                              text-gold
                            "
                            aria-label="Save tag"
                          >
                            <Check size={17} />
                          </Button>

                          <Button
                            variant="ghost"
                            onClick={handleCancelEditing}
                            className="
                              h-8
                              w-8
                              !p-0
                            "
                            aria-label="Cancel editing"
                          >
                            <X size={17} />
                          </Button>
                        </>
                      ) : (
                        <>
                          <Button
                            variant="ghost"
                            onClick={() => handleStartEditing(tag)}
                            className="
                              h-8
                              w-8
                              !p-0
                              opacity-0
                              transition-opacity
                              group-hover:opacity-100
                            "
                            aria-label={`Rename ${tag.name}`}
                          >
                            <Pencil size={16} />
                          </Button>

                          {tag.note_count === 0 && (
                            <Button
                              variant="ghost"
                              onClick={() => handleDeleteTag(tag.id)}
                              className="
                                h-8
                                w-8
                                !p-0
                                text-red-400
                                opacity-0
                                transition-opacity
                                hover:!bg-red-50
                                hover:!text-red-500
                                group-hover:opacity-100
                              "
                              aria-label={`Delete ${tag.name}`}
                            >
                              <Trash2 size={16} />
                            </Button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}

        <footer
          className="
            shrink-0
            border-t
            border-line
            px-7
            py-4
          "
        >
          <p
            className="
              font-body
              text-xs
              text-ink-muted
            "
          >
            Tags with notes cannot be deleted.
          </p>
        </footer>
      </Drawer>
    </>
  );
};

export default TagsDrawer;
