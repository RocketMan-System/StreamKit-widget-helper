import axios, { AxiosRequestConfig } from "axios";
import { API_TOKEN } from "./token";

export interface ApiResponse<R = any> {
	status: boolean;
	data?: R;
	error?: string;
}

/**
 * Universal function to make API requests to StreamKit backend.
 * Automatically adds API token for private endpoints and handles errors.
 * @template R - type of the expected response data
 * @param method - HTTP method ('GET' or 'POST')
 * @param path - API endpoint path (e.g. 'user/info' or '/api/user/info')
 * @param params - query parameters for GET or body parameters for POST
 * @returns Promise resolving to the response data of type R
 * @throws Error with message from API or generic error message on failure
 */
export async function ApiRequest<R = any>(
	method: "GET" | "POST",
	path: string,
	params: Record<string, any> = {},
): Promise<R> {
	// Add /api/ if not present and ensure path starts with a single slash
	const url = path.startsWith("/api/")
		? path
		: `/api/${path.replace(/^\/+/, "")}`;

	// Automatically add API token for private endpoints
	if (url.includes("private")) {
		params.token = API_TOKEN;
	}

	const config: AxiosRequestConfig = {
		method,
		url,
		headers: {
			"Content-Type": "application/json",
		},
	};

	if (method === "GET" && params) {
		config.params = params;
	}

	if (method === "POST" && params) {
		config.data = params;
	}

	try {
		const res = await axios.request<ApiResponse<R>>(config);
		const data = res.data;

		if (!data.status) {
			throw new Error(data.error || "Unknown API error");
		}

		return data.data as R;
	} catch (err: any) {
		// axios throws an error object that may contain response data with error message
		if (err.response?.data?.error) {
			throw new Error(err.response.data.error);
		}

		if (err.code === "ECONNABORTED") {
			throw new Error("Request timeout");
		}

		throw err;
	}
}
