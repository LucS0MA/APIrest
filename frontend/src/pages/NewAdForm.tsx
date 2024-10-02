import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { CategoriesProps } from "../components/Categories";

interface FormInputs {
  title: string;
  description: string;
  location: string;
  owner: string;
  picture: string;
  price: number;
  category: number;
}

function NewAdForm() {
  const [categories, setCategories] = useState<CategoriesProps[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const result = await axios.get<CategoriesProps[]>(
        "http://localhost:3000/category"
      );
      setCategories(result.data);
    };
    fetchCategories();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/ad", data);
      console.log("data sent :", response.data);
    } catch (err) {
      console.log("error data not sent :", err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Titre de l'annonce : <br />
          <input
            className="text-field"
            type="text"
            {...register("title", { required: "titre requis" })}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </label>
        <br />
        <label>
          Description : <br />
          <input
            className="text-field"
            type="text"
            {...register("description", { required: "description requis" })}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </label>
        <br />
        <label>
          Localisation : <br />
          <input
            className="text-field"
            type="text"
            {...register("location", { required: "location requis" })}
          />
          {errors.location && <span>{errors.location.message}</span>}
        </label>
        <br />
        <label>
          Vendeur : <br />
          <input
            className="text-field"
            type="text"
            {...register("owner", { required: "owner requis" })}
          />
          {errors.owner && <span>{errors.owner.message}</span>}
        </label>
        <br />
        <label>
          Image : <br />
          <input
            className="text-field"
            type="text"
            {...register("picture", { required: "picture requis" })}
          />
          {errors.picture && <span>{errors.picture.message}</span>}
        </label>
        <br />
        <label>
          Prix : <br />
          <input
            className="text-field"
            type="number"
            {...register("price", {
              required: "price requis",
            })}
          />
          {errors.price && <span>{errors.price.message}</span>}
        </label>
        <br />
        <select
          {...register("category", {
            required: "La catégorie est requise",
            valueAsNumber: true,
          })}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {" "}
              {cat.title}{" "}
            </option>
          ))}
          {errors.category && <span>{errors.category.message}</span>}
        </select>
        <button className="button">Submit</button>
      </form>
    </>
  );
}

export default NewAdForm;
