import Markdown from 'react-native-markdown-display';

interface Props {
  content: string;
}

function MDViewer({ content }: Props) {
  return <Markdown>{content.replace(/\\n/g, '\n')}</Markdown>;
}

export default MDViewer;
