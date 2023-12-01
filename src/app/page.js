"use client";
import AddItemSection from "@/components/AddItemSection";
import Containers from "@/components/Containers";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import dynamic from "next/dynamic";
import RecycleBinSection from "@/components/RecycleBinSection";
import { groupItemsByType } from "@/lib/utils";

const InitialItems = [
  {
    id: 2091,
    title: "task2",
    desc: "description",
    type: "inprogess",
    date: "Thu Nov 23 2023 13:52:21 GMT+0530 (India Standard Time)",
    createdat: "Fri Nov 24 2023 13:52:21 GMT+0530 (India Standard Time)",
    updatedat: "2023-11-24T10:32:10.411Z",
  },
  {
    id: 5591,
    title: "Latest",
    desc: "new ",
    date: "2023-11-12T18:30:00.000Z",
    type: "inprogess",
    createdat: "2023-11-24T10:17:41.782Z",
    updatedat: "2023-11-24T10:32:15.277Z",
  },
  {
    id: 3428,
    title: "new",
    desc: "new task 4",
    type: "todo",
    date: "Tue Nov 21 2023 13:52:21 GMT+0530 (India Standard Time)",
    createdat: "Fri Nov 24 2023 13:52:21 GMT+0530 (India Standard Time)",
    updatedat: "2023-11-24T10:35:11.582Z",
  },
  {
    id: 9041,
    title: "task3",
    desc: "desc",
    type: "deleted",
    date: "Wed Nov 22 2023 13:52:21 GMT+0530 (India Standard Time)",
    createdat: "Fri Nov 24 2023 13:52:21 GMT+0530 (India Standard Time)",
    updatedat: "2023-11-24T10:45:15.714Z",
    prevType: "inprogess",
  },
  {
    id: 4428,
    title: "new",
    desc: "new task 7",
    type: "completed",
    date: "Sat Nov 18 2023 13:52:21 GMT+0530 (India Standard Time)",
    createdat: "Fri Nov 24 2023 13:52:21 GMT+0530 (India Standard Time)",
    updatedat: "Fri Nov 24 2023 13:52:21 GMT+0530 (India Standard Time)",
  },
  {
    id: 4091,
    title: "task8",
    desc: "description",
    type: "deleted",
    date: "Fri Nov 17 2023 13:52:21 GMT+0530 (India Standard Time)",
    createdat: "Fri Nov 24 2023 13:52:21 GMT+0530 (India Standard Time)",
    updatedat: "2023-11-24T10:45:17.849Z",
    prevType: "completed",
  },
  {
    id: 4041,
    title: "task9",
    desc: "desc",
    type: "completed",
    date: "Sat Nov 25 2023 13:52:21 GMT+0530 (India Standard Time)",
    createdat: "Fri Nov 24 2023 14:52:21 GMT+0530 (India Standard Time)",
    updatedat: "Fri Nov 24 2023 13:52:21 GMT+0530 (India Standard Time)",
  },
];

export default function Home() {
  const [tasks, setTasks] = useState(InitialItems || []);
  console.log(tasks);
  return (
    <main className="max-h-screen mx-auto max-w-5xl">
      <div className="flex flex-col gap-6">
        <AddItemSection tasks={tasks} setTasks={setTasks} />
        <Containers tasks={tasks} setTasks={setTasks} />
        <RecycleBinSection tasks={groupItemsByType(tasks, "deleted")} />
      </div>
    </main>
  );
}
