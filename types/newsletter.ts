export interface ToneOption {
  id: number;
  description: string;
}

export interface NewsletterWebhookResponse {
  id: number;
  ton: number;
  image: boolean;
  n_lignes: number;
  list_ton: ToneOption[];
  keywords?: string;
  verification?: string;
}

export interface NewsletterVariables {
  selectedToneId: number;
  maxLines: number;
  includeImage: boolean;
  keywords: string;
  verification: string;
}