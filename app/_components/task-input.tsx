"use client";

import { ChevronUp } from "lucide-react";
import { Input } from "./ui/input";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { createTask } from "@/_actions/task";
import { Board } from "@/_contexts/board";
import { toast } from "sonner";
import Key from "./Key";

const TaskInput = () => {
  const { selectedWorkspace, inputRef } = useContext(Board);

  const [inputValue, setInputValue] = useState("");

  const focusInput = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.focus();
  }, [inputRef]);

  const unfocusInput = useCallback(() => {
    if (!inputRef.current) return;
    inputRef.current.blur();
    clearInput();
  }, [inputRef]);

  const clearInput = () => {
    setInputValue("");
  };

  const handleKeyPress = useCallback(
    (keyDownEvent: KeyboardEvent) => {
      if (keyDownEvent.ctrlKey && keyDownEvent.key.toLowerCase() === "s") {
        focusInput();
      }

      if (
        keyDownEvent.code === "Escape" &&
        keyDownEvent.target === inputRef.current
      ) {
        unfocusInput();
      }
    },
    [unfocusInput, focusInput, inputRef]
  );

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const submitTask: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    const createTaskPromise = createTask({
      title: inputValue,
      description: "teste",
      due_date: new Date(),
      workspace: {
        connect: {
          id: selectedWorkspace?.id,
        },
      },
    }).then(clearInput);

    toast.promise(createTaskPromise, {
      loading: "Creating task...",
      success: "Task created! 🎉",
      error: "Error creating task! 😵",
    });
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <form className="relative w-1/2" onSubmit={submitTask}>
      <Input
        placeholder="Input your task"
        value={inputValue}
        ref={inputRef}
        onChange={handleInputChange}
      />

      <div className="absolute right-[10px] top-[7px] flex gap-1">
        <Key>
          <ChevronUp size={16} />
        </Key>

        <Key>S</Key>
      </div>
    </form>
  );
};

export default TaskInput;
