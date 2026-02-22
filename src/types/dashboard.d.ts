declare namespace StreamKit {
	type DashboardLogItemBase = {
		id: string;
		timestamp: number;
		/** Username */
		who: string;
		/** Avatar URL (if exist) */
		avatar?: string;
		/** User ID (If exist) */
		whoID?: string;
		platform: StreamKit.IntegrationID;
		/** How many seconds added to timer */
		timerAdd?: number;
		effects?: StreamKit.ScreenEffect[];
		/** Action icon URL */
		icon?: string;
		emotes?: { id: string; start: number; end: number }[];
		media?: (
			| {
					type: "audio";
					url: string;
					name?: string;
			  }
			| {
					type: "sound";
					id: string;
					name: string;
			  }
			| {
					type: "game";
					id: string;
			  }
			| {
					type: "boosty";
					level: string;
					period?: number;
			  }
			| {
					type: "boostygift";
					level: string;
					period?: number;
			  }
			| {
					type: "memealert";
			  }
			| {
					type: "twitchclip";
					url: string;
			  }
			| {
					type: "youtube" | StreamKit.MusicItemType;
					url: string;
					title: string;
			  }
		)[];
	};

	type DashboardLogItemDonate = {
		type: "donate";
		amount: number;
		currency: import("../currency").CurrencyName;
		message: string;
		commission_covered?: boolean;
	} & DashboardLogItemBase;

	type DashboardLogItemBalance = {
		type: "balance";
		amount: number;
		currency: import("../currency").CurrencyName;
	} & DashboardLogItemBase;

	type DashboardLogItemSub = {
		type: "sub";
		month?: number;
		plan: string;
		message?: string;
	} & DashboardLogItemBase;

	type DashboardLogItemFollow = {
		type: "follow";
	} & DashboardLogItemBase;

	type DashboardLogItemSubGift = {
		type: "subgift";
		to: string;
		plan: string;
		message?: string;
	} & DashboardLogItemBase;

	type DashboardLogItemRedeem = {
		type: "redeem";
		title: string;
		amount: number;
		message?: string;
	} & DashboardLogItemBase;

	type DashboardLogItemRaid = {
		type: "raid";
		viewers: number;
	} & DashboardLogItemBase;

	type DashboardLogItemTimerManual = {
		type: "timer";
		/** How many seconds added to timer */
		timerAdd: number;
	} & Pick<
		DashboardLogItemBase,
		Exclude<keyof DashboardLogItemBase, "platform" | "who">
	>;

	type DashboardLogItem =
		| DashboardLogItemTimerManual
		| DashboardLogItemDonate
		| DashboardLogItemBalance
		| DashboardLogItemFollow
		| DashboardLogItemSub
		| DashboardLogItemSubGift
		| DashboardLogItemRaid
		| DashboardLogItemRedeem;
}


