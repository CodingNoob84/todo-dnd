import React, { useMemo } from "react";
import ItemCard from "./ItemCard";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, useSortable } from "@dnd-kit/sortable";

function BoxContainer({
  title,
  type,
  tasks,
  expand,
  handleExpand,
  RecentAddedId,
  RecentUpdatedId,
  handleDelete,
}) {
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);
  const { setNodeRef } = useSortable({
    id: type,
    data: {
      type: "Container",
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="border rounded-lg h-[500px] flex flex-col gap-2 shadow-md dark:shadow-blue-200 "
    >
      <div className="py-2 flex justify-center items-center gap-3 rounded-lg bg-red-100 dark:text-black">
        <div>{title}</div>
        <div className="bg-yellow-500 rounded-full w-7 h-7 flex items-center justify-center">
          <span className="text-white text-sm">{tasks.length || 0}</span>
        </div>
      </div>
      {/* <div className="bg-border h-[1px] w-full"></div> */}
      <div className="flex-grow flex-1 p-2 space-y-2 overflow-y-auto">
        <SortableContext items={tasksIds}>
          {tasks.map((task, index) => (
            <ItemCard
              key={index}
              index={index}
              task={task}
              parentid={type}
              expand={expand}
              handleExpand={handleExpand}
              RecentAddedId={RecentAddedId}
              RecentUpdatedId={RecentUpdatedId}
              handleDelete={handleDelete}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default BoxContainer;
