import axios from "axios";
import { useEffect, useState } from "react";
import { CategoriesProps } from "../components/Categories";
import { AdCardProps } from "../components/AdCard";
import { useParams } from "react-router-dom";

const AdModification = () => {
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

  useEffect(() => {
    const fetchDataDetails = async () => {
      try {
        const result = await axios.get(`http://localhost:3000/ad/${id}`);
        setNewAd(result.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    fetchDataDetails();
  }, [id]);

  if (newAd) {
    return (
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.target;
          const formData = new FormData(form as HTMLFormElement);
          const formJson = Object.fromEntries(formData.entries());
          axios.put(`http://localhost:3000/ad/${id}`, formJson);
        }}
      >
        <label>
          Titre de l'annonce:
          <br />
          <input
            className="text-field"
            type="text"
            name="title"
            defaultValue={newAd.title}
          />
        </label>
        <br />
        <label>
          Description:
          <br />
          <input
            className="text-field"
            type="text"
            name="description"
            defaultValue={newAd.description}
          />
        </label>
        <br />
        <label>
          Vendeur:
          <br />
          <input
            className="text-field"
            type="text"
            name="owner"
            defaultValue={newAd.owner}
          />
        </label>
        <br />
        <label>
          Prix:
          <br />
          <input
            className="text-field"
            type="number"
            name="price"
            defaultValue={newAd.price}
          />
        </label>
        <br />
        <label>
          Image:
          <br />
          <input
            className="text-field"
            type="text"
            name="picture"
            defaultValue={newAd.picture}
          />
        </label>
        <br />
        <label>
          Ville:
          <br />
          <input
            className="text-field"
            type="text"
            name="location"
            defaultValue={newAd.location}
          />
        </label>
        <br />
        <label>
          Date:
          <br />
          <input
            className="text-field"
            type="date"
            name="createdAt"
            defaultValue={new Date(newAd.createdAt as string)
              .toISOString()
              .slice(0, 10)}
          />
        </label>
        <br />
        <select name="category" defaultValue={newAd.category?.id}>
          {categories.map((el) => (
            <option key={el.id} value={el.id}>
              {el.title}
            </option>
          ))}
        </select>
        <button className="button">Submit</button>
      </form>
    );
  } else {
    return <p>Loading ...</p>;
  }
};

export default AdModification;
