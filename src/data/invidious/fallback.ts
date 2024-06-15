import type { InvidiousApiData } from './types'

// import invidiousFallbackJson from './fallback.json'


export const invidiousListFallback: Array<InvidiousApiData> = [
    [
        "invidious.fdn.fr",
        {
            "flag": "🇫🇷",
            "region": "FR",
            "stats": {
                "version": "2.0",
                "software": {
                    "name": "invidious",
                    "version": "2024.06.05-9248b3c1",
                    "branch": "master"
                },
                "openRegistrations": true,
                "usage": {
                    "users": {
                        "total": 37186,
                        "activeHalfyear": 6446,
                        "activeMonth": 951
                    }
                },
                "metadata": {
                    "updatedAt": 1718457101,
                    "lastChannelRefreshedAt": 1718456817
                },
                "playback": {
                    "totalRequests": 22494,
                    "successfulRequests": 16763,
                    "ratio": 0.75
                }
            },
            "cors": true,
            "api": true,
            "type": "https",
            "uri": "https://invidious.fdn.fr",
            "monitor": {
                "token": "so3l",
                "url": "https://invidious.fdn.fr",
                "alias": "invidious.fdn.fr",
                "last_status": 200,
                "uptime": 99.978,
                "down": false,
                "down_since": null,
                "up_since": "2024-06-14T22:33:05Z",
                "error": null,
                "period": 300,
                "apdex_t": 1,
                "string_match": "An alternative front-end to YouTube",
                "enabled": true,
                "published": true,
                "disabled_locations": [],
                "recipients": [],
                "last_check_at": "2024-06-15T13:15:12Z",
                "next_check_at": "2024-06-15T13:20:10Z",
                "created_at": "2024-04-21T20:49:56Z",
                "mute_until": "forever",
                "favicon_url": "https://invidious.fdn.fr/favicon-16x16.png?v=e0ce59d3",
                "custom_headers": {},
                "http_verb": "GET/HEAD",
                "http_body": "",
                "ssl": {
                    "tested_at": "2024-06-15T12:45:26Z",
                    "expires_at": "2024-09-09T07:25:41Z",
                    "valid": true,
                    "error": null
                }
            }
        }
    ],
]
