import { createClient } from "@supabase/supabase-js"

const PROJECT_URL = "https://mnyfguhijmyqgnryzajf.supabase.co"
const PUBLIC_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ueWZndWhpam15cWducnl6YWpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNzM3NTEsImV4cCI6MTk4Mzk0OTc1MX0.rVigPZxkzGjNuj2bC-pc8ZbUZFrSNKEsZgjbx6krwPM"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

export function videoService() {
  return {
    getAllVideos() {
      return supabase.from("video").select("*")
    }
  }
}
