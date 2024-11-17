import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from '@apollo/client';
import { GET_ALL_CATEGORIES } from "../queries/queries";
import { CREATE_AD } from "../queries/mutations";

type FormInputs = {
  title: string;
  description: string;
  location: string;
  owner: string;
  picture: string[];
  price: string;
  category: string;
  tags: number[];
  createdAt: string;
};

const NewAdFormPage = () => {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery(GET_ALL_CATEGORIES);
  const [createAd ] = useMutation(CREATE_AD);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    const transformedData = {
      title: formData.title,
      description: formData.description,
      location: formData.location,
      owner: formData.owner,
      picturesUrls: [formData.picture],
      price: parseFloat(formData.price),
      category: formData.category,
      createdAt: new Date(formData.createdAt).toISOString()
    };
    console.log(transformedData)
  
    try {
      await createAd({
        variables: {
          data: transformedData,
        },
      });
      toast.success("Ad has been successfully added!");
      navigate("/"); 
    } catch (err) {
      console.error("Failed to create ad", err);
      toast.error("An error occurred while creating the ad.");
    }
  };

  console.log(data)

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

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
            <select {...register("category")}>
              {data.getAllCategories.map((el: any) => (
                <option key={el.id} value={el.id}>
                  {el.title}
                </option>
              ))}
              {errors.category && (
                <span className="errorRed">Ce champ est requis</span>
              )}
            </select>
            <br />
          </div>
          <button className="button sub">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default NewAdFormPage;
