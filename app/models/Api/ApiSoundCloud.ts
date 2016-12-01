
/**
 * SoundCloud の 楽曲URLから楽曲情報を取得するAPIのリダイレクトレスポンス
 * @link http://stackoverflow.com/questions/26289927/how-to-get-track-id-from-url-using-the-soundcloud-api
 * @remarks https://api.soundcloud.com/resolve.json?url={楽曲URL}
 */
export interface ApiSoundRedirect {
    /**
     * Http status code and status message.
     */
    status?: string;
    /**
     * Sound json file access url
     */
    location?: string;
}

/**
 * SoundCloud の 楽曲URLから楽曲情報を取得するレスポンス
 * @link http://stackoverflow.com/questions/26289927/how-to-get-track-id-from-url-using-the-soundcloud-api
 */
export interface ApiSound {
    kind?: string;
    id?: number;
    created_at?: string;
    user_id?: number;
    duration?: number;
    commentable?: boolean;
    state?: string;
    original_content_size?: number;
    last_modified?: string;
    sharing?: string;
    tag_list?: string;
    permalink?: string;
    stremable?: string;
    embeddable_by?: string;
    downloadable?: string;
    purchase_url?: string;
    label_id?: number;
    purchase_title?: string;
    genre?: string;
    title?: string;
    description?: string;
    label_name?: string;
    release?: string;
    track_type?: string;
    key_signature?: string;
    isrc?: string;
    video_url?: string;
    bpm?: number;
    release_year?: string;
    release_month?: string;
    release_day?: string;
    original_format?: string;
    license?: string;
    uri?: string;
    user?: ApiSound;
    permalink_url?: string;
    artwork_url?: string;
    waveform_url?: string;
    stream_url?: string;
    download_url?: string;
    playback_count?: number;
    download_count?: number;
    favoritings_count?: number;
    comment_count?: number;
    attachments_uri?: string;
    policy?: string;
}
