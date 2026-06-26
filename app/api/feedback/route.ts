import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabase";

export async function GET() {
    const { data, error } = await supabase
        .from("feedbacks")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(req: Request) {
    const body = await req.json();

    const { data, error } = await supabase
        .from("feedbacks")
        .insert([
            {
                name: body.name,
                service: body.service,
                rating: body.rating,
                comment: body.comment,
            },
        ])
        .select()
        .single();

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}