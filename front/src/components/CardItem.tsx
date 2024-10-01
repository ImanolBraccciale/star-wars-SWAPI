// src/components/CardItem.tsx
import styles from '../styles/CardItem.module.css';

interface CardItemProps {
  title: string;
  description: string;
  imageUrl?: string; // Imagen opcional
  onClick: () => void; // Acción al hacer click
}

const CardItem = ({ title, description, imageUrl, onClick }: CardItemProps) => {
  return (
    <div className={styles.cardItem} onClick={onClick}>
      {imageUrl && <img src={imageUrl} alt={title} className={styles.cardImage} />}
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDescription}>{description}</p>
      <button className={styles.cardButton}>Ver más</button>
    </div>
  );
};

export default CardItem;
