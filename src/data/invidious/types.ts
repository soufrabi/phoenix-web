
export type InvidiousApiData = [
    string,
    {
        flag: string,
        region: string,
        stats: {
            version: string,
            software: {
                name: string,
                version: string,
                branch: string,
            },
            openRegistrations: boolean,
            usage: {
                users: {
                    total: number,
                    activeHalfyear: number,
                    activeMonth: number,
                }
            },
            metadata: {
                updatedAt: number,
                lastChannelRefreshedAt: number,
            },
            playback: {
                totalRequests: number,
                successfulRequests: number,
                ratio: number,
            } | {},
        } | null,
        cors: boolean | null,
        api: boolean | null,
        type: string,
        uri: string,
        monitor: {
            token: string,
            url: string,
            alias: string,
            last_status: number | null,
            uptime: number,
            down: boolean,
            down_since: string | null,
            up_since: string | null,
            error: string | null,
            period: number,
            apdex_t: number,
            string_match: string,

            enabled: boolean,
            published: boolean,
            disabled_locations: [],
            recipients: Array<string>,
            last_check_at: string,
            next_check_at: string,
            created_at: string,
            mute_until: string | null,
            favicon_url: string,
            custom_headers: {},
            http_verb: string,
            http_body: string,
            ssl: {
                tested_at: string,
                expires_at: string,
                valid: boolean,
                error: string | null,
            }
        } | null,
    }
]
