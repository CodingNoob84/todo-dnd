import React from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { MdOutlineRestore } from "react-icons/md";

function RecycleBinSection({ tasks }) {
  console.log(tasks);
  return (
    <div className="border rounded-lg h-[500px] mx-10 my-2">
      <div className="h-[50px] flex justify-center items-center">
        Recycle Bin
      </div>
      <div className="flex flex-col gap-4 px-4">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="border rounded-md shadow-md dark:shadow-red-300 p-2 flex items-center justify-between"
          >
            <div>{task.title}</div>
            <div className="flex flex-row">
              <Badge>{task.prevType}</Badge>
            </div>
            <div>
              <Button
                size={"sm"}
                variant={"secondary"}
                className="flex flex-row gap-2 text-sm"
              >
                {" "}
                <MdOutlineRestore />
                <span>Restore</span>
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecycleBinSection;
