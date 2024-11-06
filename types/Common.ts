export type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  current_step: number;
  referral_code: string;
  login_token: string;
};

export type Video = {
  id: number;
  mux_asset_id: string;
  mux_playback_id: string;
  title: string;
  description: string | null;
  tag_list: string[];
};
