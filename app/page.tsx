import Header from "./_components/header";
import TaskInput from "./_components/task-input";
import TaskList from "./_components/task-list";
import { db } from "./_lib/prisma";

export default async function Home() {
  return (
    <main>
      <Header />

      <div className="flex flex-col items-center gap-5">
        <TaskInput />

        <TaskList title="todo" status="TODO" />
      </div>
    </main>
  );
}
