<div align="center">
  <img src="docs/ll-api-v2.png" height="350" alt="Love Live! API v2 Logo">
</div>

<div align="center">

# Love Live! API v2

Yeah, I was bored (once again).

[Playground](http://lovelive-api-v2.vercel.app) • Docs (coming soon!) • Contributing (also coming soon)

</div>

## Overview

This is the v2 rewrite of the old [Love Live! API](https://github.com/repyh3/lovelive-api). To be honest, I'm doing this just for the sake of it. I may not or may not actively maintain this. But, have fun playing with this.

## Endpoints

Base URL: `http://localhost:3000/api`

###  Groups

#### Get All Groups
`GET /groups`
Returns a list of all school idol groups.

#### Get Specific Group
`GET /groups/:slug`
*   `slug`: The URL-friendly name of the group (e.g., `aqours`, `liella`, `muse`).
*   Example: `/api/groups/aqours`

### Idols

#### Get All Idols
`GET /idols`
Returns a flat list of all idols from all groups.
*   Query Params: `?group=slug` (Filter by group)

#### Get Specific Idol (Global Search)
`GET /idols/:slug`
Searches all groups for an idol with the matching slug.
*   `slug`: e.g., `chika-takami`, `kanon-shibuya`
*   Example: `/api/idols/chika-takami`

#### Get Specific Idol (Scoped)
`GET /idols/:group/:slug`
Faster lookup if the group is known.
*   Example: `/api/idols/liella/kanon-shibuya`

### Songs

#### Get Group Songs
`GET /songs?group=:group_slug`
Returns metadata for all songs by a specific group.
*   **Required**: `group` query parameter.
*   Example: `/api/songs?group=aqours`

#### Get Specific Song
`GET /songs/:group/:slug`
*   Example: `/api/songs/aqours/deep-resonance`

### Lyrics

#### Get Song Lyrics
`GET /lyrics/:group/:slug/:lang`
Returns the raw text content of the lyrics.
*   `lang`: `english`, `romaji`, or `kanji`.
*   Example: `/api/lyrics/aqours/deep-resonance/english`

---

## Development Status

- [x] **Groups API**: Fully implemented for all main series groups.
- [x] **Idols API**: Complete profiles for Muse, Aqours, Nijigasaki, Liella, Hasunosora, and more.
- [x] **Songs API**: Metadata implementation complete.
- [x] **Lyrics API**: Serving flat text files for English, Romaji, and Kanji.
- [x] **Playground**: Interactive web GUI for testing endpoints.
- [ ] **The New Group (Bluebird or something)**: Yeah, I dont really follow this one.

## Running Locally

1.  **Clone the repository**
    ```bash
    git clone https://github.com/repyh3/lovelive-api-v2.git
    cd lovelive-api-v2
    ```

2.  **Install dependencies**
    ```bash
    bun install
    ```

3.  **Run the development server**
    ```bash
    bun dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the Playground.

## License

This project is open source. Data regarding the Love Live! franchise is the property of Project Love Live!, Sunrise, Lantis, and ASCII Media Works.
