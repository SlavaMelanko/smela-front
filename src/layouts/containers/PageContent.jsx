const PageContent = ({ children, className }) => (
  <div className={`flex flex-col w-full gap-12 ${className}`}>{children}</div>
)

export default PageContent
