import noProjectImage from "../assets/task-manager-logo.png";
import Button from "./Button";
const EmptyProject = ({onStart}) => {
  return (
    <section className="mt-24 mx-auto text-center w-2/3">
      <img
        src={noProjectImage}
        alt="An empty task list"
        className="w-1/4 h-1/4 object-contain mx-auto"
      />
      <h2 className="text-xl font-bold text-slate-500 my-4"></h2>
      <p className="text-slate-400 mb-4">
        Select a project or get started a new one
      </p>
      <p className="mt-8">
        <Button onClick={onStart}>Create new project</Button>
      </p>
    </section>
  );
};

export default EmptyProject;
