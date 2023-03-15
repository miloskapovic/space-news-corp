import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { filterNames } from "../static/constants";
import { styled } from "../stitches.config";
import Button from "./common/Button";

const ListWrapper = styled("div", {
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
});

const DropdownWrapper = styled("div", {
  position: "relative",
  display: "flex",
});
const DropdownContainer = styled("div", {
  width: "auto",
  boxShadow: "0 0 0.5em 0 rgba(0,0,0,0.3)",
  padding: "1.5em",
  position: "absolute",
  top: "60px",
  zIndex: 1,
  backgroundColor: "white",
});

const CheckboxWrapper = styled("div", {
  whiteSpace: "nowrap",
});

interface Props {
  setExcludedCategories: (excludedCategories: number[]) => void;
  excludedCategories: number[];
}

export default function FilterList(props: Props) {
  const { setExcludedCategories, excludedCategories } = props;
  const router = useRouter();

  const filter = router.query.filter as string | undefined;

  const [activeFilter, setActiveFilter] = useState<number>(0);
  const [showToggleFilterList, setShowToggleFilterList] =
    useState<boolean>(false);

  useEffect(() => {
    setActiveFilter(filter ? parseInt(filter) : 0);
  }, [filter]);

  const handleFilter = (newFilter: number) => {
    setActiveFilter(newFilter);
    const queryObj = {
      ...router.query,
      ...(newFilter ? { filter: newFilter } : {}),
    };
    if (!newFilter) {
      delete queryObj.filter;
    }
    router.push({
      pathname: router.pathname,
      query: queryObj,
    });
  };

  const handleExcludeCategorieCheckbox = (categorieChecked: number) => {
    if (excludedCategories.includes(categorieChecked)) {
      setExcludedCategories(
        excludedCategories.filter((category) => category !== categorieChecked)
      );
    } else {
      setExcludedCategories([...excludedCategories, categorieChecked]);
    }
  };

  return (
    <ListWrapper>
      <Button
        active={activeFilter === 0}
        onClick={() => handleFilter(0)}
        label="Show All"
      />
      {Object.entries(filterNames).map(([key, value]) => (
        <Button
          key={key}
          onClick={() => handleFilter(parseInt(key))}
          active={activeFilter === parseInt(key)}
          label={value}
        />
      ))}
      <DropdownWrapper>
        <Button
          dropdown
          onClick={() => setShowToggleFilterList(!showToggleFilterList)}
          label="Remove category"
        />
        {showToggleFilterList && (
          <DropdownContainer>
            {Object.entries(filterNames).map(([key, value]) => (
              <CheckboxWrapper key={key} style={{ whiteSpace: "nowrap" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={excludedCategories.includes(parseInt(key))}
                    onChange={() =>
                      handleExcludeCategorieCheckbox(parseInt(key))
                    }
                  />
                  {value}
                </label>
              </CheckboxWrapper>
            ))}
          </DropdownContainer>
        )}
      </DropdownWrapper>
    </ListWrapper>
  );
}
