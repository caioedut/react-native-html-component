import HtmlComponent from 'react-native-html-component';

export default function Main() {
  const html = `
    <p>Hello World!</p>
    <img src="https://www.w3schools.com/html/pic_trulli.jpg" width="240"/>
  `;

  return <HtmlComponent html={html} />;
}
