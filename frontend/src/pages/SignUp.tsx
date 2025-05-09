
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import type { SignUpForm } from '../types/user.interface';



function SignUp() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpForm>();

  const onSubmit = async (data: SignUpForm) => {
    try {
      const response = await axios.post('/users/register', data);
      console.log('Registration successful:', response.data);
      alert('User registered successfully!');
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Failed to register user.');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4 w-50 mx-auto">
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            {...register('email', { required: 'Email is required' })}
          />
          {errors.email && <span className="text-danger">{errors.email.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input
            type="text"
            className="form-control"
            {...register('fullName', { required: 'Full name is required' })}
          />
          {errors.fullName && <span className="text-danger">{errors.fullName.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Address</label>
          <input
            type="text"
            className="form-control"
            {...register('address', { required: 'Address is required' })}
          />
          {errors.address && <span className="text-danger">{errors.address.message}</span>}
        </div>

        <div className="mb-3">
          <label className="form-label">Car Plate</label>
          <input
            type="text"
            className="form-control"
            {...register('carPlate', { required: 'Car plate is required' })}
          />
          {errors.carPlate && <span className="text-danger">{errors.carPlate.message}</span>}
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Register
        </button>
      </form>
    </div>
  );
}

export default SignUp;
