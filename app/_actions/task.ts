"use server";

import { db } from "@/_lib/prisma";
import { Prisma, TaskStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const createTask = async (taskProps: Prisma.TaskCreateInput) => {
  await db.task.create({
    data: taskProps,
  });

  revalidatePath("/");
};

export const updateTaskStatus = async (
  taskId: string,
  toStatus: TaskStatus
) => {
  await db.task.update({
    where: {
      id: taskId,
    },
    data: {
      status: toStatus,
    },
  });

  revalidatePath("/");
};
