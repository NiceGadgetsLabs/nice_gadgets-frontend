import { Button } from '../../atoms/Button/Button';
import { Icon } from '../../atoms/Icon/Icon';
import { scrollToTop } from '../../../utils/scrollToTop';
import './Pagination.scss';

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const getPaginationRange = () => {
    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const showLeftDots = currentPage > 4;
    const showRightDots = currentPage < totalPages - 3;

    if (!showLeftDots && showRightDots) {
      const leftRange = Array.from({ length: 5 }, (_, i) => i + 1);
      return [...leftRange, '...', totalPages];
    }

    if (showLeftDots && !showRightDots) {
      const rightItemCount = 5;
      const rightRange = Array.from(
        { length: rightItemCount },
        (_, i) => totalPages - rightItemCount + i + 1,
      );
      return [1, '...', ...rightRange];
    }

    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
  };

  const paginationRange = getPaginationRange();

  return (
    <div className="pagination" style={{ height: '32px', margin: '0 auto', marginTop: '40px' }}>
      <Button
        aria-label="Previous page"
        variant="element"
        disabled={currentPage === 1}
        onClick={() => {
          onPageChange(currentPage - 1);
          scrollToTop();
        }}
        className="pagination__button"
      >
        <Icon type="arrow-left" width={16} height={16} />
      </Button>

      {paginationRange.map((page, index) => {
        if (page === '...') {
          return (
            <span key={`dots-${index}`} className="pagination__dots">
              ...
            </span>
          );
        }

        return (
          <Button
            key={page}
            aria-label={`Page № ${page}`}
            variant="page"
            onClick={() => {
              onPageChange(page as number);
              scrollToTop();
            }}
            className="pagination__button"
            selected={page === currentPage}
          >
            {page}
          </Button>
        );
      })}

      <Button
        aria-label="Next page"
        variant="element"
        disabled={currentPage === totalPages}
        onClick={() => {
          onPageChange(currentPage + 1);
          scrollToTop();
        }}
        className="pagination__button"
      >
        <Icon type="arrow-right" width={16} height={16} />
      </Button>
    </div>
  );
}
