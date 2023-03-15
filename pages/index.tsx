import { GetServerSideProps, GetServerSidePropsContext } from "next";
import Head from "next/head";
import { styled } from "../stitches.config";
import { QueryClient, useQuery } from "react-query";
import { dehydrate } from "react-query/hydration";
import { ParsedUrlQuery } from "querystring";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import { News } from "../types";
import NewsList from "../components/NewsList";
import searchFuse from "../utils/search";
import { useEffect, useState } from "react";
import Button from "../components/common/Button";

const ResultsNumRefetchWrapper = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  marginLeft: "20px",
});

const Wrapper = styled("div", {
  padding: "0 50px",
});

const fetchData = async (
  query: string | undefined,
  filter: string | undefined,
  excludedCategories: number[]
): Promise<News[]> => {
  const res = await fetch(
    `https://react-challenge.human.hr/last-100-news.json`
  );
  const data: News[] = await res.json();

  const filterByExcludedCategories =
    excludedCategories.length > 0
      ? data?.filter(
          (news) =>
            !excludedCategories.includes(parseInt(news.post_category_id))
        )
      : data;

  const filterByCategory = filter
    ? filterByExcludedCategories.filter(
        (element) => element.post_category_id === filter
      )
    : filterByExcludedCategories;

  const querySearch =
    query && query?.length > 2
      ? searchFuse(query, filterByCategory)
      : filterByCategory;

  return querySearch;
};
export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  const query = context.req.headers.query as string | undefined;
  const filter = context.req.headers.filter as string | undefined;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery(["news"], () => fetchData(query, filter, []));
  return {
    props: {
      data: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  const router = useRouter();

  const query = router.query.query as string | undefined;
  const filter = router.query.filter as string | undefined;

  const [news, setNews] = useState<Array<News>>([]);
  const [excludedCategories, setExcludedCategories] = useState<Array<number>>(
    []
  );

  const { data: newsData, refetch } = useQuery(
    ["news"],
    () => fetchData(query, filter, excludedCategories),
    {
      onSuccess: (data) => {
        setNews(data || []);
      },
    }
  );

  useEffect(() => {
    refetch();
  }, [query, filter, excludedCategories, refetch]);

  const handleDeleteNews = (newsSlug: string) => {
    setNews(news.filter((news) => news.slug !== newsSlug));
  };

  const showRefetchButton = !filter && news?.length !== newsData?.length;

  return (
    <Wrapper>
      <Head>
        <title>Latest space news</title>
      </Head>
      <Navbar
        setExcludedCategories={setExcludedCategories}
        excludedCategories={excludedCategories}
      />
      <ResultsNumRefetchWrapper>
        <p>
          There are <b>{news?.length || 0}</b> search results.
        </p>
        {showRefetchButton && (
          <Button label="Refetch" onClick={() => refetch()} />
        )}
      </ResultsNumRefetchWrapper>
      <NewsList newsList={news} deleteNews={handleDeleteNews} />
    </Wrapper>
  );
}
