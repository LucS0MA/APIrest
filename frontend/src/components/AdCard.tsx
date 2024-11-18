import { Link } from "react-router-dom";

export interface AdCardProps {
  id: number;
  title: string;
  pictures: { url: string; id: number }[];
  price: number;
  description: string;
  location: string;
  createdAt: string;
  owner: string;
  category: { title: string; id: number } | undefined | null;
  tag: { title: string; id: number }[] | undefined | null;
}

function AdCard({ title, pictures, price, category, tag, id }: AdCardProps) {
  const imageUrl = pictures.length > 0 ? pictures[0].url : "";
  return (
    <div className="ad-card-container">
      <Link className="ad-card-link" to={`/ad/${id}`}>
        <div className="ad-card-text">
          <div className="ad-card-category">{category?.title}</div>
          {tag && tag.length > 0
            ? tag.map((tag) => (
                <span key={tag.id} className="ad-card-tag">
                  {tag.title}
                </span>
              ))
            : ""}
        </div>
        <img className="ad-card-image" src={imageUrl} alt={title} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{price} €</div>
        </div>
      </Link>
    </div>
  );
}

export default AdCard;
