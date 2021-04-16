// Type definitions for the JamFactory API
// Project: https://github.com/JamFactoryApp
// Definitions by: JamFactoryApp <https://github.com/JamFactoryApp>
// Definitions: https://github.com/JamFactoryApp/jamfactory-types

/// <reference types="spotify-api" />

import SpotifyPlaybackState = SpotifyApi.CurrentlyPlayingObject;
import SpotifyPlaybackDevice = SpotifyApi.UserDevice;
import SpotifyPlaylistSearchResponse = SpotifyApi.PlaylistSearchResponse;
import SpotifySearchResponse = SpotifyApi.SearchResponse;
import SpotifyTrackObjectFull = SpotifyApi.TrackObjectFull;

/** ---------------------------------------------------------------------------------------------------------------------
 * general
 */

/**
 * Empty Response
 */
interface JamEmptyResponse {}

/**
 * Empty Request
 */
interface JamEmptyRequest {}

/**
 * Success Confirmation
 */
interface JamSuccessConfirmation {
    success: boolean;
}

/**
 * Constants
 */
export const JamUserNew = 'New';
export const JamUserGuest = 'Guest';
export const JamUserHost = 'Host';
export const JamSessionVoting = 'session_voting';
export const JamIpVoting = 'ip_voting';

/**
 * Queue Song Object
 */
// JamQueueSong
interface JamQueueSong {
    spotifyTrackFull: SpotifyApi.TrackObjectFull;
    votes: number;
    voted: boolean;
}

export type QueueSong = JamQueueSong;

/** ---------------------------------------------------------------------------------------------------------------------
 * /api/v1/auth Endpoints
 */

interface JamAuthStatus {
    user: string;
    label: string;
    authorized: boolean;
}

interface JamAuthUrl {
    url: string;
}

/** GET /api/v1/auth/current */
export type AuthCurrentRequestBody = JamEmptyRequest;
export type AuthCurrentResponseBody = JamAuthStatus;

/** GET /api/v1/auth/logout */
export type LogoutRequestBody = JamEmptyRequest;
export type LogoutResponseBody = JamSuccessConfirmation;

/** GET /api/v1/auth/login */
export type LoginRequestBody = JamEmptyRequest;
export type LoginResponseBody = JamAuthUrl;

/** ---------------------------------------------------------------------------------------------------------------------
 * /api/v1/jam Endpoints
 */

interface JamSessionDetails {
    label: string;
    name: string;
    active: boolean;
    voting_type: string;
}

interface JamSessionSetting {
    name?: string;
    active?: boolean;
    voting_type?: boolean;
}

interface JamPlaybackSettings {
    playing?: boolean;
    device_id?: string;
}

interface JamLabelBody {
    label: string;
}

interface JamPlaybackBody {
    playback: SpotifyPlaybackState;
    device_id: string;
}


/** PUT /api/v1/jam/create */
export type CreateJamSessionRequestBody = JamEmptyRequest;
export type CreateJamSessionResponseBody = JamLabelBody;


/** GET /api/v1/jam */
export type GetJamSessionRequestBody = JamEmptyRequest;
export type GetJamSessionResponseBody = JamSessionDetails;

/** GET /api/v1/jam/playback */
export type GetPlaybackRequestBody = JamEmptyRequest;
export type GetPlaybackResponseBody = JamPlaybackBody;

/** GET /api/v1/jam/join */
export type JoinRequestBody = JamLabelBody;
export type JoinResponseBody = JamLabelBody;

/** GET /api/v1/jam/leave */
export type LeaveJamSessionRequestBody = JamEmptyRequest;
export type LeaveJamSessionResponseBody = JamSuccessConfirmation;

/** PUT /api/v1/jam/playback */
export type SetPlaybackRequestBody = JamPlaybackSettings;
export type SetPlaybackResponseBody = JamPlaybackBody;

/** PUT /api/v1/jam */
export type SetJamSessionRequestBody = JamSessionSetting;
export type SetJamSessionResponseBody = JamSessionDetails;



/** ---------------------------------------------------------------------------------------------------------------------
 * /api/v1/queue Endpoints
 */

interface JamVote {
    track: string;
}

interface JamCollectionInfo {
    collection: string;
    type: string;
}

interface JamQueue {
    tracks: JamQueueSong[];
}

/** PUT /api/v1/queue/collection */
export type AddCollectionRequestBody = JamCollectionInfo;
export type AddCollectionResponseBody = JamQueue;

/** DELETE /api/v1/queue/delete */
export type DeleteSongRequestBody = JamVote;
export type DeleteSongResponseBody = JamQueue;

/** GET /api/v1/queue */
export type GetQueueRequestBody = JamEmptyRequest;
export type GetQueueResponseBody = JamQueue;

/** GET /api/v1/queue/vote */
export type VoteRequestBody = JamVote;
export type VoteResponseBody = JamQueue;


/** ---------------------------------------------------------------------------------------------------------------------
 * /api/v1/spotify Endpoints
 */

interface SpotifySearchRequest {
    text?: string;
    type?: string;
}

interface SpotifyDevices {
    devices: SpotifyPlaybackDevice[];
}

/** GET /api/v1/spotify/devices */
export type UserDevicesRequestBody = JamEmptyRequest;
export type UserDevicesResponseBody = SpotifyDevices;

/** GET /api/v1/spotify/playlists */
export type UserPlaylistsRequestBody = JamEmptyRequest;
export type UserPlaylistsResponseBody = SpotifyPlaylistSearchResponse;

/** PUT /api/v1/spotify/search */
export type SpotifySearchRequestBody = SpotifySearchRequest;
export type SpotifySearchResponseBody = SpotifySearchResponse;


/** ---------------------------------------------------------------------------------------------------------------------
 * Websockets
 */

export const JamSocketEventJam = 'jam';
export const JamSocketEventQueue = 'queue';
export const JamSocketEventPlayback = 'playback';
export const JamSocketEventClose = 'close';


interface SocketNotification {
    event: string,
    message: SocketQueueMessage | SocketPlaybackMessage | SocketCloseMessage | JamSessionDetails
}

export const JamCloseReasonHost = 'host';
export const JamCloseReasonInactive = 'inactive';
export const JamCloseReasonWarning = 'warning';

interface CloseEvent {
    reason: string;
}

type SocketQueueMessage = JamQueue;

type SocketPlaybackMessage = JamPlaybackBody;

type SocketCloseMessage = string;

type SocketJamMessage = JamSessionDetails

export type SocketNotificationBody = SocketNotification;

