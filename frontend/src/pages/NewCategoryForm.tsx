import { ErrorMessage } from "@hookform/error-message";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";

interface CategoryInputs {
  title: string;
}

function NewCategoryForm() {
  const {
    register: registerCategory,
    handleSubmit: handleCategorySubmit,
    formState: { errors: CategoryErrors },
  } = useForm<CategoryInputs>({ criteriaMode: "all" });

  const onCategorySubmit: SubmitHandler<CategoryInputs> = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/category", data);
      console.log("data sent :", response.data);
    } catch (err) {
      console.log("error data not sent :", err);
    }
  };

  return (
    <form
      onSubmit={handleCategorySubmit(onCategorySubmit)}
      className="newAdForm"
    >
      <label>
        Nouvelle catégorie : <br />
        <input
          className="text-field-input"
          type="text"
          {...registerCategory("title", {
            required: "titre requis",
          })}
        />
        <ErrorMessage
          errors={CategoryErrors}
          name="title"
          render={({ messages }) =>
            messages &&
            Object.entries(messages).map(([type, message]) => {
              console.log(message);
              return (
                <Fragment key={type}>
                  <br />
                  <span className="errorRed">{message}</span>
                </Fragment>
              );
            })
          }
        />
      </label>
      <button className="button">Submit</button>
    </form>
  );
}

export default NewCategoryForm;
