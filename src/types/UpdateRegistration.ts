export type UpdateRegistration = {
  lead: {
    email?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    terms_accepted?: boolean;
  };
};
