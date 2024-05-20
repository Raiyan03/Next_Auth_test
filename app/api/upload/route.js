import { auth } from "@/app/auth";
import getSession from "@/app/lib/getSession";
import { google } from "googleapis";
import { OAuth2Client } from "google-auth-library";
import { NextResponse } from "next/server";
import { getToken } from "@/app/lib/getToken";

export async function GET(req) {
    const session = await auth();
    const { userId } = session;

    if (!session) {
        return new Response('Unauthorized', {
            status: 401,
        });
    }

    const token = await getToken(userId);

    const clientId = process.env.AUTH_GOOGLE_ID;
    const clientSecret = process.env.AUTH_GOOGLE_SECRET;
    const accessToken = token.access_token;
    const refreshToken = token.refresh_token;

    const oauth2Client = new OAuth2Client({
        clientId,
        clientSecret
    });

    oauth2Client.setCredentials({
        access_token: accessToken,
        refresh_token: refreshToken
    });

    try {
        const service = google.youtube("v3");
        const response = await service.channels.list({
            auth: oauth2Client,
            part: 'snippet,contentDetails,statistics',
            forUsername: 'GoogleDevelopers'
        });

        const channels = response.data.items;

        if (channels.length === 0) {
            console.log("No channels found with this username");
            return new Response('No channels found', {
                status: 404,
            });
        } else {
            console.log(`This channel's ID is ${channels[0].id}. Its title is '${channels[0].snippet.title}', and it has ${channels[0].statistics.viewCount} views.`);
            return new NextResponse(JSON.stringify({
                message: 'Success',
                channel: channels[0].snippet.title
            }), {
                status: 200,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        }
    } catch (err) {
        console.error("Error occurred while fetching channels:", err);
        return new Response("Error occurred while fetching channels", {
            status: 500,
        });
    }
}
