import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://hudgzlaiymavgmnfnoxy.supabase.co";

const supabaseKey = "sb_publishable_jIhASQKf3SX_SdADqP6DCQ_lcYRkYMu";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);