import { NextRequest, NextResponse } from "next/server";
import {z} from "zod";  //adding zod to filter out the schema and to parse the data
import {prismaClient} from "@/app/lib/db"
import { YT_REGEX } from "@/app/lib/utils";

const CreateStreamSchema = z.object({
    creatorId: z.string(),
    url: z.string()  //make sure this url have youtube,spotify inside
})

export async function POST (req: NextRequest){
   try{
    const data = CreateStreamSchema.parse(await req.json());
    const isYt = data.url.includes("youtube")
    prismaClient.stream.create({
        userId: data.creatorId,
        url: data.url
    })
   } catch(e){
    return NextResponse.json({
        message: "Error while adding a stream"
    }, {
        status: 411
    })
   }

}