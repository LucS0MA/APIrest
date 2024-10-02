export interface CategoriesProps {
  id: number;
  title: string;
  onClick: (title: string) => void;
}

function Categories({ title, onClick }: CategoriesProps) {
  return (
    <>
      <a
        href=""
        className="category-navigation-link"
        onClick={() => onClick(title)}
      >
        {title}
      </a>{" "}
    </>
  );
}

export default Categories;
