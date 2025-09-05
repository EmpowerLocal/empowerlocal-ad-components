// Type definitions for EmpowerLocal Ad component

export interface EmpowerLocalResponse {
  status: string;
  placements?: {
    placement_1: {
      eligible_url: string;
      viewable_url: string;
      body: string;
    };
  };
  message?: any;
}

export interface EmpowerLocalAdProps {
  zoneId: string;
  keyword?: string;
  className?: string;
}

declare global {
  interface Window {
    EmpowerLocalAd: any;
  }
}
