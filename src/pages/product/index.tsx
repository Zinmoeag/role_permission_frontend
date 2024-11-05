import { List, Box } from "@mui/material";
// import Grid from '@mui/material/Grid';
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import CardContainer from "../../features/card";
import useInView from "../../hooks/useInView";

const items = Array.from({ length: 100 }).map((_, i) => ({
  id: i,
  title: `Product ${i}`,
}));

type ITEM = {
  id: number;
  title: string;
};

const LIMIT = 12;

function fetchItems({ pageParam }: { pageParam: number }): Promise<{
  data: ITEM[];
  currentPage: number;
  nextPage: number | null;
}> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: items.slice(pageParam, pageParam + LIMIT),
        currentPage: pageParam,
        nextPage: pageParam + LIMIT < items.length ? pageParam + LIMIT : null,
      });
    }, 1000);
  });
}

const Products = () => {
  const { data, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: fetchItems,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const {ref, inView} = useInView();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      <h1 className="text-2xl">Products</h1>
      //compound component
      {data?.pages.map((page) => (
        <Box display="grid" gridTemplateColumns="repeat(4, 1fr)" key={page.currentPage}>
          {page.data.map((item) => (
            <Box sx={{ md: 4, sm: 6, xs: 12 }} gap={2} key={item.id}>
              <CardContainer.Card
                key={item.id}
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMRTiwGbgWmppS5fxAmHVT0iGVpoGE82757A&s"
                title={"helo"}
                price="100$"
              />
            </Box>
          ))}
        </Box>
      ))}
      <List ref={ref}>{isFetchingNextPage && "loading ...."}</List>
    </>
  );
};
export default Products;
