import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../components/common/Toast';
import Button from '../../components/common/Button';

export default function Login() {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [step, setStep] = useState('credentials'); // 'credentials' | 'otp'
  const [form, setForm] = useState({ email: '', password: '', otp: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Step 1 — send credentials, receive OTP in email
  const handleCredentials = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      await fetch('/api/v1/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      }).then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw { message: data.message, errors: data.errors };
      });
      showToast('OTP sent to your email!', 'success');
      setStep('otp');
    } catch (err) {
      setErrors(err.errors || {});
      showToast(err.message || 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Step 2 — submit OTP, get JWT and redirect
  const handleOtp = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    try {
      const user = await login(form.email, form.otp); // see AuthContext note below
      showToast(`Welcome back, ${user.name}!`);
      const redirectTo = user.role === 'super_admin'
        ? '/admin/dashboard'
        : (location.state?.from?.pathname || '/app');
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setErrors(err.errors || {});
      showToast(err.message || 'Invalid OTP', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 dark:bg-gray-950">
      <div className="w-full max-w-sm rounded-2xl border border-gray-200 bg-white p-8 shadow-sm dark:border-gray-800 dark:bg-gray-900">

        {step === 'credentials' ? (
          <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Welcome back</h1>
            <p className="mt-1 text-sm text-gray-500">Login to continue learning with CodeBricks.</p>

            <form onSubmit={handleCredentials} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input type="email" required value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="you@example.com" />
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email[0]}</p>}
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input type="password" required value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="••••••••" />
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password[0]}</p>}
              </div>

              <Button type="submit" loading={loading} className="w-full">Continue</Button>
            </form>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Check your email</h1>
            <p className="mt-1 text-sm text-gray-500">
              We sent a 6-digit OTP to <strong>{form.email}</strong>. Enter it below.
            </p>

            <form onSubmit={handleOtp} className="mt-6 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">OTP Code</label>
                <input type="text" inputMode="numeric" maxLength={6} required value={form.otp}
                  onChange={(e) => setForm({ ...form, otp: e.target.value.replace(/\D/g, '') })}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-center text-xl tracking-widest dark:border-gray-700 dark:bg-gray-800 dark:text-gray-100"
                  placeholder="000000" />
                {errors.otp && <p className="mt-1 text-xs text-red-500">{errors.otp[0]}</p>}
              </div>

              <Button type="submit" loading={loading} className="w-full">Verify & Sign In</Button>

              <button type="button" onClick={() => setStep('credentials')}
                className="w-full text-center text-sm text-gray-400 hover:text-gray-600">
                ← Back
              </button>
            </form>
          </>
        )}

        <p className="mt-5 text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-brand-600 hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}