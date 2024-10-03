import axios from "axios";
import { useEffect, useState } from "react";
import { CategoriesProps } from "../components/Categories";
import { AdCardProps } from "../components/AdCard";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type FormInputs = {
  title: string;
  description: string;
  location: string;
  owner: string;
  picture: string;
  price: number;
  category: number;
  createdAt: string;
};

const AdModification = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([] as CategoriesProps[]);
  const [newAd, setNewAd] = useState<AdCardProps>();

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    const fetchDataDetails = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/ad/${id}`);
        setNewAd(result.data);
        setValue("title", result.data.title);
        setValue("description", result.data.description);
        setValue("owner", result.data.owner);
        setValue("price", result.data.price);
        setValue("picture", result.data.picture);
        setValue("location", result.data.location);
        setValue(
          "createdAt",
          new Date(result.data.createdAt).toISOString().slice(0, 10)
        );
        setValue("category", result.data.category.id);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchDataDetails();
  }, [id, setValue]);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {
      await axios.put(`http://localhost:3000/ad/${id}`, data);
      toast.success("Ad has been modified");
      navigate("/");
    } catch (error) {
      console.error("Failed to update ad", error);
      toast.error("Error has been detected");
    }
  };

  if (newAd) {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Titre de l'annonce:
          <br />
          <input
            className="text-field"
            type="text"
            {...register("title", { required: true })}
          />
          {errors.title && <span>Ce champ est requis</span>}
        </label>
        <br />
        <label>
          Description:
          <br />
          <input
            className="text-field"
            type="text"
            {...register("description", { required: true })}
          />
          {errors.category && <span>Ce champ est requis</span>}
        </label>
        <br />
        <label>
          Vendeur:
          <br />
          <input
            className="text-field"
            type="text"
            {...register("owner", { required: true })}
          />
          {errors.category && <span>Ce champ est requis</span>}
        </label>
        <br />
        <label>
          Prix:
          <br />
          <input
            className="text-field"
            type="number"
            {...register("price", { required: true })}
          />
          {errors.category && <span>Ce champ est requis</span>}
        </label>
        <br />
        <label>
          Image:
          <br />
          <input
            className="text-field"
            type="text"
            {...register("picture", { required: true })}
          />
          {errors.category && <span>Ce champ est requis</span>}
        </label>
        <br />
        <label>
          Ville:
          <br />
          <input
            className="text-field"
            type="text"
            {...register("location", { required: true })}
          />
          {errors.category && <span>Ce champ est requis</span>}
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
          {errors.category && <span>Ce champ est requis</span>}
        </label>
        <br />
        <select {...register("category", { required: true })}>
          {categories.map((el) => (
            <option key={el.id} value={el.id}>
              {el.title}
            </option>
          ))}
        </select>
        {errors.category && <span>Ce champ est requis</span>}
        <button className="button">Submit</button>
      </form>
    );
  } else {
    return <p>Loading ...</p>;
  }
};

export default AdModification;
