import './styles.scss'

import clsx from 'clsx'
import { useState } from 'react'

const CustomTabsList = ({ tabs, activeTab, onTabChange }) => {
  return (
    <div className='custom-tabs__list-wrapper'>
      <div className='custom-tabs__list'>
        {tabs.map(tab => (
          <button
            key={tab.value}
            type='button'
            className={clsx('custom-tabs__trigger', {
              'custom-tabs__trigger--active': activeTab === tab.value
            })}
            onClick={() => onTabChange(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}

const CustomTabs = ({ tabs, defaultValue, className = '' }) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.value)

  return (
    <div className={clsx('custom-tabs', className)}>
      <CustomTabsList
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      <div className='custom-tabs__content'>
        {tabs.map(tab => (
          <div
            key={tab.value}
            className={clsx('custom-tabs__panel', {
              'custom-tabs__panel--active': activeTab === tab.value
            })}
          >
            {tab.children}
          </div>
        ))}
      </div>
    </div>
  )
}

export default CustomTabs
