const CenteredPage = ({ children }) => (
  <div className='relative flex flex-col items-center justify-center min-h-screen overflow-y-auto p-4 py-8 md:p-8 bg-background'>
    {children}
  </div>
)

export default CenteredPage
