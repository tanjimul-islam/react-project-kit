import { Home, Info } from "lucide-react";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-gray-900">
            React Project Kit
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Home size={20} />
              <span>Home</span>
            </Link>
            <Link
              to="/about"
              className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Info size={20} />
              <span>About</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
