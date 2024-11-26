import dbConnect from "@/app/config/dbConnect";
import TextAudio from "@/app/model/TextAudio";
import User from "@/app/model/User";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
  try {
    await dbConnect();

    const email = searchParams.get("email");

    

    // Fetch user data based on email
    const UserData = await User.findOne({ email });

    if (!UserData) {
      return new Response(JSON.stringify({ message: "User not found" }));
    }

    const userId = UserData._id.toString();

    const UserSavedData = await TextAudio.find({ userId }); // Match userId in TextAudio

    return new Response(
      JSON.stringify({
        message: "Data Fetch Successfully",
        UserSavedData,
      })
    );
  } catch (error) {
    console.error("Error fetching user data:", error);
    new Response(JSON.stringify({ message: "An error occurred" }));
  }
}
