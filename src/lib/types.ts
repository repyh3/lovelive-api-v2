export interface Song {
    title: string;
    group_id: string;
    url: string;
    artist: string[];
    composer: string[];
    arranger: string[];
    lyricist: string[];
    album: string;
    released: string;
    center: string | null;
    spotify: string | null;
    duration: string;
    description: string;
    categories: string[];
    infobox: Record<string, string>;
    lyrics: {
        english: string | null;
        romaji: string | null;
        kanji: string | null;
    };
}

export interface Group {
    name: string;
    japanese_name: string;
    romanized_name: string;
    type: "main_group" | "unit";
    image: string;
    logo: string | null;
    description: string;
    members: string[];
}

export interface Idol {
    idol_id: string;
    name_en: string;
    name_jp: string;
    group_id: string;
    sub_unit_id: string;
    school_id: string;
    year: string;
    birthday: string;
    zodiac: string;
    blood_type: string;
    height_cm: number | string;
    image_color: string;
    first_name?: string;
    last_name?: string;
    seiyuu_id: string;
    icon_url: string;
    signature_url: string;
    description?: string;
    original_infobox?: Record<string, string>;
}
