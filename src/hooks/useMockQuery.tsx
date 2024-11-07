import { useQuery } from "@tanstack/react-query";

const useMockQuery = (queryKey: string[], mockData: any) => {
  const query = useQuery({
    queryKey: queryKey,
    queryFn: () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(mockData);
        }, 1000);
      });
    },
  });

  return query;
};

export default useMockQuery;
