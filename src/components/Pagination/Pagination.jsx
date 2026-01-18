import useLocale from '@/hooks/useLocale'

import { NextButton } from './elements/NextButton'
import { PrevButton } from './elements/PrevButton'
import { RowsPerPageDropdown } from './elements/RowsPerPageDropdown'
import { defaultOptions, limitOptions } from './options'

export const Pagination = ({
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

  const handleLimitChange = value => {
    onLimitChange?.(Number(value))
  }

  return (
    <div className='flex h-11 items-center justify-end gap-6 text-muted-foreground'>
      <div className='flex items-center gap-2'>
        <span>{t('pagination.rowsPerPage')}</span>
        <RowsPerPageDropdown
          value={limit}
          options={limitOptions}
          onChange={handleLimitChange}
        />
      </div>
      <p>
        {start} - {end} {t('pagination.of')} {total}
      </p>
      <div className='flex items-center gap-2'>
        <PrevButton onClick={handlePrevPage} disabled={!canGoBack} />
        <NextButton onClick={handleNextPage} disabled={!canGoForward} />
      </div>
    </div>
  )
}
