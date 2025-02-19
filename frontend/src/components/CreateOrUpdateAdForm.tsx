import { ErrorMessage } from "@hookform/error-message";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { Fragment } from "react/jsx-runtime";
import {
  useGetAllCategoriesQuery,
  useGetAllTagsQuery,
} from "../generated/graphql-types";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const CreateOrUpdateAdForm = ({
  defaultValues,
  submitToBackend,
}: {
  defaultValues: object;
  submitToBackend: any;
}) => {
  const navigate = useNavigate();
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
  type Inputs = {
    title: string;
    description: string;
    owner: string;
    price: string;
    pictures: { url: string }[];
    location: string;
    createdAt: string;
    category: string;
    tag: string[];
    __typename?: string;
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useForm<Inputs>({
    criteriaMode: "all",
    defaultValues: defaultValues,
  });

  watch("pictures");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pictures",
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const tags = Array.isArray(data.tag) ? data.tag : [data.tag];
    const cleanedPictures = data.pictures.map(({ url }) => ({ url }));
    console.log("data from react hook form", data);
    delete data.__typename;
    data.pictures = data.pictures.map((el) => {
      return { url: el.url };
    });
    const dataForBackend = {
      ...data,
      price: parseInt(data.price),
      pictures: cleanedPictures,
      createdAt: data.createdAt + "T00:00:00.000Z",
      tag: tags.map((el) => ({ id: parseInt(el) })),
    };

    // console.log("data for backend", dataForBackend);
    await submitToBackend({ variables: { data: dataForBackend } });
    toast.success("Succes");
    navigate("/");
  };

  if (loadingCat && loadingTags) return <p>Loading...</p>;
  if (errorCat && errorTags)
    return (
      <p>
        Error : {errorCat.message}, {errorTags.message}
      </p>
    );

  if (dataTags && dataCat) {
    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="adForm">
          <div className="formColumn">
            <>
              <label>
                Titre de l'annonce:
                <br />
                <input
                  className="text-field"
                  {...register("title", {
                    minLength: { value: 2, message: "Minimum 2 characters" },
                    required: "This field is required",
                  })}
                />
              </label>
              <ErrorMessage
                errors={errors}
                name="title"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => {
                    console.log(message);
                    return (
                      <Fragment key={type}>
                        <br />
                        <span className="error-message">{message}</span>
                      </Fragment>
                    );
                  })
                }
              />
            </>
            <br />
            <>
              <label>
                Description:
                <br />
                <input
                  className="text-field"
                  {...register("description", {
                    minLength: { value: 10, message: "Minimum 10 characters" },
                    required: "This field is required",
                  })}
                />
              </label>
              <ErrorMessage
                errors={errors}
                name="description"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => {
                    console.log(message);
                    return (
                      <Fragment key={type}>
                        <br />
                        <span className="error-message">{message}</span>
                      </Fragment>
                    );
                  })
                }
              />
            </>
            <br />
            <>
              <label>
                Vendeur:
                <br />
                <input
                  className="text-field"
                  {...register("owner", {
                    minLength: { value: 2, message: "Minimum 2 characters" },
                    required: "This field is required",
                  })}
                />
              </label>
              <ErrorMessage
                errors={errors}
                name="owner"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => {
                    console.log(message);
                    return (
                      <Fragment key={type}>
                        <br />
                        <span className="error-message">{message}</span>
                      </Fragment>
                    );
                  })
                }
              />
            </>
            <br />
            <>
              <label>
                Prix :
                <br />
                <input
                  type="number"
                  className="text-field"
                  {...register("price", {
                    min: { value: 0, message: "Minimum 0" },
                    required: "This field is required",
                  })}
                />
              </label>
              <ErrorMessage
                errors={errors}
                name="price"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => {
                    console.log(message);
                    return (
                      <Fragment key={type}>
                        <br />
                        <span className="error-message">{message}</span>
                      </Fragment>
                    );
                  })
                }
              />
            </>
            <br />
            <>
              <br />
              <button
                className="button"
                type="button"
                onClick={() => append({ url: "" })}
              >
                Add Image
              </button>
              <br />
              <div className="pictures-field">
                {fields.map((field, index) => {
                  return (
                    <div key={field.id}>
                      <section className="image-input-and-remove">
                        {getValues(`pictures.${index}.url`) ? (
                          <img src={getValues(`pictures.${index}.url`)} className="previsual"/>
                        ) : (
                          <input
                            id="file"
                            type="file"
                            onChange={async (
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => {
                              if (e.target.files) {
                                console.log(e.target.files[0]);
                                const formData = new FormData();
                                formData.append("file", e.target.files[0]);

                                try {
                                  const result = await axios.post(
                                    "/img",
                                    formData
                                  );
                                  setValue(
                                    `pictures.${index}.url`,
                                    result.data.filename
                                  );
                                  console.log(result);
                                } catch (error) {
                                  console.error(error);
                                }
                              }
                            }}
                          />
                        )}

                        <input
                          className="text-field"
                          placeholder="Your image url"
                          {...register(`pictures.${index}.url` as const)}
                          type="hidden"
                        />
                        <button
                          className="button"
                          onClick={() => remove(index)}
                        >
                          Remove
                        </button>
                        <br />
                      </section>
                      <span>{errors.pictures?.[index]?.url?.message}</span>
                    </div>
                  );
                })}
              </div>
            </>
          </div>
          <br />
          <div className="formColumn">
            <>
              <label>
                Ville :
                <br />
                <input
                  className="text-field"
                  {...register("location", {
                    minLength: { value: 2, message: "Minimum 2 characters" },
                    required: "This field is required",
                  })}
                />
              </label>
              <ErrorMessage
                errors={errors}
                name="location"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => {
                    console.log(message);
                    return (
                      <Fragment key={type}>
                        <br />
                        <span className="error-message">{message}</span>
                      </Fragment>
                    );
                  })
                }
              />
            </>
            <br />
            <>
              <label>
                Date :
                <br />
                <input
                  type="date"
                  className="text-field"
                  {...register("createdAt", {
                    required: "This field is required",
                  })}
                />
              </label>
              <ErrorMessage
                errors={errors}
                name="createdAt"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => {
                    console.log(message);
                    return (
                      <Fragment key={type}>
                        <br />
                        <span className="error-message">{message}</span>
                      </Fragment>
                    );
                  })
                }
              />
            </>
            <br />
            <>
              <label>
                <br />
                Category :
                <br />
                <select {...register("category")}>
                  {dataCat.getAllCategories.map((el: any) => (
                    <option key={el.id} value={el.id}>
                      {el.title}
                    </option>
                  ))}
                </select>
              </label>
              <ErrorMessage
                errors={errors}
                name="createdAt"
                render={({ messages }) =>
                  messages &&
                  Object.entries(messages).map(([type, message]) => {
                    console.log(message);
                    return (
                      <Fragment key={type}>
                        <br />
                        <span className="error-message">{message}</span>
                      </Fragment>
                    );
                  })
                }
              />
            </>
            <br />
            <>
              {dataTags.getAllTags.map((tag) => (
                <label key={tag.id} className="tagsContainer">
                  <input
                    type="checkbox"
                    value={tag.id}
                    {...register("tag")}
                    className="tags"
                  />
                  {tag.title}
                </label>
              ))}
            </>
            <input type="submit" className="button adSub" />
          </div>
        </form>
      </>
    );
  }
};

export default CreateOrUpdateAdForm;
