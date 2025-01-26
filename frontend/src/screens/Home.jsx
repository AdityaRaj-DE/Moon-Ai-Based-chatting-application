import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/user.context";
import axios from "../config/axios";
import { useNavigate } from "react-router-dom";
import Aimessage from "../Ui/Aimessage";

const Home = () => {
  const { user } = useContext(UserContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectName, setProjectName] = useState(null);
  const [project, setProject] = useState([]);
  const [profilemodal, setProfilemodal] = useState(false);
  const navigate = useNavigate();

  const openProfile = () => {
    setProfilemodal(!profilemodal);
  };
  function createProject(e) {
    e.preventDefault();
    console.log({ projectName });

    axios
      .post("/projects/create", {
        name: projectName,
      })
      .then((res) => {
        console.log(res);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    axios
      .get("/projects/all")
      .then((res) => {
        setProject(res.data.projects);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main className="p-4 w-screen lg:overflow-y-hidden no-scrollbar">
      <div className="w-full">
        <div className="fixed left-4 bg-zinc-100 p-1 rounded-xl">
          <div className="flex flex-row gap-2">
            <i className="ri-gemini-fill bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 animate-gradient text-white p-1 rounded-lg w-8 text-center"></i>
            <h1 className="p-1 font-semibold mr-1">Moon</h1>
          </div>
        </div>
      </div>
      <div className="lg:flex lg:flex-row gap-3">
        <div className="lg:w-[43rem]">
          <div className="h-10 w-full">
            <div className="flex flex-row-reverse p-1 rounded-xl">
              <button
                onClick={openProfile}
                className={`flex fixed lg:static right-16 flex-row-reverse justify-between gap-2 bg-[#eaeaea] p-1 rounded-xl ${profilemodal?"lg:w-48":"w-20"} `}
              >
                <i className="ri-user-line text-lg text-white bg-teal-500 p-1 px-2 rounded-lg"></i>
                <i className="ri-arrow-left-s-line text-lg p-1 ml-2"></i>
                
              </button>
              {profilemodal ? (
                  <div className="fixed top-[4.2rem] w-48 bg-[#eaeaea] flex flex-col text-left p-3 rounded-xl overflow-hidden gap-2">
                    <h1>Name: <span className="py-1 px-2 bg-white rounded-xl">{user.name}</span> </h1>
                    <h1>Email: <span className="py-1 px-2 bg-white rounded-xl">{user.email}</span> </h1>
                  </div>
                ) : (
                  <div></div>
                )}
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-semi px-4 pt-4 pb-2">
              Here's{" "}
              <span className="font-semibold text-4xl bg-gradient-to-r from-cyan-500 via-orange-700 to-green-400 text-transparent bg-clip-text animate-gradient">
                Moon
              </span>
            </h1>
          </div>
          <div>
            <h1 className="text-6xl p-4 font-medium">
              Hello{" "}
              <span className="text-6xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient">
                {user.name}
              </span>
            </h1>
            <h1 className="text-4xl px-4 pb-2">Nice to meet you again</h1>
          </div>
          <div className="bg-zinc-100 h-[22rem] overflow-y-scroll no-scrollbar rounded-3xl">
            <div className="projects p-4 flex flex-wrap gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="project p-4 bg-white border shadow-lg rounded-xl"
              >
                New Project
                <i className="ri-link ml-2"></i>
              </button>

              {project.map((project) => (
                <div
                  key={project._id}
                  onClick={() => {
                    navigate(`/project`, {
                      state: { project },
                    });
                  }}
                  className="project bg-white flex flex-col gap-2 cursor-pointer p-4 shadow-lg rounded-xl lg:min-w-48 lg:w-auto w-72 "
                >
                  <h2 className="font-semibold">{project.name}</h2>

                  <div className="flex gap-2">
                    <p>
                      {" "}
                      <small>
                        {" "}
                        <i className="ri-user-line"></i> Collaborators
                      </small>{" "}
                      :
                    </p>
                    <div className={`h-4 w-4 p-4 flex justify-center items-center rounded-full bg-teal-500 text-white`}>
                      {project.users.length < 10 ? (
                        <p className="font-bold text-xs">
                          {project.users.length}
                        </p>
                      ) : (
                        <p className="font-bold text-xs">9+</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="p-2">
          <div className="flex gap-2">
            <h1 className=" text-2xl font-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient">
              {" "}
              Ask Anything
            </h1>
            <i className="ri-gemini-fill text-3xl bfont-bold bg-gradient-to-r from-orange-700 via-blue-500 to-green-400 text-transparent bg-clip-text animate-gradient"></i>
          </div>
          <div className="lg:w-[28rem]">
            <Aimessage />
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-md lg:w-1/3">
            <h2 className="text-xl font-medium mb-4">Create New Project</h2>
            <form onSubmit={createProject}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Project Name
                </label>
                <input
                  onChange={(e) => setProjectName(e.target.value)}
                  value={projectName}
                  type="text"
                  className="mt-2 block w-full py-2 bg-zinc-200 rounded-xl px-4"
                  placeholder="Like: Project-1"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 bg-zinc-300 rounded-md"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-500 text-white rounded-md"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
};

export default Home;
