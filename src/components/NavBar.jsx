import { useSelector } from 'react-redux';
import { Link } from '@tanstack/react-router';
import { logoutUser } from '../utils/helper';

const Navbar = () => {
  let userData  = useSelector((state) => state.auth);

  return (
    <nav className="bg-white border border-b-black">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-gray-800">
              URL Shortener
            </Link>
          </div>
          
          {/* Right side - Auth buttons */}
         <NavVarProfile userData={userData} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

function NavVarProfile(){
  let userData  = useSelector((state) => state.auth);
  
  const handleLogut = logoutUser()
  return (
    <section className='flex items-center'>
       <div >
            {(userData.isAuthenticated) ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">Welcome, {userData?.user?.user?.name || 'User'}</span>
                <button
                  onClick={handleLogut}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/auth"
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
            )}
          </div>
    </section>
  )
}