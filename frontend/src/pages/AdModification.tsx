import axios from "axios";
import { useEffect, useState } from "react";
import { CategoriesProps } from "../components/Categories";
import { AdCardProps } from "../components/AdCard";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TagsProps } from "./NewAdForm";

type FormInputs = {
  title: string;
  description: string;
  location: string;
  owner: string;
  picture: string;
  price: number;
  category: number;
  tags: number[];
  createdAt: string;
};

const AdModification = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [categories, setCategories] = useState([] as CategoriesProps[]);
  const [newAd, setNewAd] = useState<AdCardProps>();
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
    const fetchTags = async () => {
      try {
        const result = await axios.get("http://localhost:3000/tag");
        setTags(result.data);
      } catch (err) {
        console.log("err", err);
      }
    };
    fetchTags();
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

  console.log(newAd);

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const finalData = data.tags
      ? { ...data, tag: data.tags.map((el) => ({ id: el })) }
      : data;
    try {
      await axios.put(`http://localhost:3000/ad/${id}`, finalData);
      toast.success("Ad has been modified");
      console.log("Final data to submit:", finalData);

      navigate("/");
    } catch (error) {
      console.error("Failed to update ad", error);
      toast.error("Error has been detected");
    }
  };

  if (newAd) {
    return (
      <div className="border-form">
        <form onSubmit={handleSubmit(onSubmit)} className="newAdForm">
          <div className="grid-container">
            <div className="form-column">
              <label>
                Titre de l'annonce:
                <br />
                <input
                  className="text-field-input"
                  type="text"
                  {...register("title", { required: true })}
                />
                {errors.title && (
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
                {errors.description && (
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
                {errors.owner && (
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
                {errors.price && (
                  <span className="errorRed">Ce champ est requis</span>
                )}
              </label>
              <br />
            </div>
            <div className="form-column">
              <label>
                Image:
                <br />
                <input
                  className="text-field-input"
                  type="text"
                  {...register("picture", { required: true })}
                />
                {errors.picture && (
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
                {errors.location && (
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
                {errors.createdAt && (
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
              {errors.category && (
                <span className="errorRed">Ce champ est requis</span>
              )}
              <div>
                <label>Tags:</label>
                <br />
                {tags.map((tag) => (
                  <div key={tag.id}>
                    <input
                      key={tag.id}
                      type="checkbox"
                      value={tag.id}
                      defaultChecked={newAd?.tag.some((t) => t.id == tag.id)}
                      {...register("tags")}
                    />
                    <label>{tag.title}</label>
                  </div>
                ))}
              </div>
            </div>
            <button className="button sub">Submit</button>
          </div>
        </form>
      </div>
    );
  } else {
    return <p>Loading ...</p>;
  }
};

export default AdModification;
