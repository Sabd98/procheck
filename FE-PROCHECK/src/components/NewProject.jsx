import { useRef, useState } from "react";
import Button from "./Button";
import Input from "./Input";
import Modal from "./Modal";
import useNewProject from "../hooks/NewProjectHook";

const NewProject = ({onCreate,onCancel}) => {
  const {errors,formData,handleChange,validateForm} = useNewProject()
  const modal = useRef();

  const handleSave = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      modal.current.open();
      return;
    }

    try {
      await onCreate({
        title: formData.title,
        description: formData.description,
        dueDate: new Date(formData.dueDate).toISOString()
      });
      onCancel();
    } catch (error) {
      console.error("Failed to create project:", error);
    }
  };

  return (
    <section className="w-[65rem] h-[22rem] mx-auto mt-16 border rounded-md">
      <Modal ref={modal} buttonCaption="Ok">
        <h2 className="text-xl font-bold text-slate-800 my-4"></h2>
        <p className="text-slate-400 mb-4">
          Oops... looks like you forgot to enter a value
        </p>
        <p className="text-slate-400 mb-4">
          Please make sure you provide a valid value for every input fields
        </p>
        <ul className="list-disc pl-4">
          {Object.values(errors).map(
            (error, index) =>
              error && (
                <li key={index} className="text-slate-400">
                  {error}
                </li>
              )
          )}
        </ul>
      </Modal>
      <form onSubmit={handleSave} >
        <menu className="flex items-center justify-end gap-5 m-3">
          <li>
            <button
              className="text-slate-800 hover:text-slate-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <Button type="submit">Save</Button>
          </li>
        </menu>
        <div className="mx-2">
          <Input
            label="Title"
            name="title"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            error={errors.title}
          />

          <Input
            label="Description"
            name="description"
            textarea
            value={formData.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <Input
            label="Due Date"
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
            error={errors.dueDate}
          />
        </div>
      </form>
    </section>
  );
};

export default NewProject;
