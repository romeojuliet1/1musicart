
import { useState } from 'react'
import { supabase } from '@/lib/supabase'

export const useFileUpload = () => {
  const [uploading, setUploading] = useState(false)

  const uploadCoverImage = async (file: File, artistId: string) => {
    try {
      setUploading(true)

      const fileExt = file.name.split('.').pop()
      const fileName = `${artistId}_${Math.random()}.${fileExt}`
      const filePath = `covers/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('campaign-covers')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage
        .from('campaign-covers')
        .getPublicUrl(filePath)

      return { url: data.publicUrl, error: null }
    } catch (error) {
      return { url: null, error }
    } finally {
      setUploading(false)
    }
  }

  return { uploadCoverImage, uploading }
}
