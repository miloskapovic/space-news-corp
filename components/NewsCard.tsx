import { styled } from "../stitches.config";
import Image from "next/image";
import { useState } from "react";
import { News } from "../types";
import { getFullImageUrl } from "../utils/common";
import DeleteButton from "./common/DeleteButton";
import { keyframes } from "@stitches/react";
import ConfirmationModal from "./common/ConfirmationModal";
import { useRouter } from "next/router";

const ImageWrapper = styled("div", {
  maxWidth: "100%",
  height: "200px",
  overflow: "hidden",
  objectFit: "cover",
  position: "relative",
});

const fadeIn = keyframes({
  "0%": {
    opacity: 0,
    transform: "translateY(-10px)",
  },
  "100%": {
    opacity: 1,
    transform: "translateY(0)",
  },
});

const CardWrapper = styled("div", {
  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
  transition: "0.3s",
  width: "300px",
  margin: "10px",
  position: "relative",
  "& .delete-button": {
    visibility: "hidden",
    opacity: 0,
    transform: "translateY(-10px)",
  },
  "&:hover": {
    boxShadow: "0 8px 16px 0 rgba(0,0,0,0.3)",
    "& .delete-button": {
      visibility: "visible",
      animation: `${fadeIn} 0.2s ease-in-out forwards`,
    },
  },
});

const CardContainer = styled("div", {
  padding: "2px 16px",
});

const StyledImage = styled(Image, {
  objectFit: "contain",
});

interface Props {
  news: News;
  deleteNews: (newsSlug: string) => void;
}

export default function NewsCard(props: Props) {
  const { news, deleteNews } = props;

  const router = useRouter();
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleConfirm = () => {
    deleteNews(news.slug);
    setShowConfirmationModal(false);
  };

  return (
    <>
      <CardWrapper
        onClick={() => router.push(`/${encodeURIComponent(news.slug)}`)}
      >
        <DeleteButton
          className="delete-button"
          onClick={() => setShowConfirmationModal(true)}
        />
        <ImageWrapper className="image-wrapper">
          <StyledImage
            src={getFullImageUrl(news.post_thumbnail)}
            alt="news"
            layout="fill"
          />
        </ImageWrapper>

        <CardContainer>
          <h4>
            <b>{news.title}</b>
          </h4>
        </CardContainer>
      </CardWrapper>
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onConfirm={handleConfirm}
        onCancel={() => setShowConfirmationModal(false)}
      />
    </>
  );
}
