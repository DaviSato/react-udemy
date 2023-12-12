import { useState } from "react"
import ProjectsSideBar from "./components/ProjectsSideBar";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import SelectedProject from "./components/SelectedProject";

function App() {

  const [projectsState, setProjectsState] = useState({
    selectedProjectId: undefined,
    projects: [],
    tasks: [],
  });

  function handleAddTask(text) {
    setProjectsState((prevState)=> {
      const taskId = Math.random();
      const newTask = {
        text,
        projectId:   prevState.selectedProjectId,
        id: taskId,
      }

      return {
        ...prevState,
        tasks: [...prevState.tasks, newTask],
      }
    })
  }

  function handleDeleteTask(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        tasks: prevState.tasks.filter((e) => e.id !== id),
      }
    }); 
  }

  const selectedProject = projectsState.projects.find(project => project.id === projectsState.selectedProjectId);

  let content =
    <SelectedProject
      onDeleteTask={handleDeleteTask}
      onAddTask={handleAddTask}
      project={selectedProject}
      onDelete={handleDeleteProject}
      tasks={projectsState.tasks}
    />;

  function handleStartAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: null,
      }
    });
  }

  function handleAddProject(projectData) {
    setProjectsState(prevState => {
      const newProject = {
        ...projectData,
        id: Math.random()
      };
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: [...prevState.projects, newProject]
      };
    });
  }

  function handleCancelAddProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
      }
    });
  }

  function hanldeSelectProject(id) {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: id,
      }
    });
  }

  function handleDeleteProject() {
    setProjectsState(prevState => {
      return {
        ...prevState,
        selectedProjectId: undefined,
        projects: prevState.projects.filter((e) => e.id !== prevState.selectedProjectId),
      }
    });
  }

  if (projectsState.selectedProjectId === null) {
    content = <NewProject onAdd={handleAddProject} onCancel={handleCancelAddProject} />
  } else if (projectsState.selectedProjectId === undefined) {
    content = <NoProjectSelected onStartProject={handleStartAddProject} />
  }

  return (
    <>
      <main className="h-screen my-8 flex flex-box gap-8">
        <ProjectsSideBar 
        onSelectProject={hanldeSelectProject} 
        projects={projectsState.projects} 
        onStartProject={handleStartAddProject} 
        selectedProjectId={projectsState.selectedProjectId}
        />
        {content}
      </main>

    </>
  );
}

export default App;
