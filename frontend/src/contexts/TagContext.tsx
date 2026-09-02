/* eslint-disable react-refresh/only-export-components */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getTags,
  type TagWithCount,
} from "../services/tagService";

type TagContextType = {
  tags: TagWithCount[];
  isLoading: boolean;

  setTags: React.Dispatch<
    React.SetStateAction<TagWithCount[]>
  >;

  refreshTags: () => Promise<void>;
};

const TagContext =
  createContext<TagContextType | undefined>(
    undefined,
  );

type TagProviderProps = {
  children: ReactNode;
};

export const TagProvider = ({
  children,
}: TagProviderProps) => {
  const [tags, setTags] =
    useState<TagWithCount[]>([]);

  const [isLoading, setIsLoading] =
    useState(true);

  const refreshTags = async () => {
    try {
      const response =
        await getTags();

      const sortedTags =
        [...response].sort(
          (a, b) =>
            b.note_count - a.note_count,
        );

      setTags(sortedTags);
    } catch (error) {
      console.error(
        "Failed to load tags:",
        error,
      );
    }
  };

  useEffect(() => {
    const initializeTags = async () => {
      await refreshTags();

      setIsLoading(false);
    };

    initializeTags();
  }, []);

  const value: TagContextType = {
    tags,
    isLoading,
    setTags,
    refreshTags,
  };

  return (
    <TagContext.Provider value={value}>
      {children}
    </TagContext.Provider>
  );
};

export const useTags = () => {
  const context =
    useContext(TagContext);

  if (!context) {
    throw new Error(
      "useTags must be used within a TagProvider",
    );
  }

  return context;
};