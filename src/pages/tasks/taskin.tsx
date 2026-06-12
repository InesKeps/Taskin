import Sidebar from "../../layouts/sidebar";
import Header from "../../layouts/header";
import { FaPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';
import type { RootState } from '../../redux/store';
import type { Task } from '../../types/task';
import { useNavigate } from "react-router";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';

const Taskin = () =>{
    const navigate = useNavigate();

    const tasks = useSelector((state: RootState) => state.tasks);

    const todoTasks = tasks.filter((task: Task) => task.status === 'todo');

    const [iPtask, setTask] = useState<Task[]>([]);

    function handleOnDrag(e: React.DragEvent, title: string, desc:string) {
        e.dataTransfer.setData("title", title);
        e.dataTransfer.setData("desc", desc);
    //      todoTasks?.forEach((task) => {
    //       if (task.title === e.dataTransfer.getData("title")) {
    //             [...iPtask.filter(t => t.title !== droppedTask.title), droppedTask]
    //     }
    // });
    }
    function handleOnDragOver(e: React.DragEvent) {
        e.preventDefault();
    }
    function handleOnDrop(e: React.DragEvent) {
        const droppedTask: Task = {
            id: uuidv4(), // ou une autre logique pour générer un ID
            title: e.dataTransfer.getData("title"),
            description: e.dataTransfer.getData("desc"),
            status: 'in-progress' // ou autre statut selon la colonne
        };

        setTask([...iPtask.filter(t => t.title !== droppedTask.title), droppedTask]);
        
    }


    return(
        <section className="grid grid-cols-[18%_82%] gap-x-8 grid-rows-[15%_75%_10%] bg-[#212845] overflow-hidden h-dvh">
            <Sidebar/>
            <Header/>
            <div className="col-start-2 col-end-3 row-start-2 row-end-4 flex justify-between gap-x-8 p-8 mr-8">
                <div className="flex relative flex-col items-center gap-4 rounded-md w-1/3 bg-[#fff]/15 p-4">
                    <h1 className="text-white font-medium">To do</h1>
                    <div className="flex flex-col gap-2 w-full">
                        {todoTasks.map((task) => (
                            <div 
                            key={task.id} draggable onDragStart={(e) => {handleOnDrag(e, task.title, task.description);}} 
                            className="text-white bg-[#212845] text-sm p-3 border-2 border-[#ed6d8b] rounded shadow cursor-grab">
                            <h2 className="font-medium pb-2">{task.title}</h2>
                            <p>{task.description}</p>
                            </div>
                        ))}
                    </div>
                    <div className="absolute bottom-2">
                        <button onClick={() => navigate("/addtask")} className='flex items-center gap-2 bg-[#ed6d8b] hover:bg-[#ec345f] cursor-pointer rounded-md py-1 px-3 text-sm text-white'>Add Task<FaPlus/></button>
                    </div>
                </div>
                <div onDragOver={handleOnDragOver} onDrop={handleOnDrop} className="flex flex-col items-center gap-4 rounded-md w-1/3 bg-[#fff]/15 p-4">
                    <h1 className="text-white font-medium">In  Progress</h1>
                    <div className="flex flex-col gap-2 w-full">
                        {iPtask.map((taskItem) => (
                            <div
                                key={taskItem.id}
                                className="text-white bg-[#212845] text-sm p-3 border-2 border-[#ed6d8b] rounded shadow cursor-grab"
                                draggable
                                onDragStart={(e) => handleOnDrag(e, taskItem.title, taskItem.description)}
                            >
                                <h2>{taskItem.title}</h2>
                                <p>{taskItem.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col items-center justify-between rounded-md w-1/3 bg-[#fff]/15 p-4">
                    <h1 className="text-white font-medium">Done</h1>

                </div>
            </div>
        </section>
    )
}

export default Taskin;