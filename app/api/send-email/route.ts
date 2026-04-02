import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    const result = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "juanlavecchia23@gmail.com",
      subject: "Teste Resend",
      text: "Este é um teste direto pelo Resend."
    });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, error: "Erro ao enviar email" },
      { status: 500 }
    );
  }
}