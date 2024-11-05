import { useQuery } from "@tanstack/react-query";
import { getRoles } from "../../api/roleApi";

const useRole = () => {
  const query = useQuery({
    queryKey: ["role"],
    queryFn: getRoles,
  });

  console.log(query)
  return query;

};

export default useRole;
