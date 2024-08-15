"use client";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { LuFileEdit } from "react-icons/lu";
import { FaPlus, FaRegCircleCheck } from "react-icons/fa6";

export default function Home() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState(null);

  function updateInput(value) {
    setInput(value);
  }

  function removeItem(id) {
    setItems(items.filter(i => i.id != id));
  }

  function addItem() {
    let value = input.trim();
    if (!value) return;
    setItems([...items, { name: value, done: false, id: new Date().getTime() }]);
    setInput("");
  }

  function editItem(id, newName) {
    let newItems = [];
    for (let item of items) {
      if (item.id === id) item.name = newName;
      newItems.push(item);
    }
    setItems(newItems);
  }

  function toggleItemState(id) {
    let newItems = [];
    for (let item of items) {
      if (item.id === id) item.done = !item.done;
      newItems.push(item);
    }
    setItems(newItems);
  }

  return (
    <>
      <div className="flex flex-col mx-[35%] items-center">
        <div className="m-2 border-gray-700 border-2 rounded-lg w-full">
          <div className="flex p-5 justify-center">
            <div className="flex flex-col justify-center">
              <h2 className="text-lg flex flex-col justify-center pr-3 font-bold">Your Tasks</h2>
              <p className="text-sm opacity-70">Hello!</p>
            </div>
            <p
              className={`w-20 h-20 text-black rounded-full flex justify-center items-center font-extrabold text-3xl ${
                items.filter(i => i.done).length === items.length ? "bg-green-600" : "bg-orange-600"
              }`}>
              {items.filter(i => i.done).length}/{items.length}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <form
            className="flex my-3 w-full"
            onSubmit={e => {
              addItem(e.target.value);
              e.preventDefault();
            }}>
            <input
              type="text"
              className="bg-gray-800 rounded-lg pl-2 focus:outline-none flex-grow py-2"
              placeholder="Write a new task"
              value={input}
              onChange={e => updateInput(e.target.value)}></input>
            <button type="submit" className="bg-orange-500 p-2 rounded-full text-black ml-2 hover:bg-orange-600">
              <FaPlus />
            </button>
          </form>
        </div>
        <div className="container">
          {" "}
          <p>
            {items.length
              ? items.map(i => (
                  <div className={`flex w-full p-2 border-2 my-2 rounded-lg border-gray-700 item`}>
                    {i.id !== editing ? (
                      <>
                        <input
                          type="checkbox"
                          onClick={() => toggleItemState(i.id)}
                          className={`appearance-none rounded-full w-6 h-6 mr-2 border-2 cursor-pointer ${
                            i.done ? "border-green-500 bg-green-500" : "border-orange-500"
                          }`}
                        />
                        <h2 onClick={() => setEditing(i.id)} className={`flex-grow ${i.done ? "line-through opacity-70" : ""}`}>
                          {i.name}
                        </h2>{" "}
                        <div className="flex">
                          {" "}
                          <button onClick={() => setEditing(i.id)}>
                            <LuFileEdit className="text-gray-500 hover:text-gray-200 transition-all text-2xl" />
                          </button>
                          <button onClick={() => removeItem(i.id)}>
                            <FaTrash className="text-gray-500 hover:text-red-700 transition-all ml-1 text-2xl" />
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <form className="flex w-full" onSubmit={() => setEditing(null)}>
                          <input
                            type="checkbox"
                            id="editingValue"
                            disabled
                            onClick={() => toggleItemState(i.id)}
                            className={`appearance-none rounded-full w-6 h-6 mr-2 border-2 disabled:cursor-not-allowed disabled:opacity-70 ${
                              i.done ? "border-green-500 bg-green-500" : "border-orange-500"
                            }`}
                          />
                          <input
                            type="text"
                            placeholder={i.name}
                            value={i.name}
                            autoFocus
                            className="flex-grow focus:outline-none bg-black"
                            onChange={e => editItem(i.id, e.target.value)}></input>
                          <button type="submit" onClick={() => setEditing(null)}>
                            <FaRegCircleCheck className="text-gray-500 hover:text-green-600 transition-all ml-1 text-2xl" />
                          </button>
                        </form>
                      </>
                    )}
                  </div>
                ))
              : ""}
          </p>
        </div>
      </div>
    </>
  );
}
