import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import { authApi } from '../../api/auth';
import Button from '../../components/common/Button';

export default function Register() {
  const { verifyRegisterOtp } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [step, setStep] = useState('details');
  const [form, setForm] = useState({ name: '', email: '', password: '', password_confirmation: '', otp: '' });
  const [errors, setErrors] = useState({});
  const [showOtp, setShowOtp] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleDetails = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      const res = await authApi.register({
        name: form.name,
        email: form.email,
        password: form.password,
        password_confirmation: form.password_confirmation
      });
      setShowOtp(res.data.data.otp);
      showToast('OTP generated!', 'success');
      setStep('otp');
    } catch (err) {
      setErrors(err.errors || {});
      showToast(err.message || 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleOtp = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      await verifyRegisterOtp(form.email, form.otp);
      showToast('Email verified! Account created successfully.', 'success');
      navigate('/login', { replace: true });
    } catch (err) {
      setErrors(err.errors || {});
      showToast(err.message || 'Invalid OTP', 'error');
    } finally {
      setLoading(false);
    }
  };

  const EyeIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
    </svg>
  );

  const EyeOffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
    </svg>
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">

        {step === 'details' ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Create your account</h1>
            <p className="mt-1 text-sm text-gray-500">Browse, copy and customize 500+ UI snippets for free.</p>

            <form onSubmit={handleDetails} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
                <input type="text" required autoComplete="name" value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Jane Doe" />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name[0]}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input type="email" required autoComplete="email" value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="you@example.com" />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email[0]}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} required minLength={8}
                    autoComplete="new-password" value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                    placeholder="At least 8 characters" />
                  <button type="button" tabIndex={-1}
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password[0]}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
                <input type="password" required autoComplete="new-password" value={form.password_confirmation}
                  onChange={(e) => setForm({ ...form, password_confirmation: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="Re-enter your password" />
              </div>

              <Button type="submit" loading={loading} className="w-full">Create Account</Button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Verify your account</h1>
            <p className="mt-1 text-sm text-gray-500">
              Use the OTP below to activate your account.
            </p>

            {showOtp && (
              <div className="mt-4 rounded-lg bg-yellow-50 border border-yellow-200 p-4 text-center dark:bg-yellow-900/20">
                <p className="text-xs text-yellow-700 dark:text-yellow-400 mb-1">Your OTP code</p>
                <p className="text-3xl font-bold tracking-widest text-yellow-800 dark:text-yellow-300">
                  {showOtp}
                </p>
                <p className="text-xs text-yellow-600 mt-1">Expires in 10 minutes</p>
              </div>
            )}

            <form onSubmit={handleOtp} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">OTP Code</label>
                <input type="text" inputMode="numeric" maxLength={6} required value={form.otp}
                  onChange={(e) => setForm({ ...form, otp: e.target.value.replace(/\D/g, '') })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-xl tracking-widest dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="000000" />
                {errors.otp && <p className="mt-1 text-xs text-red-500">{errors.otp[0]}</p>}
              </div>

              <Button type="submit" loading={loading} className="w-full">Verify & Activate</Button>
              <button type="button" onClick={() => setStep('details')}
                className="w-full text-center text-sm text-gray-400 hover:text-gray-600">
                ← Back
              </button>
            </form>
          </>
        )}

        <p className="mt-5 text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-brand-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}