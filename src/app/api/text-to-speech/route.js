import https from "https";

export async function POST(req) {
  try {
    const body = await req.json(); // Parse incoming JSON request
    const { text, voice = "s3://voice-cloning-zero-shot/d9ff78ba-d016-47f6-b0ef-dd630f59414e/female-cs/manifest.json" } = body;

    if (!text) {
      return new Response(
        JSON.stringify({ error: "Text is required for TTS conversion." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const options = {
      method: "POST",
      hostname: "api.play.ht",
      path: "/api/v2/tts/stream",
      headers: {
        accept: "audio/mpeg",
        "content-type": "application/json",
        AUTHORIZATION: process.env.NEXT_PUBLIC_AUTHORIZATION_URL,
        "X-USER-ID": process.env.NEXT_PUBLIC_X_USER_ID,
      },
    };

    return new Promise((resolve, reject) => {
      const externalReq = https.request(options, (externalRes) => {
        if (externalRes.statusCode !== 200) {
          resolve(
            new Response(
              JSON.stringify({
                error: `Play.ht API error: ${externalRes.statusMessage} ${externalRes.statusCode}`,
              }),
              { status: externalRes.statusCode, headers: { "Content-Type": "application/json" } }
            )
          );
        } else {
          // Collect audio data chunks
          const chunks = [];
          externalRes.on("data", (chunk) => chunks.push(chunk));
          externalRes.on("end", () => {
            const audioBuffer = Buffer.concat(chunks);

            resolve(
              new Response(audioBuffer, {
                status: 200,
                headers: {
                  "Content-Type": "audio/mpeg",
                  "Content-Disposition": "inline; filename=output_audio.mp3",
                },
              })
            );
          });
        }
      });

      externalReq.on("error", (err) => {
        console.error("Error during API request:", err.message);
        reject(
          new Response(
            JSON.stringify({ error: "Failed to fetch audio from Play.ht." }),
            { status: 500, headers: { "Content-Type": "application/json" } }
          )
        );
      });

      // Send request body to Play.ht API
      externalReq.write(
        JSON.stringify({
          voice,
          voice_engine: "PlayHT2.0-turbo",
          output_format: "mp3",
          text,
        })
      );
      externalReq.end();
    });
  } catch (error) {
    console.error("Error during TTS process:", error.message);
    return new Response(
      JSON.stringify({
        error: "Failed to process TTS request.",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
