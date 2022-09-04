import React from 'react'
import styles from './Collection.module.scss'

type CollectionProps = {
  name: string;
  images: string[];
}

const Collection: React.FC<CollectionProps> = ({ name, images }) => {
  return (
    <section className={styles.collection}>
      <img className={styles.big} src={images[0]} alt="big image" />
      <div className={styles.block}>
        <img className={styles.small} src={images[1]} alt="small image" />
        <img className={styles.small} src={images[2]} alt="small image" />
        <img className={styles.small} src={images[3]} alt="small image" />
      </div>
      <h2>{name}</h2>
    </section>
  );
};

export default Collection