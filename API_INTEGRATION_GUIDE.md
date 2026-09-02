# Frontend API Integration Guide

هذا الملف هو المرجع الموحد لفريق الفرونت عند ربط صفحات React مع الـ Backend APIs.
الهدف أن كل الفريق يشتغل بنفس الأسلوب، بدون تكرار `axios` داخل الصفحات وبدون اختلاف في طريقة قراءة البيانات أو معالجة الأخطاء.

## الفكرة العامة

أي API في المشروع يجب أن يمر من خلال ثلاث طبقات:

1. `src/services/api.js`
   ملف Axios المركزي: base URL، token، timeout، ومعالجة الأخطاء العامة.

2. `src/services/*.js`
   ملفات الخدمات حسب المجال: auth, user, admin, driver, pickup, rewards.

3. Page أو Component
   الصفحة تستدعي service فقط، ولا تكتب رابط API مباشر داخل JSX.

الشكل الصحيح:

```txt
Page / Component
  -> authService.login(data)
  -> src/services/auth.js
  -> src/services/api.js
  -> Backend
```

الشكل غير المفضل:

```jsx
// لا نكتب هذا داخل الصفحات
axios.post("https://domain.com/api/auth/login", data)
fetch("/api/auth/login")
```

## ملف api.js المعتمد

يفضل أن يكون `src/services/api.js` بهذا الشكل:

```js
import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://recycle-backend-m8st.onrender.com',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const status = error.response?.status
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      'Something went wrong'

    if (status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }

    return Promise.reject({
      status,
      message,
      errors: error.response?.data?.errors,
      original: error,
    })
  }
)

export default api
```

ملاحظة مهمة: عندما نستخدم `response.data` داخل interceptor، كل service سيرجع البيانات مباشرة، وليس كائن Axios كامل.

## ملف البيئة

يجب وضع رابط الباك في `.env`:

```env
VITE_API_URL=https://recycle-backend-m8st.onrender.com
```

وللتطوير المحلي:

```env
VITE_API_URL=http://localhost:8000
```

لا نكتب رابط الباك مباشرة داخل الصفحات.

## شكل ملفات الخدمات

كل ملف service مسؤول عن مجال واحد فقط.

مثال `src/services/auth.js`:

```js
import api from './api'

const authService = {
  login: (credentials) => api.post('/api/auth/login', credentials),

  register: (data) => api.post('/api/auth/register', data),

  forgotPassword: (email) => api.post('/api/auth/forgot-password', { email }),

  resetPassword: (data) => api.post('/api/auth/reset-password', data),

  getProfile: () => api.get('/api/auth/me'),

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  },
}

export default authService
```

مثال `src/services/pickup.js`:

```js
import api from './api'

const pickupService = {
  getMyPickups: (params) => api.get('/api/pickups', { params }),

  getPickup: (id) => api.get(`/api/pickups/${id}`),

  createPickup: (data) => api.post('/api/pickups', data),

  updatePickup: (id, data) => api.put(`/api/pickups/${id}`, data),

  cancelPickup: (id) => api.put(`/api/pickups/${id}/cancel`),
}

export default pickupService
```

## الاستيراد الموحد

استخدموا `src/services/index.js` لتجميع الخدمات:

```js
import authService from './auth'
import userService from './user'
import adminService from './admin'
import driverService from './driver'
import pickupService from './pickup'
import rewardsService from './rewards'

export {
  authService,
  userService,
  adminService,
  driverService,
  pickupService,
  rewardsService,
}
```

داخل الصفحات:

```js
import { authService } from '@/services'
```

## مثال تسجيل الدخول

لا نستخدم `setTimeout` لتسجيل الدخول الحقيقي. الشكل الصحيح:

```jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await authService.login({ email, password })

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      if (data.user?.role === 'admin') {
        navigate('/admin/dashboard')
      } else if (data.user?.role === 'driver') {
        navigate('/driver/dashboard')
      } else {
        navigate('/dashboard')
      }
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-red-500">{error}</p>}

      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        {loading ? 'Loading...' : 'Login'}
      </button>
    </form>
  )
}
```

## مثال تسجيل حساب

```jsx
import { authService } from '@/services'

const handleSubmit = async (e) => {
  e.preventDefault()
  setLoading(true)
  setError('')

  try {
    await authService.register({
      fullName,
      email,
      phone,
      password,
      role,
    })

    navigate('/login')
  } catch (err) {
    setError(err.message || 'Register failed')
  } finally {
    setLoading(false)
  }
}
```

## مثال جلب بيانات داخل صفحة

```jsx
import { useEffect, useState } from 'react'
import { userService } from '@/services'

export default function DashboardPage() {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const data = await userService.getDashboard()
        setDashboard(data)
      } catch (err) {
        setError(err.message || 'Failed to load dashboard')
      } finally {
        setLoading(false)
      }
    }

    loadDashboard()
  }, [])

  if (loading) return <p>Loading...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return <div>{dashboard?.totalPoints}</div>
}
```

