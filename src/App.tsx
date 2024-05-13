import React, { useEffect, useState } from "react";
import "./styles/index.scss";
import requests from "./requests";
import { XIcon } from "lucide-react";

interface Note {
  id: number;
  title: string;
  content: string;
}

function App() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    requests.get("http://localhost:3000/notes").then((response) => {
      setNotes(response.data);
    });
  }, []);

  return (
    <div className="App p-3">
      <header className="text-lg font-semibold"> Notes App </header>
      <div className="p-3 flex space-x-4">
        <div className="min-w-[320px] space-y-2">
          {notes.map((note) => (
            <div className="border p-2 rounded-md relative min-h-[120px]" key={note.id}>
              <div
                className="absolute top-1 right-1 p-0.5 bg-primary text-white rounded-md cursor-pointer"
                onClick={() => {
                  requests.delete(`http://localhost:3000/notes/${note.id}`).then(() => {
                    setNotes(notes.filter((t) => t.id !== note.id));
                  });
                }}
              >
                <XIcon size={16}></XIcon>
              </div>
              <div className="font-semibold"> {note.title} </div>
              <div className=""> {note.content} </div>
            </div>
          ))}
        </div>
        <div className="min-w-[320px] space-y-2 border p-4 rounded">
          <div className="text-lg font-semibold"> Note </div>
          <div>
            <input type="text" placeholder="Title" className="border p-2 rounded-md w-full" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <textarea
              placeholder="Content"
              className="border p-2 rounded-md mt-2 w-full"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button
            className="border p-2 rounded-md mt-2 w-full bg-primary text-white"
            onClick={() => {
              if (title && content) {
                requests
                  .post("http://localhost:3000/notes", {
                    title,
                    content,
                  })
                  .then((response) => {
                    setNotes([...notes, response.data]);
                    setTitle("");
                    setContent("");
                  });
              } else {
                window.alert("Title and Content are required");
              }
            }}
          >
            Add Note
          </button>
        </div>
      </div>
      <div className=""></div>
    </div>
  );
}

export default App;
