
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false)

  const uploadCoverImage = async (file: File, artistId: string) => {
    try {
      setUploading(true)
      console.log('📷 شروع آپلود فایل:', file.name, 'برای هنرمند:', artistId)

      const fileExt = file.name.split('.').pop()
      const fileName = `${artistId}_${Math.random()}.${fileExt}`
      const filePath = `covers/${fileName}`

      console.log('📁 مسیر فایل:', filePath)

      const { error: uploadError } = await supabase.storage
        .from('campaign-covers')
        .upload(filePath, file)

      if (uploadError) {
        console.error('❌ خطا در آپلود به Storage:', uploadError)
        throw uploadError
      }

      console.log('✅ فایل آپلود شد، دریافت URL...')

      const { data } = supabase.storage
        .from('campaign-covers')
        .getPublicUrl(filePath)

      console.log('🔗 URL عمومی فایل:', data.publicUrl)

      return { url: data.publicUrl, error: null }
    } catch (error) {
      console.error('❌ خطای کلی در آپلود فایل:', error)
      return { url: null, error }
    } finally {
      setUploading(false)
    }
  }

  return { uploadCoverImage, uploading }
}
