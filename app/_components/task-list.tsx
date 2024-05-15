"use client";

import { useContext, useEffect, useState } from "react";
import TaskItem from "./task-item";
import { Separator } from "./ui/separator";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";
import { Pen, Trash2 } from "lucide-react";
import { Board } from "@/_contexts/board";
import { Task, TaskStatus } from "@prisma/client";

interface TaskListProps {
  title: string;
  status: TaskStatus;
}

const TaskList = ({ title, status }: TaskListProps) => {
  const { tasks } = useContext(Board);

  const filteredTasks = tasks?.filter((task) => task.status === status) || [];

  return (
    <div className="flex flex-col w-1/2 px-1 gap-2">
      <div className="flex items-center justify-between">
        <div className="flex gap-3 items-center">
          <h3 className="capitalize">{title}</h3>
          <span className="text-xs text-muted">
            {filteredTasks.length} Items
          </span>
        </div>
      </div>

      <Separator />

      <div className="flex flex-col gap-1 py-2">
        {filteredTasks?.map((task, index) => (
          <TaskItem key={task.id} task={task} hotKey={String(index)} />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
