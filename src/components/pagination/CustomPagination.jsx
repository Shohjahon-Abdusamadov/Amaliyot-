import React from "react";
import { Pagination } from "flowbite-react";
import "./pagination.module.css";

const CustomPagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePageChange = (page) => {
    onPageChange(page);
    console.log(`Selected Page: ${page}`);
  };

  return (
    <div className="flex overflow-x-auto sm:justify-center">
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        className="pagination"
      />
    </div>
  );
};

export default CustomPagination;
