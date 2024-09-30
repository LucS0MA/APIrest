export interface CategoriesProps {
  title: string;
}

function Categories({ title }: CategoriesProps) {
  return (
    <>
      <a href="" className="category-navigation-link">
        {title}
      </a>{" "}
      •
    </>
  );
}

export default Categories;
