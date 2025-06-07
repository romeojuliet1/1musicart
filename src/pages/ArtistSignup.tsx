import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Upload, Music, DollarSign, Clock, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/hooks/useAuth';
import { useFileUpload } from '@/hooks/useFileUpload';
import { supabase } from '@/lib/supabase';

const artistSignupSchema = z.object({
  fullName: z.string().min(2, 'نام کامل باید حداقل ۲ کاراکتر باشد'),
  artistName: z.string().optional(),
  email: z.string().email('آدرس ایمیل معتبر وارد کنید'),
  password: z.string().min(6, 'رمز عبور باید حداقل ۶ کاراکتر باشد'),
  projectTitle: z.string().min(3, 'عنوان پروژه باید حداقل ۳ کاراکتر باشد'),
  projectDescription: z.string().min(20, 'توضیح پروژه باید حداقل ۲۰ کاراکتر باشد'),
  targetAmount: z.number().min(100000, 'مبلغ هدف باید حداقل ۱۰۰,۰۰۰ تومان باشد'),
  currency: z.enum(['toman', 'euro']),
  deadline: z.string().min(1, 'تاریخ پایان را انتخاب کنید'),
  projectType: z.enum(['album', 'single', 'ep', 'music_video']),
});

type ArtistSignupForm = z.infer<typeof artistSignupSchema>;

