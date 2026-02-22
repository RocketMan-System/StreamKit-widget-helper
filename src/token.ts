const query = new Map(location.search.replace('?', '').split('&').map(q => q.split('=')) as any)
/** Token for StreamKit API */
export const API_TOKEN = query.get('token') as string
if(!API_TOKEN) {
    throw new Error("No API token found")
}

/** Widget page ID (for widget only) */
export const PAGE_ID = query.get('pageId') as string