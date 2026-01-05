const Container = ({ children, 'data-testid': testId }) => (
  <div className='flex flex-col items-center gap-8' data-testid={testId}>
    {children}
  </div>
)

export default Container