const ArtistSignup = () => {
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const { uploadCoverImage, uploading } = useFileUpload();

  const form = useForm<ArtistSignupForm>({
    resolver: zodResolver(artistSignupSchema),
    defaultValues: {
      fullName: '',
      artistName: '',
      email: '',
      password: '',
      projectTitle: '',
      projectDescription: '',
      targetAmount: 0,
      currency: 'toman',
      deadline: '',
      projectType: 'album',
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('حجم فایل نباید بیشتر از ۵ مگابایت باشد');
        return;
      }
      
      setCoverImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      console.log('📷 تصویر کاور انتخاب شد:', file.name, 'اندازه:', file.size);
    }
  };

  const onSubmit = async (data: ArtistSignupForm) => {
    try {
      setIsSubmitting(true);
      console.log('🎯 شروع فرآیند ثبت‌نام کامل...', data);

      // بررسی اتصال به Supabase
      console.log('🔗 بررسی اتصال به Supabase...');
      const { data: testConnection, error: connectionError } = await supabase
        .from('artists')
        .select('count', { count: 'exact', head: true });
      
      if (connectionError) {
        console.error('❌ خطا در اتصال به Supabase:', connectionError);
        toast.error('خطا در اتصال به پایگاه داده');
        return;
      } else {
        console.log('✅ اتصال به Supabase موفق');
      }

      // ثبت‌نام کاربر
      console.log('👤 شروع ثبت‌نام کاربر...');
      const { data: authData, error: authError } = await signUp(data.email, data.password, {
        fullName: data.fullName,
        artistName: data.artistName,
        email: data.email
      });

      if (authError) {
        console.error('❌ خطا در ثبت‌نام:', authError);
        toast.error(`خطا در ثبت‌نام: ${authError.message}`);
        return;
      }

      if (!authData.user) {
        console.error('❌ کاربر ایجاد نشد');
        toast.error('خطا در ایجاد حساب کاربری');
        return;
      }

      console.log('✅ کاربر با موفقیت ایجاد شد:', authData.user.id);

      let coverImageUrl = null;

      // آپلود تصویر کاور اگر انتخاب شده
      if (coverImage) {
        console.log('📷 شروع آپلود تصویر کاور...');
        const { url, error: uploadError } = await uploadCoverImage(coverImage, authData.user.id);
        if (uploadError) {
          console.error('❌ خطا در آپلود تصویر:', uploadError);
          toast.error('خطا در آپلود تصویر کاور');
        } else {
          coverImageUrl = url;
          console.log('✅ تصویر کاور آپلود شد:', coverImageUrl);
        }
      }

      // ایجاد کمپین
      console.log('🎬 شروع ایجاد کمپین...');
      const campaignData = {
        artist_id: authData.user.id,
        title: data.projectTitle,
        description: data.projectDescription,
        target_amount: data.targetAmount,
        currency: data.currency,
        deadline: data.deadline,
        project_type: data.projectType,
        cover_image_url: coverImageUrl,
        status: 'pending' as const,
        current_amount: 0
      };
      
      console.log('📝 داده‌های کمپین:', campaignData);

      const { error: campaignError } = await supabase
        .from('campaigns')
        .insert(campaignData);

      if (campaignError) {
        console.error('❌ خطا در ایجاد کمپین:', campaignError);
        toast.error(`خطا در ایجاد کمپین: ${campaignError.message}`);
        return;
      }

      console.log('✅ کمپین با موفقیت ایجاد شد');
      toast.success('ثبت‌نام با موفقیت انجام شد! کمپین شما برای بررسی ارسال شده است.');
      
      // هدایت به داشبورد
      setTimeout(() => {
        console.log('🔄 هدایت به داشبورد...');
        navigate('/dashboard');
      }, 2000);

    } catch (error) {
      console.error('❌ خطای غیرمنتظره:', error);
      toast.error('خطای غیرمنتظره رخ داد');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-12 px-6 md:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-vazir">
            ثبت‌نام هنرمند
          </h1>
          <p className="text-xl text-gray-300 mb-8 font-vazir">
            پروژه موسیقی خود را ایجاد کنید و از حمایت‌کنندگان کمک بگیرید
          </p>
          <div className="flex items-center justify-center gap-2 text-psyco-green-DEFAULT">
            <Music className="w-6 h-6" />
            <span className="font-vazir">شروع سفر هنری شما</span>
          </div>
        </div>

        {/* Form */}
        <div className="glassmorphism p-8 md:p-12 rounded-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {/* اطلاعات شخصی */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-vazir">
                  <span className="w-8 h-8 bg-psyco-green-DEFAULT rounded-full flex items-center justify-center text-white font-bold">۱</span>
                  اطلاعات شخصی
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-vazir">نام کامل *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="نام و نام خانوادگی خود را وارد کنید"
                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 font-vazir"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="artistName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-vazir">نام هنری (اختیاری)</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="نام هنری که با آن شناخته می‌شوید"
                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 font-vazir"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-vazir">ایمیل *</FormLabel>
                        <FormControl>
                          <Input 
                            type="email"
                            placeholder="your.email@example.com"
                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                            style={{ direction: 'ltr' }}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-vazir">رمز عبور *</FormLabel>
                        <FormControl>
                          <Input 
                            type="password"
                            placeholder="حداقل ۶ کاراکتر"
                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 font-vazir"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* اطلاعات پروژه */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-vazir">
                  <span className="w-8 h-8 bg-psyco-purple-DEFAULT rounded-full flex items-center justify-center text-white font-bold">۲</span>
                  اطلاعات پروژه
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="projectTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-vazir">عنوان پروژه *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="نام آلبوم، تک‌آهنگ یا پروژه خود"
                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 font-vazir"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="projectType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-vazir">نوع پروژه *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white font-vazir">
                              <SelectValue placeholder="نوع پروژه را انتخاب کنید" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="album" className="text-white font-vazir">آلبوم</SelectItem>
                            <SelectItem value="single" className="text-white font-vazir">تک‌آهنگ</SelectItem>
                            <SelectItem value="ep" className="text-white font-vazir">EP</SelectItem>
                            <SelectItem value="music_video" className="text-white font-vazir">موزیک ویدیو</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="projectDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white font-vazir">توضیح پروژه *</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="درباره پروژه خود، ژانر موسیقی، الهام و هدف‌تان بنویسید..."
                          className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400 font-vazir min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* هدف مالی و زمان‌بندی */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-vazir">
                  <span className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold">۳</span>
                  هدف مالی و زمان‌بندی
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="targetAmount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-vazir flex items-center gap-2">
                          <DollarSign className="w-4 h-4" />
                          مبلغ هدف *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="number"
                            placeholder="100000"
                            className="bg-gray-800/50 border-gray-600 text-white placeholder-gray-400"
                            {...field}
                            onChange={(e) => field.onChange(Number(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-vazir">واحد پول *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-800/50 border-gray-600 text-white font-vazir">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-gray-800 border-gray-600">
                            <SelectItem value="toman" className="text-white font-vazir">تومان</SelectItem>
                            <SelectItem value="euro" className="text-white font-vazir">یورو</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-white font-vazir flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          تاریخ پایان *
                        </FormLabel>
                        <FormControl>
                          <Input 
                            type="date"
                            className="bg-gray-800/50 border-gray-600 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* آپلود تصویر کاور */}
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-2 font-vazir">
                  <span className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">۴</span>
                  تصویر کاور پروژه
                </h2>

                <div className="flex flex-col items-center space-y-4">
                  {previewUrl ? (
                    <div className="relative">
                      <img 
                        src={previewUrl} 
                        alt="پیش‌نمایش کاور" 
                        className="w-64 h-64 object-cover rounded-xl shadow-lg"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setCoverImage(null);
                          setPreviewUrl('');
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition-colors"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <div className="w-64 h-64 border-2 border-dashed border-gray-600 rounded-xl flex flex-col items-center justify-center space-y-4 hover:border-psyco-green-DEFAULT transition-colors">
                      <Upload className="w-12 h-12 text-gray-400" />
                      <p className="text-gray-400 text-center font-vazir">
                        تصویر کاور پروژه<br />
                        (حداکثر ۵ مگابایت)
                      </p>
                    </div>
                  )}
                  
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="cover-upload"
                  />
                  
                  <label
                    htmlFor="cover-upload"
                    className="bg-psyco-green-DEFAULT hover:bg-psyco-green-dark text-white px-6 py-3 rounded-lg cursor-pointer transition-colors font-vazir"
                  >
                    انتخاب تصویر
                  </label>
                </div>
              </div>

              {/* دکمه‌های عملیات */}
              <div className="flex flex-col md:flex-row gap-4 pt-8">
                <Button
                  type="submit"
                  disabled={isSubmitting || uploading}
                  className="flex-1 bg-gradient-to-r from-psyco-green-DEFAULT to-psyco-green-dark hover:from-psyco-green-dark hover:to-psyco-green-DEFAULT text-white py-4 text-lg font-bold rounded-xl transition-all duration-300 transform hover:scale-105 font-vazir"
                >
                  {isSubmitting || uploading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin ml-2" />
                      {uploading ? 'در حال آپلود...' : 'در حال ایجاد کمپین...'}
                    </>
                  ) : (
                    'ایجاد کمپین'
                  )}
                </Button>
                
                <Link
                  to="/"
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-4 text-lg font-bold rounded-xl text-center transition-colors font-vazir"
                >
                  بازگشت به صفحه اصلی
                </Link>
              </div>
            </form>
          </Form>
        </div>

        {/* راهنمای کوتاه */}
        <div className="mt-12 glassmorphism p-6 rounded-xl">
          <h3 className="text-xl font-bold text-white mb-4 font-vazir">نکات مهم:</h3>
          <ul className="space-y-2 text-gray-300 font-vazir">
            <li>• پس از ثبت‌نام، کمپین شما برای بررسی ارسال می‌شود</li>
            <li>• تصویر کاور باکیفیت انتخاب کنید تا توجه بیشتری جلب کند</li>
            <li>• توضیح کاملی از پروژه خود ارائه دهید</li>
            <li>• هدف مالی واقع‌بینانه تعیین کنید</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ArtistSignup;
