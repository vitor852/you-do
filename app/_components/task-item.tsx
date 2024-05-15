"use client";

import { CheckCircle, Circle, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useCallback, useContext, useEffect, useState } from "react";
import { updateTaskStatus } from "@/_actions/task";
import { Task, TaskStatus } from "@prisma/client";
import { toast } from "sonner";
import Key from "./Key";
import TaskContextMenu from "./task-context-menu";
import { Board } from "@/_contexts/board";

interface TaskItemProps {
  task: Task;
  hotKey: string;
}

const TaskItem = ({ task, hotKey }: TaskItemProps) => {
  const { inputRef } = useContext(Board);

  const [checked, setIsChecked] = useState(false);
  const [showHotKeys, setShowHotkeys] = useState(false);

  const toggleChecked = () => {
    setIsChecked((state) => !state);
  };

  const toggleIsOptionsOpen = () => setShowHotkeys((state) => !state);

  const handleUpdateTaskStatus = useCallback(
    (newStatus: TaskStatus, isUndo: boolean = false) => {
      const lastStatus = task.status;
      const promise = updateTaskStatus(task.id, newStatus);

      toast.promise(promise, {
        loading: "Updating task...",
        success: "Task updated! ✅",
        error: "It was not possible! ❌",
        action: !isUndo
          ? {
              label: "Undo",
              onClick: () => handleUpdateTaskStatus(lastStatus, true),
            }
          : undefined,
      });
    },
    [task.id, task.status]
  );

  const handleKeyPress = useCallback(
    (keyDownEvent: KeyboardEvent) => {
      const isInputFocused = document.activeElement === inputRef.current;

      if (isInputFocused) return;

      if (keyDownEvent.key.toLowerCase() === hotKey) {
        toggleIsOptionsOpen();
        return;
      }

      if (showHotKeys && keyDownEvent.key.toLocaleLowerCase() === "d") {
        handleUpdateTaskStatus("DELETED");
        setShowHotkeys(false);
        return;
      }

      setShowHotkeys(false);
    },
    [hotKey, setShowHotkeys, inputRef, handleUpdateTaskStatus, showHotKeys]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const actions = [
    {
      icon: <CheckCircle size={16} />,
      name: "Done",
      hotKey: "d",
      animationDuration: "100",
      onClick: () => handleUpdateTaskStatus("DONE"),
    },
    {
      icon: <Trash2 size={16} />,
      name: "Delete",
      hotKey: "r",
      animationDuration: "150",
      onClick: () => handleUpdateTaskStatus("DELETED"),
    },
  ];

  return (
    <TaskContextMenu actions={actions}>
      <div className="relative flex items-center justify-between hover:bg-foreground rounded-lg pr-2">
        <div className="flex items-center gap-1">
          <Button
            size="icon"
            variant="ghost"
            className="hover:bg-transparent hover:text-white"
            onClick={toggleChecked}
          >
            {checked ? <CheckCircle size={20} /> : <Circle size={20} />}
          </Button>

          <span>{task.title}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-muted text-xs">Nov 11</span>
          <Key>{hotKey}</Key>
        </div>

        {showHotKeys && (
          <div className="absolute flex gap-2 -right-[60px]">
            {actions.map((action) => (
              <Key
                key={action.name}
                className={`animate-in fade-in slide-in-from-bottom duration-${action.animationDuration}`}
              >
                {action.hotKey}
              </Key>
            ))}
          </div>
        )}
      </div>
    </TaskContextMenu>
  );
};

export default TaskItem;
