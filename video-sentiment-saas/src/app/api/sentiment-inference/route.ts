import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import {
  InvokeEndpointCommand,
  SageMakerRuntime,
  SageMakerRuntimeClient,
} from "@aws-sdk/client-sagemaker-runtime";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { NextResponse } from "next/server";
import { env } from "~/env";
import { checkAndUpdateQuota } from "~/lib/quota";
import { db } from "~/server/db";

export async function POST(req: Request) {
  try {
    // Comment out API key check for local development
    // const apiKey = req.headers.get("Authorization")?.replace("Bearer ", "");
    // if (!apiKey) {
    //   return NextResponse.json({ error: "API key required" }, { status: 401 });
    // }

    // Find the user by API key
    // const quota = await db.apiQuota.findUnique({
    //   where: {
    //     secretKey: apiKey,
    //   },
    //   select: {
    //     userId: true,
    //   },
    // });

    // if (!quota) {
    //   return NextResponse.json({ error: "Invalid API key" }, { status: 401 });
    // }

    const { key } = await req.json();

    if (!key) {
      return NextResponse.json({ error: "Key is required" }, { status: 400 });
    }

    // Comment out database operations for local development
    // const file = await db.videoFile.findUnique({
    //   where: { key },
    //   select: { userId: true, analyzed: true },
    // });

    // if (!file) {
    //   return NextResponse.json({ error: "File not found" }, { status: 404 });
    // }

    // if (file.userId !== quota.userId) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    // if (file.analyzed) {
    //   return NextResponse.json(
    //     { error: "File already analyzed" },
    //     { status: 400 },
    //   );
    // }

    // const hasQuota = await checkAndUpdateQuota(quota.userId, true);

    // if (!hasQuota) {
    //   return NextResponse.json(
    //     { error: "Monthly quota exceeded" },
    //     { status: 429 },
    //   );
    // }

    // Since running locally, we'll simulate a successful analysis response
    const analysis = {
      analysis: {
        utterances: [
          {
            start_time: 0,
            end_time: 5,
            text: "Sample utterance",
            emotions: [
              { label: "joy", confidence: 0.8 },
              { label: "neutral", confidence: 0.2 }
            ],
            sentiments: [
              { label: "positive", confidence: 0.8 },
              { label: "neutral", confidence: 0.2 }
            ]
          }
        ]
      }
    };

    // Comment out database update for local development
    // await db.videoFile.update({
    //   where: { key },
    //   data: {
    //     analyzed: true,
    //   },
    // });

    return NextResponse.json({
      analysis,
    });
  } catch (error) {
    console.error("Analysis error: ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}