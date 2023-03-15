import { styled } from "../stitches.config";
import { useRouter } from "next/router";
import { ChangeEvent, useEffect, useState } from "react";
import FilterList from "./Filters";
import NewsSvg from "../public/news.svg";

const Logo = styled(NewsSvg, {
  height: "44px",
  width: "200px",
  margin: "10px 5px",
});

const Wrapper = styled("div", {
  display: "flex",
  flexWrap: "wrap",
});

const Input = styled("input", {
  margin: "10px 5px",
  height: "38px",
  padding: "5px 10px",
});

interface Props {
  setExcludedCategories: (excludedCategories: number[]) => void;
  excludedCategories: number[];
}

export default function Navbar(props: Props) {
  const { setExcludedCategories, excludedCategories } = props;

  const router = useRouter();

  const query = router.query.query as string | undefined;

  const [inputValue, setInputValue] = useState("");

  const handleQueryParams = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const searchQuery = event.target.value;
    setInputValue(searchQuery);
    const queryObj = {
      ...router.query,
      ...(searchQuery ? { query: searchQuery } : {}),
    };
    if (!searchQuery) {
      delete queryObj.query;
    }
    router.push({
      pathname: router.pathname,
      query: queryObj,
    });
  };

  useEffect(() => {
    if (!inputValue) {
      setInputValue(query || "");
    }
  }, [query]);

  return (
    <Wrapper css={{ paddingY: "$6" }}>
      <Logo alt="news-logo" />
      <Input
        onChange={(e) => handleQueryParams(e)}
        value={inputValue}
        placeholder="Search news here"
      />
      <FilterList
        setExcludedCategories={setExcludedCategories}
        excludedCategories={excludedCategories}
      />
    </Wrapper>
  );
}
