import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";  //adding zod to filter out the schema and to parse the data
import { prismaClient } from "@/app/lib/db"
import { YT_REGEX } from "@/app/lib/utils";

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()  //make sure this url have youtube,spotify inside
})

export async function POST(req: NextRequest) {
    try {
        const data = CreateStreamSchema.parse(await req.json());
        const isYt = YT_REGEX.test(data.url);
        if (!isYt){
            return NextResponse.json({
                message: "Error while adding a stream"
            }, {
                status: 411
            })
        }
        const extractedId = data.split("?v=")[1];
        prismaClient.stream.create({
            data: {
                userId: data.creatorId,
            url: data.url,
            extractedId,
            type: "Youtube"
            }
        });
    } catch (e) {
        return NextResponse.json({
            message: "Error while adding a stream"
        }, {
            status: 411
        })
    }
}
    export async function GET(req: NextRequest){
        const creatorId = req.nextUrl.searchParams.get("creatorId");
        const streams = await prismaClient.user.findMany({
            where:{
                userId: creatorId ?? ""
            }
        })
        return NextResponse.json{(
            streams
        )}
    }

