import dbConnect from "@/app/config/dbConnect";
import TextAudio from "@/app/model/TextAudio";
import User from "@/app/model/User";

export async function POST(req) {
  try {
    await dbConnect();

    const body = await req.json();
    const { audiourl, inputText, fullname, email } = body;

    let existedUser = await User.findOne({ email });

    if (!existedUser) {
      existedUser = await User.create({ fullname, email });
    }

    const textAudioData = await TextAudio.create({
      userId: existedUser._id,
      text: inputText,
      audioUrl: audiourl,
    });

    // Return success response
    return new Response(
      JSON.stringify({
        message: "Audio and text saved successfully.",
        data: textAudioData,
      })
    );
  } catch (error) {
    console.error("Error:", error.message);

    // Return error response
    return new Response(
      JSON.stringify({
        message: "An error occurred while saving the audio data.",
        error: error.message,
      })
    );
  }
}
