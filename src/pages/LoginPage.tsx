import loadable from '@loadable/component';
import { Button } from '../components/ui/button';
import { Link } from 'react-router-dom';
const Login = loadable(() => import('../components/form/LoginForm'));

export default function LoginPage() {
  return (
    <div className=''>
      
      <section className="flex justify-center items-center h-screen">
        <div className="max-w-lg w-full p-7 border border-border shadow-md rounded-md">
          <h1 className="mb-6 text-3xl text-primary text-center tracking-tight font-bold">
            <img className='ml-44' src="./src/assets/ogb-logo.svg" alt="" />
            <h2 className='text-black mt-3'>Hello! let's get started</h2>
            <span className='text-[#000000B2]'>Sing in to Continue</span>
          </h1>
          <Login />
          <div className='flex gap-2 justify-center items-center mt-2 mr-2'>
            <span className='text-[#000000B2] text-base font-medium'>Complete the registration form to join</span>
            <Link to="/register" ><Button>Register Here</Button></Link>
        
      </div>
        </div>
      </section>
    </div>
  );
}