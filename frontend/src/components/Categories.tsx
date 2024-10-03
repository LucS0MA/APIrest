import { Link } from "react-router-dom";

export interface CategoriesProps {
  id: number;
  title: string;
}

function Categories({ title }: CategoriesProps) {
  return (
    <>
      <Link
        to={`/searchCat/${title}`}
        style={{ textDecoration: "none", color: "grey" }}
      >
        <a href="" className="category-navigation-link">
          {title}
        </a>{" "}
      </Link>
    </>
  );
}

export default Categories;
