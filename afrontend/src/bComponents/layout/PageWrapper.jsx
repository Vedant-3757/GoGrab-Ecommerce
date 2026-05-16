function PageWrapper({ children }) {
  return (
    <div className="w-full min-h-[calc(100vh-72px)] bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {children}
      </div>
    </div>
  );
}

export default PageWrapper;