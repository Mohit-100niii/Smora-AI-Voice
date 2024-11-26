import dbConnect from "@/app/config/dbConnect";
import TextAudio from "@/app/model/TextAudio";
import User from "@/app/model/User";

export async function DELETE(req){
    const { searchParams } = new URL(req.url);
    dbConnect();
    try {
      const id  = searchParams.get('id'); 
      console.log("ID to delete:", id); 
  
  
      const deletedAudio = await TextAudio.findByIdAndDelete(id);
  
      if (!deletedAudio) {
        return new Response(JSON.stringify({ message: "Audio not found" }));
      }
  
      return new Response(JSON.stringify({ message: "Deletion successful", deletedAudio }));
    } catch (error) {
      console.error("Error deleting audio:", error);
      return new Response(JSON.stringify({ message: "Internal server error" }));
    }
  };