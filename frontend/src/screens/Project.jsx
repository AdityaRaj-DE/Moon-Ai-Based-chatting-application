import React, { useState, useEffect, useContext, useRef } from "react";
import { UserContext } from "../context/user.context";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../config/axios";
import {
  initializeSocket,
  receiveMessage,
  sendMessage,
} from "../config/socket";
import Markdown from "markdown-to-jsx";

function SyntaxHighlightedCode(props) {
  const ref = useRef(null);

  React.useEffect(() => {
    if (ref.current && props.className?.includes("lang-") && window.hljs) {
      window.hljs.highlightElement(ref.current);

      // hljs won't reprocess the element unless this attribute is removed
      ref.current.removeAttribute("data-highlighted");
    }
  }, [props.className, props.children]);

  return <code {...props} ref={ref} />;
}


// Update the send function to use getMessageToSend

const Project = () => {

  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(new Set()); // Initialized as Set
  const [project, setProject] = useState(location.state.project);
  const [message, setMessage] = useState("");
  const { user } = useContext(UserContext);
  const messageBox = React.createRef();

  const [users, setUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [settingmodal, setSettingmodal] = useState(false);
  const [colabmodal, setColabmodal] = useState(false);


  const openColab = () => {
    setColabmodal(!colabmodal);
  }; // New state variable for messages
  const openSetting = () => {
    setSettingmodal(!settingmodal);
  }; // New state variable for messages

  const handleUserClick = (id) => {
    setSelectedUserId((prevSelectedUserId) => {
      const newSelectedUserId = new Set(prevSelectedUserId);
      if (newSelectedUserId.has(id)) {
        newSelectedUserId.delete(id);
      } else {
        newSelectedUserId.add(id);
      }

      return newSelectedUserId;
    });
  };

  function addCollaborators() {
    axios
      .put("/projects/add-user", {
        projectId: location.state.project._id,
        users: Array.from(selectedUserId),
      })
      .then((res) => {
        console.log(res.data);
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const send = () => {

    sendMessage('project-message', {
        message,
        sender: user
    })
    setMessages(prevMessages => [ ...prevMessages, { sender: user, message } ]) // Update messages state
    setMessage("")

}

  function WriteAiMessage(message) {
    const messageObject = message;
    console.log(message);
    return (
      <div className="overflow-auto rounded-xl p-2">
        <Markdown
          children={messageObject}
          options={{
            overrides: {
              code: SyntaxHighlightedCode,
            },
          }}
        />
      </div>
    );
  }
  useEffect(() => {
    initializeSocket(project._id);

    receiveMessage("project-message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]); // Update messages state
    });

    axios
      .get(`/projects/get-project/${location.state.project._id}`)
      .then((res) => {
        console.log(res.data.project);

        setProject(res.data.project);
      });

    axios
      .get("/users/all")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Removed appendIncomingMessage and appendOutgoingMessage functions

  function scrollToBottom() {
    messageBox.current.scrollTop = messageBox.current.scrollHeight;
  }

  return (
    <main className="h-screen w-screen flex">
      <div className="fixed lg:flex hidden left-4 top-2 bg-zinc-100 p-1 rounded-xl">
        <div className="flex flex-row gap-2">
          <i className="ri-gemini-fill bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 animate-gradient text-white p-1 rounded-lg w-8 text-center"></i>
          <h1 className="p-1 font-semibold mr-1">Moon</h1>
        </div>
      </div>
      <div className="bg-white w-full h-full">
        <div className="flex justify-between m-1 lg:ml-24 ml-4 gap-1">
          <div className="flex gap-1">
            <h1 className="text-xl font-medium py-2 text-zinc-400">Project</h1>
            <i className="ri-arrow-right-s-line text-xl text-zinc-400 py-2"></i>
            <h1 className="text-xl font-medium py-2 text-zinc-900">
              {project.name}
            </h1>
          </div>
          <button
            onClick={openSetting}
            className="fixed lg:static right-3 top-20"
          >
            <i className="ri-settings-3-line text-2xl m-1 mr-4"></i>
            {settingmodal ? (
              <div className="fixed lg:top-[3.2rem] right-3 lg:right-4 p-4 text-left rounded-xl bg-[#eaeaea]">
                <h1>
                  Project:{" "}
                  <span className="bg-white px-2 py-1 rounded-xl">
                    {project.name}
                  </span>{" "}
                </h1>
                <h1>
                  Collaborators:{" "}
                  <span className="bg-white px-2 py-1 rounded-xl">
                    {project.users.length}
                  </span>
                </h1>
              </div>
            ) : (
              <div></div>
            )}
          </button>
        </div>

        <section className="flex flex-row h-screen w-full bg-white">
          <div className="lg:w-64 w-56 fixed lg:static lg:h-full mt-4 rounded-xl ml-2 flex flex-col gap-1 bg-white">
            <header
              className={`flex bg-zinc-100 rounded-xl justify-between items-center px-4 p-2 ${
                window.innerWidth >= 1024 ? "" : "cursor-pointer"
              }`}
              onClick={window.innerWidth >= 1024 ? null : openColab}
            >
              <h1 className="font-semibold text-lg">Collaborators</h1>
            </header>

            {colabmodal ? (
              <div className="users flex bg-zinc-100 rounded-xl pt-1 flex-col overflow-y-scroll no-scrollbar">
                {project.users &&
                  project.users.map((user, index) => {
                    return (
                      <div
                        key={`${user._id}-${index}`}
                        className="user cursor-pointer bg-white mx-2 my-1 rounded-lg p-2 flex gap-2 items-center"
                      >
                        <div
                          className={`rounded-full h-10 w-10 flex items-center justify-center p-5 text-white bg-teal-500`}
                        >
                          <i className="ri-user-fill"></i>
                        </div>
                        <h1 className="font-semibold text-lg">{user.name}</h1>
                      </div>
                    );
                  })}

                <header className="flex justify-between items-center p-2 px-4 w-full hover:bg-zinc-100">
                  <button
                    className="flex gap-2 m-2"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <i className="ri-add-fill mr-1 bg-teal-500 text-white rounded-xl w-6"></i>
                    <p className="text-xs">Add collaborator</p>
                  </button>
                </header>
              </div>
            ) : (
              <div></div>
            )}
            <div className="users bg-zinc-100 rounded-xl pt-1 flex-col overflow-y-scroll no-scrollbar hidden lg:flex">
              {project.users &&
                project.users.map((user, index) => {
                  return (
                    <div
                      key={`${user._id}-${index}`}
                      className="user cursor-pointer bg-white mx-2 my-1 rounded-lg p-2 flex gap-2 items-center"
                    >
                      <div
                        className={`rounded-full h-10 w-10 flex items-center justify-center p-5 text-white bg-teal-500`}
                      >
                        <i className="ri-user-fill"></i>
                      </div>
                      <h1 className="font-semibold text-lg">{user.name}</h1>
                    </div>
                  );
                })}

              <header className="flex justify-between items-center p-2 px-4 w-full hover:bg-zinc-100">
                <button
                  className="flex gap-2 m-2"
                  onClick={() => setIsModalOpen(true)}
                >
                  <i className="ri-add-fill mr-1 bg-teal-500 text-white rounded-xl w-6"></i>
                  <p className="">Add collaborator</p>
                </button>
              </header>
            </div>
          </div>

          <div className="conversation-area w-full lg:h-[36.7rem] h-[39rem] mt-16 lg:mt-0 p-2 justify-between flex-grow flex flex-col">
            <div
              ref={messageBox}
              className="message-box rounded-xl p-2 m-2 bg-[#eaeaea] h-full flex-grow flex flex-col gap-1 overflow-auto scrollbar-hide"
            >
              <div className="flex h-16 p-2 mb-4 ">
                <h1 className="text-xl w-64">Message Box</h1>
                <div className="bg-white hidden lg:flex w-full rounded-xl">
                  <h1 className="text-lg py-2 px-4">
                    <span className="bg-gradient-to-r text-lg from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient font-bold">
                      AI
                    </span>{" "}
                    here to help. Use @AI for chat
                  </h1>
                </div>
              </div>
              <div className="p-1 h-full overflow-y-scroll no-scrollbar">
                {messages.length === 0 ? (
                  <div className="flex h-full justify-center items-center">
                    <i className="ri-question-answer-line text-9xl text-zinc-300"></i>
                  </div>
                ) : (
                  messages.map((msg, index) => (
                    <div
                      key={`${msg.sender._id}-${index}`}
                      className={`${
                        msg.sender._id === "moon"
                          ? "lg:max-w-[40rem] max-w-[15rem]"
                          : "lg:max-w-[40rem] max-w-[15rem]"
                      } ${
                        msg.sender._id == user._id.toString() && "ml-auto"
                      }  message flex flex-col p-2 m-1 text-lg bg-slate-50 w-fit rounded-xl`}
                    >
                      {msg.sender._id !== "moon" ? (
                        <small className="opacity-50 text-xs">
                          {msg.sender.name}
                        </small>
                      ) : (
                        <small className="opacity-50 text-xs">AI</small>
                      )}

                      {msg.sender._id === "moon"
                        ? WriteAiMessage(msg.message)
                        : msg.message}
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="m-2 rounded-xl">
              <div className="inputField w-full flex rounded-xl">
                <input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="p-2 px-4 border-none rounded-xl bg-zinc-100 mr-1 outline-none flex-grow"
                  type="text"
                  placeholder="Enter message"
                />
                <button
                  onClick={send}
                  className="px-5 bg-teal-500 rounded-lg text-white"
                >
                  <i className="ri-send-plane-fill"></i>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-xl lg:w-96 w-80 max-w-full relative">
            <header className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select User</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2">
                <i className="ri-close-fill"></i>
              </button>
            </header>
            <div className="users-list flex flex-col gap-2 mb-16 max-h-96 overflow-auto">
              {users.map((user, index) => (
                <div
                  key={index}
                  className={`user cursor-pointer hover:bg-slate-200 ${
                    Array.from(selectedUserId).indexOf(user._id) != -1
                      ? "bg-slate-200"
                      : ""
                  } p-2 flex gap-2 items-center`}
                  onClick={() => handleUserClick(user._id)}
                >
                  <div className="aspect-square relative rounded-full w-fit h-fit flex items-center justify-center p-5 text-white bg-slate-600">
                    <i className="ri-user-fill absolute"></i>
                  </div>
                  <h1 className="font-semibold text-lg">{user.email}</h1>
                </div>
              ))}
            </div>
            <button
              onClick={addCollaborators}
              className="absolute font-bold bottom-4 left-1/2  transform -translate-x-1/2 text-xs lg:text-sm px-4 py-2 bg-teal-500 text-white rounded-xl"
            >
              Add Collaborators
            </button>
          </div>
        </div>
      )}
    </main>
  );
};

export default Project;
