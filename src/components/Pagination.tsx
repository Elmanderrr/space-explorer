import { useState } from "react";
import { Button, IconButton } from "@material-tailwind/react";
import { range } from "lodash-es";

export interface PaginationProps {
  page: number;
  pageChange: (page: number) => void;
}

export function Pagination(props: PaginationProps) {
  const [page, setPage] = useState(props.page);
  const displayCount = 5;

  const calcRange = (page: number): number[] => {
    const displayGroup = Math.ceil(page / displayCount);
    const end = displayGroup * displayCount + 1;
    const start = end - displayCount;

    return range(start, end);
  };

  if (props.page !== page) {
    setPage(props.page);
  }

  const pages = calcRange(page);

  const handlePage = (newPage: number) => {
    if (page === newPage) {
      return;
    }

    setPage(newPage);
    props.pageChange(newPage);
  };

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="text"
        className="flex items-center gap-2"
        disabled={page === 1}
        onClick={() => handlePage(page - 1)}
      >
        <i className="fas fa-arrow-left"></i>
      </Button>
      <div className="flex items-center gap-2">
        {pages.map((p) => (
          <IconButton
            className={p === page ? "cursor-default" : "cursor-pointer"}
            size="sm"
            key={p}
            onClick={() => handlePage(p)}
            variant={p === page ? "filled" : "text"}
          >
            <div>{p}</div>
          </IconButton>
        ))}
      </div>
      <Button
        variant="text"
        size="sm"
        className="flex items-center gap-2"
        onClick={() => handlePage(page + 1)}
      >
        <i className="fas fa-arrow-right"></i>
      </Button>
    </div>
  );
}
