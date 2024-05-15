"use client";

import { Prisma, Task } from "@prisma/client";
import { createContext, useEffect, useRef, useState } from "react";

type BoardProviderProps = {
  children: React.ReactNode;
};

export type WorkSpaceWithTasks = Prisma.WorkspaceGetPayload<{
  include: {
    tasks: true;
  };
}>;

type BoardType = {
  tasks?: Task[];
  selectedWorkspace?: WorkSpaceWithTasks;
  inputRef: React.RefObject<HTMLInputElement>;
  handleSelectWorkspace(workspace: WorkSpaceWithTasks): void;
};

export const Board = createContext({} as BoardType);

export const BoardProvider = ({ children }: BoardProviderProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [selectedWorkspace, setSelectedWorkspace] =
    useState<BoardType["selectedWorkspace"]>();
  const [tasks, setTasks] = useState<BoardType["tasks"]>();
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleSelectWorkspace: BoardType["handleSelectWorkspace"] = (
    workspace
  ) => {
    setSelectedWorkspace(workspace);
  };

  useEffect(() => {
    if (!selectedWorkspace) return;

    setTasks(selectedWorkspace.tasks);
  }, [selectedWorkspace]);

  return (
    <Board.Provider
      value={{
        selectedWorkspace,
        handleSelectWorkspace,
        tasks,
        inputRef,
      }}
    >
      {children}
    </Board.Provider>
  );
};
