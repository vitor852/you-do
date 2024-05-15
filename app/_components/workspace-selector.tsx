"use client";

import { db } from "@/_lib/prisma";
import { Combobox } from "./combobox";
import { useContext, useEffect } from "react";
import { Board, WorkSpaceWithTasks } from "@/_contexts/board";

interface WorkspaceSelectorProps {
  workspaces: WorkSpaceWithTasks[];
}

const WorkspaceSelector = ({ workspaces }: WorkspaceSelectorProps) => {
  const { handleSelectWorkspace } = useContext(Board);

  return (
    <Combobox
      items={workspaces.map((workspace) => ({
        label: workspace.name,
        value: workspace.id,
      }))}
      onChange={(workspaceId) =>
        handleSelectWorkspace(
          workspaces.find((workspace) => workspace.id === workspaceId)!
        )
      }
      defaultValue={workspaces[0].id}
    />
  );
};

export default WorkspaceSelector;
