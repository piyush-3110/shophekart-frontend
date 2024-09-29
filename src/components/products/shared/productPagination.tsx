import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { usePathname, useRouter } from "next/navigation";

const ProductPagination = ({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const validatePageNumber = (pageNumber: number, totalPages: number) => {
    if (pageNumber < 1) {
      return 1;
    } else if (pageNumber > totalPages) {
      return totalPages;
    } else {
      return pageNumber;
    }
  };

  const handlePageChange = (pageNumber: number) => {
    const validatedPage = validatePageNumber(pageNumber, totalPages);
    router.push(`${pathname}?page=${validatedPage}`);
  };

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            className={`${currentPage === 1 && "cursor-not-allowed "}`}
            href={`${pathname}?page=${currentPage === 1 ? 1 : currentPage - 1}`}
            onClick={() =>
              handlePageChange(currentPage === 1 ? 1 : currentPage - 1)
            }
          />
        </PaginationItem>
        {pages.map((pageNumber: number) => {
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={`${pathname}?page=${pageNumber}`}
                onClick={() => handlePageChange(pageNumber)}
                isActive={currentPage === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}
        <PaginationItem>
          <PaginationNext
            className={`${currentPage === totalPages && "cursor-not-allowed"}`}
            href={`${pathname}?page=${
              currentPage === totalPages ? currentPage : currentPage + 1
            }`}
            onClick={() =>
              handlePageChange(
                currentPage === totalPages ? currentPage : currentPage + 1
              )
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default ProductPagination;
