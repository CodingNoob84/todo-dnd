import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import React, { useState } from "react";

import { HiChevronUp, HiChevronDown } from "react-icons/hi";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { IoMdTime } from "react-icons/io";
import { capitalizeFirstLetter, cn, formatDate } from "@/lib/utils";
import { useSortable } from "@dnd-kit/sortable";
import { Badge } from "./ui/badge";

function ItemCard({
  index,
  task,
  expand,
  handleExpand,
  RecentAddedId,
  RecentUpdatedId,
  handleDelete,
}) {
  //console.log("item", item);
  const { id, title, desc, type, date } = task;
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transition,
    transform,
  } = useSortable({
    id: id,
    data: {
      type: "task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      key={id}
      className={cn(
        "border rounded-lg p-2 text-sm shadow-lg dark:shadow-md dark:shadow-blue-200",
        isDragging && "opacity-50"
      )}
      style={style}
      {...listeners}
      {...attributes}
    >
      <div className="flex flex-col gap-2">
        <div className="flex flex-row justify-between ">
          <div
            className="flex flex-row items-center text-center text-sm font-bold"
            onClick={() => handleExpand(id)}
          >
            {expand === id ? <HiChevronUp /> : <HiChevronDown />}
            {capitalizeFirstLetter(title)}
          </div>
          <div className="flex flex-row gap-4">
            <div className="hover:text-green-600 hover:scale-125">
              <FaEdit />
            </div>
            <div
              className="hover:text-red-600 hover:scale-125"
              onClick={() => handleDelete(id)}
            >
              <AiOutlineDelete />
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Badge>
            <IoMdTime />
            <span>{formatDate(date)}</span>
          </Badge>
          {type === "inprogess" && index === 0 && (
            <Badge className=" bg-green-400">Priority</Badge>
          )}
          {RecentAddedId === id && (
            <Badge className=" bg-red-400">Newly added</Badge>
          )}
          {RecentUpdatedId === id && (
            <Badge className=" bg-orange-500">Recent update</Badge>
          )}
        </div>
      </div>

      {expand === id && <div className="p-2">{desc}</div>}
    </div>
  );
}

export default ItemCard;
