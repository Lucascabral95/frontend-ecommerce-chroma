import "./YoutubeVideo.scss";

interface Props {
  videoId: string;
  title?: string;
}

function YoutubeVideo({ videoId, title }: Props) {
  return (
    <div className="youtube-video">
      <iframe
        className="video"
        allowFullScreen
        src={`https://www.youtube.com/embed/${videoId}`}
        title={title ?? "Video de Youtube"}
      />
    </div>
  );
}

export default YoutubeVideo;
