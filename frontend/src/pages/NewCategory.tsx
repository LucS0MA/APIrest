import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";

interface CategoryInputs {
  title: string;
}

function NewCategory() {
  const {
    register: registerCategory,
    handleSubmit: handleCategorySubmit,
    formState: { errors: CategoryErrors },
  } = useForm<CategoryInputs>();

  const onCategorySubmit: SubmitHandler<CategoryInputs> = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/category", data);
      console.log("data sent :", response.data);
    } catch (err) {
      console.log("error data not sent :", err);
    }
  };

  return (
    <form onSubmit={handleCategorySubmit(onCategorySubmit)}>
      <label>
        Nouvelle catégorie : <br />
        <input
          className="text-field"
          type="text"
          {...registerCategory("title", {
            required: "titre requis",
          })}
        />
        {CategoryErrors.title && <span>{CategoryErrors.title.message}</span>}
      </label>
      <button className="button">Submit</button>
    </form>
  );
}

export default NewCategory;
