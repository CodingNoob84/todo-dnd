"use client";
import React, { useRef, useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { generateId } from "@/lib/utils";
import ThemeSwitcher from "./ThemeSwitcher";

import { RiDeleteBin6Fill } from "react-icons/ri";
import AddNewTaskModal from "./AddNewTaskModal";

function AddItemSection({ tasks, setTasks }) {
  const [open, setOpen] = useState(false);
  const titleref = useRef();
  const descref = useRef();
  const addItem = () => {
    const obj = {
      id: generateId(),
      title: titleref.current.value,
      desc: descref.current.value,
      type: "todo",
    };
    setItems([...items, obj]);

    setOpen(false);
  };

  return (
    <div className="mt-[50px] flex flex-row justify-between">
      <div className="text-xl font-bold">ToDo - App</div>
      <ThemeSwitcher />
      <div className="flex flex-row gap-4">
        <AddNewTaskModal tasks={tasks} setTasks={setTasks} />
        <Button className="flex flex-row gap-2">
          <RiDeleteBin6Fill />
          Recycle Bin
        </Button>
      </div>
    </div>
  );
}

export default AddItemSection;
