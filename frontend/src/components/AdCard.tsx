import { Link } from "react-router-dom";

export interface AdCardProps {
  id: number;
  title: string;
  picture: string;
  price: number;
  description: string;
  location: string;
  createdAt: string;
  owner: string;
  category: { title: string; id: number };
  tag: { title: string; id: number }[];
}

function AdCard({ title, picture, price, category, tag, id }: AdCardProps) {
  return (
    <div className="ad-card-container">
      <Link className="ad-card-link" to={`/ad/${id}`}>
        <div className="ad-card-text">
          <div className="ad-card-category">{category.title}</div>
          {tag && tag.length > 0
            ? tag.map((tag) => (
                <span key={tag.id} className="ad-card-tag">
                  {tag.title}
                </span>
              ))
            : ""}
        </div>
        <img className="ad-card-image" src={picture} alt={title} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>
          <div className="ad-card-price">{price} €</div>
        </div>
      </Link>
    </div>
  );
}

export default AdCard;
