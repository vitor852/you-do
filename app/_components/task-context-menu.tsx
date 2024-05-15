import { Pen, Trash2 } from "lucide-react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "./ui/context-menu";

type Action = {
  icon: React.ReactNode;
  name: string;
  onClick(): void;
};

interface TaskContextMenuProps {
  children: React.ReactNode;
  actions: Action[];
}

const TaskContextMenu = ({ children, actions }: TaskContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{children}</ContextMenuTrigger>

      <ContextMenuContent>
        {actions.map(({ icon, onClick, name }) => (
          <ContextMenuItem
            key={name}
            onClick={onClick}
            className="flex items-center gap-2"
          >
            {icon}
            <span className="font-semibold">{name}</span>
          </ContextMenuItem>
        ))}
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default TaskContextMenu;
