export const SettingsLabel = ({ icon: Icon, children }) => (
  <div className='flex items-center gap-2'>
    <Icon className='size-4 text-muted-foreground' />
    <span className='text-base leading-normal text-muted-foreground'>
      {children}
    </span>
  </div>
)
