"use client";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import React, { useMemo, useState } from "react";
import BoxContainer from "./BoxContainer";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import ItemCard from "./ItemCard";
import { getMostRecentItemId, groupItemsByType } from "@/lib/utils";

const defaultColumns = [
  {
    id: "todo",
    title: "Todo",
  },
  {
    id: "inprogess",
    title: "Work in progress",
  },
  {
    id: "completed",
    title: "Completed",
  },
];

function Containers({ tasks, setTasks }) {
  const [columns, setColumns] = useState(defaultColumns);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const [expand, setExpand] = useState(null);
  const [activeContainer, setActiveContainer] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const RecentAddedId = getMostRecentItemId(tasks);
  const RecentUpdatedId = getMostRecentItemId(tasks, "updatedat");
  const getTaskById = (id) => {
    return tasks.find((task) => task.id === id);
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              type: "deleted",
              updatedat: new Date(),
              prevType: task.type,
            }
          : task
      );
      return updatedTasks;
    });
  };

  const handleDragStart = (e) => {
    setExpand(null);
    //console.log(e.active.data.current);
    if (e.active.data.current?.type === "task") {
      setActiveTask(e.active.data.current.task);
      return;
    }
  };

  const handleDragOver = (e) => {
    console.log(activeTask);
    const { active, over } = e;
    if (!over) return;

    const activeId = active.id;
    console.log(activeId);
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "task";
    const isOverATask = over.data.current?.type === "task";

    if (!isActiveATask) return;

    // Im dropping a Task over another Task
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);
        const overIndex = tasks.findIndex((t) => t.id === overId);

        if (tasks[activeIndex].type != tasks[overIndex].type) {
          // Fix introduced after video recording
          tasks[activeIndex].type = tasks[overIndex].type;
          tasks[activeIndex].updatedat = new Date();
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Container";

    // Im dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.id === activeId);

        tasks[activeIndex].type = overId;
        tasks[activeIndex].updatedat = new Date();
        console.log("DROPPING TASK OVER COLUMN", { activeIndex });
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  const handleDragEnd = (e) => {
    setActiveContainer(null);
    setActiveTask(null);
    const { active, over } = e;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;
    //console.log("DRAG END");
    //console.log(tasks);
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleExpand = (id) => {
    if (expand == id) {
      setExpand(null);
    } else {
      setExpand(id);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      //onDragMove={handleDragMove}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="grid grid-flow-row grid-cols-3 gap-4">
        {defaultColumns.map((col, i) => (
          <BoxContainer
            title={col.title}
            type={col.id}
            tasks={groupItemsByType(tasks, col.id)}
            expand={expand}
            handleExpand={handleExpand}
            RecentAddedId={RecentAddedId}
            RecentUpdatedId={RecentUpdatedId}
            handleDelete={handleDelete}
          />
        ))}
        {/* <BoxContainer
          title={"Todo"}
          type="todo"
          tasks={groupItemsByType(tasks, "todo")}
          expand={expand}
          handleExpand={handleExpand}
        />
        <BoxContainer
          title={"InProgess"}
          type="inprogess"
          tasks={groupItemsByType(tasks, "inprogess")}
          expand={expand}
          handleExpand={handleExpand}
        />
        <BoxContainer
          title={"Completed"}
          type="completed"
          tasks={groupItemsByType(tasks, "completed")}
          expand={expand}
          handleExpand={handleExpand}
        /> */}
      </div>
      <DragOverlay>
        {activeTask && <ItemCard task={getTaskById(activeTask.id)} />}
      </DragOverlay>
    </DndContext>
  );
}

export default Containers;
