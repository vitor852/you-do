"use client";

import { Avatar, AvatarFallback } from "./ui/avatar";

const Profile = () => {
  return (
    <div className="flex items-center gap-3">
      <Avatar className="size-8 text-sm">
        <AvatarFallback>VC</AvatarFallback>
      </Avatar>

      <span className="text-muted">Vitor</span>
    </div>
  );
};

export default Profile;
