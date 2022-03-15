import React from "react";
import ImageGallery from "react-image-gallery";
import styles from "../../../styles/carousel.module.css";
import { useRouter } from "next/router";

//See here for carousel docs: https://openbase.com/js/react-image-gallery

function Carousel({ inProgressBooks, currentBook, updateCurrentBook }) {


  const router = useRouter();

  const images = inProgressBooks.map((book) => {
    return {
      original: book.cover,
      thumbnail: book.cover,
      originalHeight: "350",
      //   originalWidth: "150",
      thumbnailHeight: "90",
      //   thumbnailWidth: "30",
      originalTitle: book.id, //need this to be id rather than title because it gets passed to updateCurrentBook function
      description: book.title,
      thumbnailLabel: book.title,
      originalAlt: book.title,
    };
  });

  return (
    <div className={styles.image}>
      <ImageGallery
        items={images}
        showFullscreenButton={false}
        showPlayButton={false}
        onClick={(e) => {
          updateCurrentBook(e.target.title); //this passes in the book id number to the updateCurrentBook function - can't call it id for some reason
          console.log(currentBook);

          router.push("/readinglog");
        }}
      />
    </div>
  );
}

export default Carousel;
