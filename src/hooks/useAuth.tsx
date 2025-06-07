
import { useState, useEffect, createContext, useContext } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string, userData: any) => Promise<{ data: any; error: any }>
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('🔍 AuthProvider: شروع بررسی وضعیت احراز هویت')
    
    // بررسی وضعیت احراز هویت
    const getSession = async () => {
      try {
        console.log('🔍 AuthProvider: درخواست session از Supabase')
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('❌ خطا در دریافت session:', error)
        } else {
          console.log('✅ Session دریافت شد:', session ? 'موجود' : 'موجود نیست')
        }
        
        setUser(session?.user ?? null)
        setLoading(false)
      } catch (error) {
        console.error('❌ خطای غیرمنتظره در getSession:', error)
        setLoading(false)
      }
    }

    getSession()

    // گوش دادن به تغییرات احراز هویت
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 تغییر وضعیت احراز هویت:', event, session ? 'کاربر وارد شده' : 'کاربر خارج شده')
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, userData: any) => {
    try {
      console.log('🚀 شروع فرآیند ثبت‌نام برای:', email)
      console.log('📝 اطلاعات کاربر:', userData)
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })

      if (error) {
        console.error('❌ خطا در ثبت‌نام Supabase Auth:', error)
        throw error
      }

      console.log('✅ ثبت‌نام در Supabase Auth موفق:', data.user?.id)

      // اگر ثبت‌نام موفق بود، اطلاعات هنرمند رو ذخیره کن
      if (data.user) {
        console.log('📝 شروع ذخیره اطلاعات هنرمند در جدول artists')
        
        const artistData = {
          id: data.user.id,
          email: userData.email,
          full_name: userData.fullName,
          artist_name: userData.artistName || null,
        }
        
        console.log('📝 داده‌های هنرمند برای ذخیره:', artistData)

        const { error: artistError } = await supabase
          .from('artists')
          .insert(artistData)

        if (artistError) {
          console.error('❌ خطا در ذخیره اطلاعات هنرمند:', artistError)
        } else {
          console.log('✅ اطلاعات هنرمند با موفقیت ذخیره شد')
        }
      }

      return { data, error: null }
    } catch (error) {
      console.error('❌ خطای کلی در signUp:', error)
      return { data: null, error }
    }
  }

  const signIn = async (email: string, password: string) => {
    console.log('🔑 تلاش برای ورود:', email)
    const result = await supabase.auth.signInWithPassword({ email, password })
    console.log('🔑 نتیجه ورود:', result.error ? 'ناموفق' : 'موفق')
    return result
  }

  const signOut = async () => {
    console.log('🚪 خروج از حساب کاربری')
    await supabase.auth.signOut()
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
