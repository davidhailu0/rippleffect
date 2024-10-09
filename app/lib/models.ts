export type Lead = { id: number, name: string, email_address: string, created_at: string }
export type Availablities = { [key:string]: [{start_time:string,end_time:string}] }
export interface TimezoneOption {
    value: string;
    label: string;
}
