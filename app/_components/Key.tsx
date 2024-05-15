import { cn } from "@/_lib/utils";

interface KeyProps {
  children: React.ReactNode;
  className?: string;
}

const Key = ({ children, className }: KeyProps) => {
  return (
    <div
      className={cn(
        "bg-muted-foreground rounded-md text-muted size-[25px] flex items-center justify-center text-xs",
        className
      )}
    >
      {children}
    </div>
  );
};

export default Key;
