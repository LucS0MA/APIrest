import axios from "axios";
import { useEffect, useState } from "react";
import { CategoriesProps } from "../components/Categories";

const NewAdFormPage = () => {
  const [categories, setCategories] = useState([] as CategoriesProps[]);
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
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form as HTMLFormElement);
        const formJson = Object.fromEntries(formData.entries());
        axios.post("http://localhost:3000/ad", formJson);
      }}
    >
      <label>
        Titre de l'annonce:
        <br />
        <input className="text-field" type="text" name="title" />
      </label>
      <br />
      <label>
        Description:
        <br />
        <input className="text-field" type="text" name="description" />
      </label>
      <br />
      <label>
        Vendeur:
        <br />
        <input className="text-field" type="text" name="owner" />
      </label>
      <br />
      <label>
        Prix:
        <br />
        <input className="text-field" type="number" name="price" />
      </label>
      <br />
      <label>
        Image:
        <br />
        <input className="text-field" type="text" name="picture" />
      </label>
      <br />
      <label>
        Ville:
        <br />
        <input className="text-field" type="text" name="location" />
      </label>
      <br />
      <label>
        Date:
        <br />
        <input className="text-field" type="date" name="createdAt" />
      </label>
      <br />
      <select name="category">
        {categories.map((el) => (
          <option key={el.id} value={el.id}>
            {el.title}
          </option>
        ))}
      </select>
      <button className="button">Submit</button>
    </form>
  );
};

export default NewAdFormPage;
