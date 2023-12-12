import Button from "./Button"

export default function ProjectsSideBar({ onStartProject, projects, onSelectProject, selectedProjectId }) {
    return <aside className="w-1/3 px-8 py-16 bg-stone-900 text-stone-50 md:w-72 rounded-r-xl">
        <h2 className="mb-8 font-bold uppercase md:text-xl text-stone-50" >
            Your Projects
        </h2>
        <div>
            <Button onClick={onStartProject}>
                + Add Project
            </Button>
        </div>
        <ul className="mt-8">
            {projects.map((e) => {

                let cssClasses = "w-full text-left px-2 py-1 roundem-sm my-1 hover:text-stone-200 hover:bg-stone-800";

                if (selectedProjectId === e.id) {
                    cssClasses += 'bg-stone-800 text-stone-200';
                } else {
                    cssClasses += ' text-stone-400';
                }

                return <li key={e.id}>
                    <button onClick={() => onSelectProject(e.id)} className={cssClasses}>
                        {e.title}
                    </button>
                </li>
            }
            )}
        </ul>
    </aside>
}