export type ConfirmLead = {
  lead: {
    confirmation_token: string;
    frontend_token?: string;
  };
};

export type ConfirmLeadResponse = {
  id: number;
  login_token: string;
  referral_code: string;
};
