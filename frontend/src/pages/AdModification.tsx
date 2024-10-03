import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEffect, useState } from "react";
import { CategoriesProps } from "../components/Categories";
import { useParams } from "react-router-dom";

interface FormInputs {
  title: string;
  description: string;
  location: string;
  owner: string;
  picture: string;
  price: number;
  category: number;
}

function AdModification() {
  const { id } = useParams();
  const [categories, setCategories] = useState<CategoriesProps[]>([]);
  const [formData, setFormData] = useState<FormInputs>({
    title: "",
    description: "",
    location: "",
    owner: "",
    picture: "",
    price: 0,
    category: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/ad/${id}`);
        setFormData({
          title: result.data.title,
          description: result.data.description,
          location: result.data.location,
          owner: result.data.owner,
          picture: result.data.picture,
          price: result.data.price,
          category: result.data.category?.id,
        });
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchData();
  }, [id]);

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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onSubmit: SubmitHandler<FormInputs> = async () => {
    try {
      const response = await axios.put(
        `http://localhost:3000/ad/${id}`,
        formData
      );
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
            {...register("title")}
            value={formData.title}
            onChange={handleInputChange}
          />
          {errors.title && <span>{errors.title.message}</span>}
        </label>
        <br />
        <label>
          Description : <br />
          <input
            className="text-field"
            type="text"
            {...register("description")}
            value={formData.description}
            onChange={handleInputChange}
          />
          {errors.description && <span>{errors.description.message}</span>}
        </label>
        <br />
        <label>
          Localisation : <br />
          <input
            className="text-field"
            type="text"
            {...register("location")}
            value={formData.location}
            onChange={handleInputChange}
          />
          {errors.location && <span>{errors.location.message}</span>}
        </label>
        <br />
        <label>
          Vendeur : <br />
          <input
            className="text-field"
            type="text"
            {...register("owner")}
            value={formData.owner}
            onChange={handleInputChange}
          />
          {errors.owner && <span>{errors.owner.message}</span>}
        </label>
        <br />
        <label>
          Image : <br />
          <input
            className="text-field"
            type="text"
            {...register("picture")}
            value={formData.picture}
            onChange={handleInputChange}
          />
          {errors.picture && <span>{errors.picture.message}</span>}
        </label>
        <br />
        <label>
          Prix : <br />
          <input
            className="text-field"
            type="number"
            {...register("price")}
            value={formData.price}
            onChange={handleInputChange}
          />
          {errors.price && <span>{errors.price.message}</span>}
        </label>
        <br />
        <select
          {...register("category", {
            valueAsNumber: true,
          })}
          value={formData.category}
          onChange={handleInputChange}
        >
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
          {errors.category && <span>{errors.category.message}</span>}
        </select>
        <button className="button">Submit</button>
      </form>
    </>
  );
}

export default AdModification;
