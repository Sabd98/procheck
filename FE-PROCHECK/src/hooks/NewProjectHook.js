
import { useState } from 'react'

export default function useNewProject() {
     const [formData, setFormData] = useState({
        title: "",
        description: "",
        dueDate: "",
      });
    
      const [errors, setErrors] = useState({
        title: "",
        dueDate: "",
      });

      function validateForm() {
        let isValid = true;
        const newErrors = { title: "", dueDate: "" };
        // Title validation
        if (!formData.title.trim()) {
          newErrors.title = "Title is required";
          isValid = false;
          console.log(isValid);
        }
    
        // Due date validation
        if (!formData.dueDate) {
          newErrors.dueDate = "Due date is required";
          isValid = false;
        } else if (new Date(formData.dueDate) < new Date()) {
          newErrors.dueDate = "Date must be in the future";
          isValid = false;
        }
    
        setErrors(newErrors);
        return isValid;
      }

      function handleChange(name, value) {
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
    
        // Clear error when user starts typing
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
  return {formData, errors, handleChange, validateForm}
}
