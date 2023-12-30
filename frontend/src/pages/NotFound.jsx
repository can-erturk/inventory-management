import NotFoundSvg from '@/assets/NotFoundSvg'
import { Link } from 'react-router-dom'

// This component is from:
// https://tailwindcomponents.com/component/tailwind-css-404-page-not-found-with-illustration

function NotFound() {
  return (
    <div className="w-full flex-grow flex flex-col items-center justify-center">
      <NotFoundSvg />

      <div className="flex flex-col items-center justify-center">
        <p className="text-3xl md:text-4xl lg:text-5xl text-gray-800 mt-12">
          Page Not Found
        </p>
        <p className="md:text-lg lg:text-xl text-gray-600 mt-8 text-center">
          Sorry, the page you are looking for could not be found.
        </p>
        <Link
          className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-12 rounded transition duration-150"
          to="/"
        >
          Return Home
        </Link>
      </div>
    </div>
  )
}

export default NotFound
