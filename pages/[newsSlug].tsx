import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { styled } from "../stitches.config";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import { News } from "../types";
import Image from "next/image";
import { getFullImageUrl } from "../utils/common";

const Wrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "center",
});

const ImageWrapper = styled("div", {
  height: "500px",
});

const StyledImage = styled(Image, {
  objectFit: "contain",
  maxHeight: "500px",
  position: "relative",
});

const Title = styled("h3", {
  margin: "20px 40px",
  height: "20px",
});

const fetchData = async (slug: string): Promise<News | undefined> => {
  const res = await fetch(
    `https://react-challenge.human.hr/last-100-news.json`
  );
  const data: News[] = await res.json();

  const singleNews = data.find((news) => news.slug === slug);

  return singleNews;
};
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  const { params } = context;
  const slug = params?.newsSlug as string;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["single-news"], () => fetchData(slug));
  return {
    props: {
      data: dehydrate(queryClient),
    },
  };
};

export default function NewsPage() {
  const router = useRouter();

  const slug = router.query.newsSlug as string;

  const { data: newsData } = useQuery(["single-news"], () => fetchData(slug));

  return (
    <Wrapper>
      <Head>
        <title>Read about {newsData?.title || ""}</title>
      </Head>
      <ImageWrapper>
        <StyledImage
          src={getFullImageUrl(newsData?.post_image || "")}
          alt="post-image"
          layout="fill"
        />
      </ImageWrapper>
      <Title>{newsData?.title}</Title>
      <div dangerouslySetInnerHTML={{ __html: newsData?.excerpt || "" }} />
    </Wrapper>
  );
}
