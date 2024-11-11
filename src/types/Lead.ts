export type Lead = {
  id: number;
  first_name: string | null;
  last_name: string | null;
  email_address: string;
  referral_code: string;
  phone: string | null;
  timezone: string;
  score: number;
  tag_list: string[];
  video_progress: Record<string, any>;
  name: string;
  confirmed: boolean;
  potential_value: {
    cents: number;
    currency_iso: string;
  };
  account: {
    id: number;
    domain: string;
    plan: string;
    default_currency: string;
  };
  stage: {
    id: number;
    name: string;
  };
  login_token: string;
};
