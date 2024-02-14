import Markdown from 'react-native-markdown-display';

interface Props {
  content: string;
}

function MDViewer({ content }: Props) {
  return <Markdown>{content}</Markdown>;
}

export default MDViewer;
