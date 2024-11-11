import AppErrorBoundary from "../../components/AppErrorBoundary";
import UserList from "./components/UserLIst";
import { Box, Typography } from "@mui/material";
import UserFilterForm from "./components/UserListFilterForm";
import { useSearchParams } from "react-router-dom";
import React from "react";

export type handlePageChange = ({
  page,
  pageSize,
}: {
  page: number;
  pageSize: number;
}) => void;

const Users = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const defaultParams = {
    filter: {
      searchBy: searchParams.get("searchBy") || "",
      searchValue: searchParams.get("searchValue") || "",
      role: searchParams.get("role") || "",
    },
    sort: {
      //sorting
      sort: "name",
      sortBy: searchParams.get("sortBy") || "desc",
    },
    pagination: {
      //pagination
      page: searchParams.get("page") || "1",
      limit: searchParams.get("limit") || "10",
    },
  };

  //pagination ---------------
  const handlePageChange: handlePageChange = ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }) => {
    setSearchParams({
      ...defaultParams.filter,
      ...defaultParams.sort,
      page: String(page || 1),
      limit: String(pageSize || 10),
    });
  };

  const pagination = {
    page: searchParams.get("page") ? Number(searchParams.get("page")) - 1 : 0,
    pageSize: searchParams.get("limit")
      ? Number(searchParams.get("limit"))
      : 10,
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...defaultParams.pagination,
      ...defaultParams.sort,
      ...defaultParams.filter,
      role: e.target.value,
    });
  };

  const handleSearchChange = (value: {
    searchBy: string;
    searchValue: string;
  }) => {
    setSearchParams({
      ...defaultParams.filter,
      ...defaultParams.pagination,
      ...defaultParams.sort,
      searchBy: value.searchBy,
      searchValue: value.searchValue,
    });
  };

  const handleSortingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchParams({
      ...defaultParams.filter,
      ...defaultParams.pagination,
      sortBy: e.target.value,
    });
  };

  return (
    <Box sx={{ padding: "15px 0 15px 0" }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        User Management
      </Typography>
      <AppErrorBoundary>
        <UserFilterForm
          defaultValue={{
            ...defaultParams.filter,
            ...defaultParams.sort
          }}
          handleSearchChange={handleSearchChange}
          handleRoleChange={handleRoleChange}
          hamdleSortingChange={handleSortingChange}
        />
      </AppErrorBoundary>
      <AppErrorBoundary>
        <UserList
          handlePageChange={handlePageChange}
          pagination={pagination}
          filter={{
            ...defaultParams.filter,
            ...defaultParams.sort
          }}
        />
      </AppErrorBoundary>
    </Box>
  );
};

export default Users;
