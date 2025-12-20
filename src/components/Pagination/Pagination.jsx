import './styles.scss'

import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@/components/icons'
import { Button } from '@/components/ui/button'
import useLocale from '@/hooks/useLocale'

import { defaultOptions, RowsPerPage } from './options'
import RowsPerPageDropdown from './RowsPerPageDropdown'

const Pagination = ({
  pagination = defaultOptions,
  onPageChange,
  onLimitChange
}) => {
  const { page, limit, total, totalPages } = pagination
  const { t } = useLocale()

  const start = total === 0 ? 0 : (page - 1) * limit + 1
  const end = Math.min(page * limit, total)

  const canGoBack = page > 1
  const canGoForward = page < totalPages

  const handlePrevPage = () => {
    if (canGoBack) {
      onPageChange?.(page - 1)
    }
  }

  const handleNextPage = () => {
    if (canGoForward) {
      onPageChange?.(page + 1)
    }
  }

  const handleLimitSelect = value => {
    onLimitChange?.(value)
  }

  const menu = Object.values(RowsPerPage).map(size => ({
    label: size,
    icon: <CheckIcon size='xs' color={limit === size ? 'green' : 'none'} />,
    onClick: () => handleLimitSelect(size)
  }))

  return (
    <div className='pagination-container'>
      <div className='pagination-container__rows-per-page'>
        <span>{t('pagination.rowsPerPage')}</span>
        <RowsPerPageDropdown label={limit} menu={menu} />
      </div>
      <p>
        {start} - {end} {t('pagination.of')} {total}
      </p>
      <div className='pagination-container__page-buttons'>
        <Button
          variant='ghost'
          size='icon-sm'
          onClick={handlePrevPage}
          disabled={!canGoBack}
        >
          <ChevronLeftIcon size='xs' color='secondary' />
        </Button>
        <Button
          variant='ghost'
          size='icon-sm'
          onClick={handleNextPage}
          disabled={!canGoForward}
        >
          <ChevronRightIcon size='xs' color='secondary' />
        </Button>
      </div>
    </div>
  )
}

export default Pagination
