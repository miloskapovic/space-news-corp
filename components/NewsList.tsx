import ContentLoader from "react-content-loader";
import { styled } from "../stitches.config";
import { News } from "../types";
import NewsCard from "./NewsCard";

const LoaderWrapper = styled("div", {
  margin: "10px",
  height: "300px",
  width: "300px",
});

const ListWrapper = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

const NewsLoader = () => (
  <LoaderWrapper>
    <ContentLoader width={300} height={300} viewBox="0 0 300 300">
      <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
    </ContentLoader>
  </LoaderWrapper>
);

interface Props {
  newsList: News[] | undefined;
  deleteNews: (newsSlug: string) => void;
}

export default function NewsList(props: Props) {
  const { newsList, deleteNews } = props;

  return newsList ? (
    <ListWrapper>
      {newsList?.map((news, index) => (
        <NewsCard
          key={`${news.slug}-${index}`}
          news={news}
          deleteNews={deleteNews}
        />
      ))}
    </ListWrapper>
  ) : (
    <ListWrapper>
      {[...Array(100)].map((_, i) => (
        <NewsLoader key={i} />
      ))}
    </ListWrapper>
  );
}
