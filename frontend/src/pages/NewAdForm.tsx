import axios from "axios";
import { useEffect, useState } from "react";
import { CategoriesProps } from "../components/Categories";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export interface TagsProps {
  id: number;
  title: string;
}

type FormInputs = {
  title: string;
  description: string;
  location: string;
  owner: string;
  picture: string;
  price: number;
  category: number;
  tag: number;
  createdAt: string;
};

const NewAdFormPage = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([] as CategoriesProps[]);
  const [tags, setTags] = useState([] as TagsProps[]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get("http://localhost:3000/category");
        setCategories(result.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await axios.get("http://localhost:3000/tag");
        setTags(result.data);
      } catch (err) {
        console.log("err", err);
      }
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
      await axios.post("http://localhost:3000/ad/", data);
      toast.success("Ad has been added");
      navigate("/");
    } catch (error) {
      console.error("Failed to update ad", error);
      toast.error("Error has been detected");
    }
  };

  return (
    <div className="border-form">
      <form onSubmit={handleSubmit(onSubmit)} className="newAdForm">
        <label>
          Titre de l'annonce:
          <br />
          <input
            className="text-field-input"
            type="text"
            {...register("title", { required: true })}
          />
          {errors.category && (
            <span className="errorRed">Ce champ est requis</span>
          )}
        </label>
        <br />
        <label>
          Description:
          <br />
          <input
            className="text-field-input"
            type="text"
            {...register("description", { required: true })}
          />
          {errors.category && (
            <span className="errorRed">Ce champ est requis</span>
          )}
        </label>
        <br />
        <label>
          Vendeur:
          <br />
          <input
            className="text-field-input"
            type="text"
            {...register("owner", { required: true })}
          />
          {errors.category && (
            <span className="errorRed">Ce champ est requis</span>
          )}
        </label>
        <br />
        <label>
          Prix:
          <br />
          <input
            className="text-field-input"
            type="number"
            {...register("price", { required: true })}
          />
          {errors.category && (
            <span className="errorRed">Ce champ est requis</span>
          )}
        </label>
        <br />
        <label>
          Image:
          <br />
          <input
            className="text-field-input"
            type="text"
            {...register("picture", { required: true })}
          />
          {errors.category && (
            <span className="errorRed">Ce champ est requis</span>
          )}
        </label>
        <br />
        <label>
          Ville:
          <br />
          <input
            className="text-field-input"
            type="text"
            {...register("location", { required: true })}
          />
          {errors.category && (
            <span className="errorRed">Ce champ est requis</span>
          )}
        </label>
        <br />
        <label>
          Date:
          <br />
          <input
            className="text-field"
            type="date"
            {...register("createdAt", { required: true })}
          />
          {errors.category && (
            <span className="errorRed">Ce champ est requis</span>
          )}
        </label>
        <br />
        <select {...register("category", { required: true })}>
          {categories.map((el) => (
            <option key={el.id} value={el.id}>
              {el.title}
            </option>
          ))}
        </select>
        <br />
        <select name="tag">
          {tags.map((el) => (
            <option key={el.id} value={el.id}>
              {el.title}
            </option>
          ))}
        </select>
        <br />
        <button className="button">Submit</button>
      </form>
    </div>
  );
};

export default NewAdFormPage;
