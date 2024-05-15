import { ListChecks } from "lucide-react";

import Profile from "./profile";
import WorkspaceSelector from "./workspace-selector";
import { db } from "@/_lib/prisma";

const Header = async () => {
  const workspaces = await db.workspace.findMany({
    include: {
      tasks: true,
    },
  });

  return (
    <div className="flex items-center p-5 justify-between">
      <div className="flex items-center gap-3">
        <div className="flex gap-3 items-center">
          <ListChecks size={20} />
          <span className="font-black">YOUDO</span>
        </div>

        <span className="text-muted">/</span>

        <WorkspaceSelector workspaces={workspaces} />
      </div>

      <Profile />
    </div>
  );
};

export default Header;
