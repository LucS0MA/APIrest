import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  useGetAdByIdQuery,
  useGetAllCategoriesQuery,
  useGetAllTagsQuery,
  useUpdateAdMutation,
} from "../generated/graphql-types";
import { GET_ALL_ADS } from "../graphql/queries";

type FormInputs = {
  title: string;
  description: string;
  location: string;
  owner: string;
  // picture: string;
  price: string;
  category: string;
  tag: string[];
  createdAt: string;
};

const AdModification = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    loading: loadingCat,
    error: errorCat,
    data: dataCat,
  } = useGetAllCategoriesQuery();
  const {
    loading: loadingTags,
    error: errorTags,
    data: dataTags,
  } = useGetAllTagsQuery();
  const { loading, error, data } = useGetAdByIdQuery({
    variables: { getAdByIdId: Number(id) },
  });
  const [updateAd] = useUpdateAdMutation({refetchQueries: [GET_ALL_ADS]});

  const baseAd = data?.getAdById;
  console.log("baseAd", baseAd);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormInputs>();

  useEffect(() => {
    if (data && data.getAdById) {
      const baseAd = data.getAdById;
      setValue("title", baseAd.title);
      setValue("description", baseAd.description);
      setValue("owner", baseAd.owner);
      setValue("price", baseAd.price.toString());
      // setValue("picture", baseAd.picture);
      setValue("location", baseAd.location);
      setValue(
        "createdAt",
        new Date(baseAd.createdAt).toISOString().slice(0, 10)
      );
      if (baseAd.category?.id) {
        setValue("category", baseAd.category.id.toString());
      }
    }
  }, [data, setValue]);

  if (!data?.getAdById?.id) {
    toast.error("ID is missing or invalid.");
    return;
  }

  const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
    const transformedData = {
      id: data.getAdById.id,
      title: formData.title,
      description: formData.description,
      location: formData.location,
      owner: formData.owner,
      // picturesUrls: [formData.picture],
      price: parseFloat(formData.price),
      category: formData.category,
      createdAt: new Date(formData.createdAt).toISOString(),
      tag: formData.tag ? formData.tag.map((el) => ({ id: parseInt(el) })) : [],
    };
    console.log("dataforbackend", transformedData);

    try {
      await updateAd({
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

  if (loading && loadingCat && loadingTags) return "Submitting...";
  if (error && errorCat && errorTags)
    return `Submission error! ${error.message}`;
  if (!data || !data.getAdById) {
    return <p>Chargement des données...</p>;
  }
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
            {/* <label>
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
              </label> */}
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
              {dataCat?.getAllCategories.map((el) => (
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
              {dataTags?.getAllTags.map((tag) => (
                <div key={tag.id}>
                  <input
                    key={tag.id}
                    type="checkbox"
                    value={tag.id}
                    defaultChecked={baseAd?.tag ? baseAd?.tag.some(
                      (t: any) => t.id == tag.id
                    ) : false}
                    {...register("tag")}
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
};

export default AdModification;
