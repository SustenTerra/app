import YoutubeIframe from 'react-native-youtube-iframe';

import { isWeb } from '@/utils/platform';
import { verticalScale } from '@/utils/scale';

interface Props {
  videoId: string;
}

function YTVideo({ videoId }: Props) {
  if (isWeb) {
    return (
      <iframe
        width="100%"
        height="300px"
        src={`https://www.youtube.com/embed/${videoId}`}
        style={{
          border: 'none',
        }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  return <YoutubeIframe height={verticalScale(220)} videoId={videoId} />;
}

export default YTVideo;
