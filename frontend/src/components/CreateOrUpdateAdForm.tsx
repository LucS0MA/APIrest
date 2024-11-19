import { useFieldArray, SubmitHandler, useForm } from "react-hook-form";
import { useGetAllCategoriesQuery, useGetAllTagsQuery } from "../generated/graphql-types";

type FormInputs = {
    title: string;
    description: string;
    location: string;
    owner: string;
    pictures: { url: string }[];
    price: string;
    category: string;
    tag: string[];
    createdAt: string;
  };
  

const CreateOrUpdateAdForm = ({defaultValues}: {defaultValues: object}) => {

    const { loading: loadingCat, error: errorCat, data: dataCat } = useGetAllCategoriesQuery();
    const {
      loading: loadingTags,
      error: errorTags,
      data: dataTags,
    } = useGetAllTagsQuery();

    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
      } = useForm<FormInputs>({
        criteriaMode: "all",
        defaultValues
      });
    
      const { fields, append, remove } = useFieldArray({
        control,
        name: "pictures",
      });
    
      const onSubmit: SubmitHandler<FormInputs> = async (formData) => {
        const transformedData = {
          title: formData.title,
          description: formData.description,
          location: formData.location,
          owner: formData.owner,
          pictures: formData.pictures,
          price: parseFloat(formData.price),
          category: formData.category,
          createdAt: new Date(formData.createdAt).toISOString(),
          tag: formData.tag ? formData.tag.map((el) => ({ id: parseInt(el) })) : [],
        };
        console.log("dataforbackend", transformedData);
    };

    if (loadingCat) return "Submitting...";
    if (errorCat) return `Submission error! ${errorCat.message}`;
  
    if (loadingTags) return "Submitting...";
    if (errorTags) return `Submission error! ${errorTags.message}`;
    
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
                <ul>
                  {fields.map((item, index) => (
                    <li key={item.id}>
                      <input
                        {...register(`pictures.${index}.url` as const)}
                        placeholder={`Photo n°${index + 1}`}
                      />
                      <button type="button" onClick={() => remove(index)}>
                        Delete image
                      </button>
                    </li>
                  ))}
                </ul>
                <button type="button" onClick={() => append({ url: "" })}>
                  Add image
                </button>
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
                  {dataCat?.getAllCategories.map((el: any) => (
                    <option key={el.id} value={el.id}>
                      {el.title}
                    </option>
                  ))}
                  {errors.category && (
                    <span className="errorRed">Ce champ est requis</span>
                  )}
                </select>
                <br />
                <div>
                  <label>Tags:</label>
                  <br />
                  {dataTags?.getAllTags.map((el) => (
                    <div key={el.id}>
                      <input type="checkbox" value={el.id} {...register("tag")} />
                      <label>{el.title}</label>
                    </div>
                  ))}
                </div>
              </div>
              <button className="button sub">Submit</button>
            </div>
          </form>
        </div>
      );
}

export default CreateOrUpdateAdForm