## Hook موحد اختياري

إذا أردنا استخدام hook بدل تكرار `useEffect`:

```js
import { useEffect, useState } from 'react'

export default function useFetch(apiFunc, deps = []) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    const loadData = async () => {
      setLoading(true)
      setError('')

      try {
        const result = await apiFunc()

        if (active) {
          setData(result)
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Failed to load data')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadData()

    return () => {
      active = false
    }
  }, deps)

  return { data, loading, error }
}
```

الاستخدام:

```jsx
import useFetch from '@/shared/hooks/useFetch'
import { rewardsService } from '@/services'

const { data, loading, error } = useFetch(rewardsService.getAvailableRewards)
```

## Protected Routes

أي صفحة تحتاج تسجيل دخول يجب ألا تكون مفتوحة مباشرة.

مثال:

```jsx
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({ children, allowedRoles }) {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || 'null')

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />
  }

  return children
}
```

الاستخدام داخل `App.jsx`:

```jsx
<Route
  path="/admin/dashboard"
  element={
    <ProtectedRoute allowedRoles={['admin']}>
      <Dashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/driver/dashboard"
  element={
    <ProtectedRoute allowedRoles={['driver']}>
      <DriverDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/dashboard"
  element={
    <ProtectedRoute allowedRoles={['user']}>
      <DashboardPage />
    </ProtectedRoute>
  }
/>
```

## رفع الصور والملفات

إذا كان endpoint يستقبل صورة أو ملف، لا نرسل JSON.

```js
const formData = new FormData()
formData.append('image', imageFile)
formData.append('type', wasteType)
formData.append('weight', weight)

await pickupService.createPickup(formData)
```

في هذه الحالة يجب عدم تثبيت `Content-Type: application/json` يدوياً لهذا الطلب.
Axios سيحدد `multipart/form-data` تلقائياً عندما تكون البيانات `FormData`.

إذا احتجنا دعم كامل للـ FormData، يمكن تعديل request interceptor:

```js
if (config.data instanceof FormData) {
  delete config.headers['Content-Type']
}
```

## قواعد الفريق

- ممنوع كتابة `axios` أو `fetch` مباشرة داخل الصفحات إلا لسبب خاص ومتفق عليه.
- كل endpoint جديد يجب أن يضاف داخل ملف service مناسب.
- الصفحات تتعامل مع `data`, `loading`, `error`.
- لا نستخدم `setTimeout` لمحاكاة API في صفحة جاهزة للربط الحقيقي.
- لا نخزن كلمات المرور أو بيانات حساسة في `localStorage`.
- نخزن فقط `token` ومعلومات مستخدم بسيطة مثل `id`, `name`, `email`, `role`.
- عند نجاح login، نخزن token ثم نوجه المستخدم حسب الدور.
- عند 401 نحذف الجلسة ونرجع المستخدم لصفحة login.
- أسماء الدوال يجب أن تكون واضحة: `getUsers`, `createPickup`, `updateTaskStatus`.
- لا نكرر نفس endpoint في أكثر من مكان.

## Checklist عند ربط أي صفحة

قبل اعتبار الصفحة مربوطة بالباك، تأكد من التالي:

- هل الدالة موجودة في service؟
- هل الصفحة تستدعي service وليس axios مباشر؟
- هل يوجد loading state؟
- هل يوجد error state؟
- هل يتم عرض رسالة خطأ مفهومة للمستخدم؟
- هل شكل البيانات مطابق لما يرجعه الباك؟
- هل الصفحة تحتاج token؟
- هل route محمي إذا كان يحتاج تسجيل دخول؟
- هل جربنا الطلب في المتصفح أو Network tab؟
- هل لا يزال هناك `setTimeout` وهمي في الصفحة؟

## ملاحظات على المشروع الحالي

الوضع الحالي جيد كبنية أولية، لكن يحتاج هذه التعديلات حتى يصبح الربط فعلياً:

- صفحة `Login.jsx` يجب أن تستخدم `authService.login`.
- صفحة `Register.jsx` يجب أن تستخدم `authService.register`.
- يجب توحيد الخدمات حتى ترجع `data` فقط وليس Axios response كامل.
- يجب تحسين `useFetch.js` ليحتوي `error` و `finally`.
- يجب إضافة Protected Routes للـ user/admin/driver.
- يجب إزالة أو استبدال أي `setTimeout` مخصص لمحاكاة طلب backend.

## الشكل النهائي المطلوب من أي Pull Request

أي PR يربط صفحة مع API يجب أن يوضح:

```txt
Service file changed:
- src/services/example.js

Pages connected:
- src/features/example/pages/ExamplePage.jsx

Tested cases:
- Success response
- Backend validation error
- Unauthorized response if endpoint protected
- Loading state
- Empty state if applicable
```

بهذا الأسلوب سيبقى ربط الـ APIs موحد وواضح لكل أعضاء الفريق.
