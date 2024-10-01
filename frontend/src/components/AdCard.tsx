export interface AdCardProps {
  id: number;
  title: string;
  picture: string;
  price: number;
  link: string;
  description: string;
  location: string;
  createdAt: string;
  owner: string;
  category: { title: string };
}

function AdCard({ title, picture, price, link, category }: AdCardProps) {
  return (
    <div className="ad-card-container">
      <a className="ad-card-link" href={link}>
        <div className="ad-card-category">{category.title}</div>
        <img className="ad-card-image" src={picture} />
        <div className="ad-card-text">
          <div className="ad-card-title">{title}</div>

          <div className="ad-card-price">{price}</div>
        </div>
      </a>
    </div>
  );
}

export default AdCard;
