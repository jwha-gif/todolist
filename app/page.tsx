export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-8">
            TodoList
          </h1>
          
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              할 일 관리 앱에 오신 것을 환영합니다!
            </p>
            
            <div className="space-y-2">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Next.js 14 + TypeScript로 구축됨
                </p>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Tailwind CSS로 스타일링됨
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
