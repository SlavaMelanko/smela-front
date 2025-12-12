import './styles.scss'

import { SecondaryButtonWithIcon } from '@/components/buttons'
import {
  CheckIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@/components/icons'
import useLocale from '@/hooks/useLocale'

import RowsPerPage from './limit'
import RowsPerPageDropdown from './RowsPerPageDropdown'

const Pagination = ({
  page = 1,
  limit = RowsPerPage.SM,
  total = 0,
  totalPages = 1,
  onPageChange,
  onLimitChange
}) => {
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
        <SecondaryButtonWithIcon
          iconLeft={<ChevronLeftIcon size='xs' color='secondary' />}
          onClick={handlePrevPage}
          disabled={!canGoBack}
        />
        <SecondaryButtonWithIcon
          iconLeft={<ChevronRightIcon size='xs' color='secondary' />}
          onClick={handleNextPage}
          disabled={!canGoForward}
        />
      </div>
    </div>
  )
}

export default Pagination
