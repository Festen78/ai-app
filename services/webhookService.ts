import { NewsletterVariables, NewsletterWebhookResponse, ToneOption } from '@/types/newsletter';

const FETCH_WEBHOOK_URL = 'https://n8n.festen78.site/webhook-test/ccdf707d-2c79-4fce-9826-a0834840e5db';
const SAVE_WEBHOOK_URL = 'https://n8n.festen78.site/webhook-test/5e6c246a-7e88-4d4c-a517-6a4a79bcc0a8';
const TEST_WEBHOOK_URL = 'https://n8n.festen78.site/webhook-test/b9b8cd44-b2db-45d9-8716-a39c583f44b2';
const COMMENT_WEBHOOK_URL = 'https://n8n.festen78.site/webhook-test/f0f35526-0a02-4046-84fb-bed72b1a67b4';

export async function fetchNewsletterVariables(): Promise<{
  variables: NewsletterVariables;
  toneOptions: ToneOption[];
}> {
  try {
    const response = await fetch(FETCH_WEBHOOK_URL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: NewsletterWebhookResponse[] = await response.json();
    if (!data || !data[0]) {
      throw new Error('Invalid response format');
    }

    const webhookData = data[0]; 

    return {
      variables: {
        selectedToneId: webhookData.ton ?? -1,
        maxLines: webhookData.n_lignes ?? 10,
        includeImage: webhookData.image ?? true,
        keywords: webhookData.keywords || '',
        verification: webhookData.verification || '',
      },
      toneOptions: webhookData.list_ton || [],
    };
  } catch (error) {
    console.error('Error fetching newsletter variables:', error);
    throw new Error('Failed to fetch newsletter variables');
  }
}

export async function updateNewsletterVariables(variables: NewsletterVariables): Promise<boolean> {
  try {
    const response = await fetch(SAVE_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({
        ton: variables.selectedToneId,
        n_lignes: variables.maxLines,
        image: variables.includeImage,
        keywords: variables.keywords,
        verification: variables.verification,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return true;
  } catch (error) {
    console.error('Error updating newsletter variables:', error);
    throw new Error('Failed to update newsletter variables');
  }
}

function processResponseContent(data: any): string {
  let text = '';
  let image: string | undefined;

  if (Array.isArray(data)) {
    const firstItem = data[0];
    text = firstItem?.response?.body?.post || 
           firstItem?.post || 
           firstItem?.verification || 
           firstItem?.response?.verification || 
           firstItem?.body || '';
    
    image = firstItem?.response?.body?.image ||
            firstItem?.image ||
            firstItem?.response?.image;
    
  } else if (typeof data === 'object' && data !== null) {
    text = data.post ||
           data.verification ||
           data.response?.body?.post ||
           data.response?.verification ||
           data.body || '';
    
    image = data.image ||
            data.response?.body?.image ||
            data.response?.image;
  }

  // Remove any existing image markdown from the text
  text = text.replace(/!\[.*?\]\(.*?\)/g, '').trim();

  // If we have an image (either URL or base64), append it to the text
  if (image && image !== 'false') {
    text = text + '\n\n![Generated Image](' + image + ')';
  }

  return text;
}

export async function testKeywords(keywords: string): Promise<string> {
  try {
    const response = await fetch(TEST_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ keywords }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const text = processResponseContent(data);
    
    if (!text) {
      throw new Error('Invalid response format');
    }

    return text;
  } catch (error) {
    console.error('Error testing keywords:', error);
    throw error;
  }
}

export async function sendComment(comment: string, verification: string, variables: NewsletterVariables): Promise<string> {
  try {
    // Extract text content without base64 image data
    const textContent = verification.replace(/!\[.*?\]\(data:image\/[^)]+\)/g, '').trim();

    const response = await fetch(COMMENT_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify({ 
        comment,
        verification: textContent,
        ton: variables.selectedToneId,
        n_lignes: variables.maxLines,
        image: variables.includeImage,
        keywords: variables.keywords
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    const text = processResponseContent(data);
    
    if (!text) {
      throw new Error('Invalid response format');
    }

    return text;
  } catch (error) {
    console.error('Error sending comment:', error);
    throw new Error('Failed to send comment');
  }
}