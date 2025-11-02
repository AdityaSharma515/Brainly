function extractVideoId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S*\/|(?:v|e(?:mbed)?|shorts)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );
  return match ? match[1] : null;
}

const  YouTube = ({ url }: { url: string }) => {
  const videoId = extractVideoId(url);
  if (!videoId) return <p>Invalid YouTube URL</p>;

  return (
    <div className="relative w-full pb-80 overflow-hidden rounded-xl shadow-md">
      <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}?modestbranding=1&controls=1`}
        title="YouTube video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default YouTube
