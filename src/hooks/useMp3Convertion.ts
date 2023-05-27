import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";

export const useOggToMp3Converter = () => {
  const convertOggToMp3 = async (oggFile: File) => {
    // Initialize FFmpeg
    const ffmpeg = createFFmpeg({
      log: true,
    });
    await ffmpeg.load();

    // Read the OGG file
    const response = await fetch(oggFile as any);
    const oggData = await response.blob();
    ffmpeg.FS("writeFile", "input.ogg", oggData as any);

    // Run the conversion
    await ffmpeg.run("-i", "input.ogg", "output.mp3");

    // Read the converted MP3 file
    const mp3Data = ffmpeg.FS("readFile", "output.mp3");

    // Create a new File object for the MP3 file
    const mp3Blob = new Blob([mp3Data.buffer], { type: "audio/mp3" });
    const mp3FileName = oggFile.name.replace(/\.ogg$/, ".mp3");
    const mp3File = new File([mp3Blob], mp3FileName, { type: "audio/mp3" });

    return mp3File;
  };

  return { convertOggToMp3 };
};
