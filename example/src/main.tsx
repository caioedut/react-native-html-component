import HtmlComponent from 'react-native-html-component';
import { Button, SafeAreaView, ScrollView } from 'react-native';
import { useState } from 'react';

export default function Main() {
  const [isVisible, setIsVisible] = useState(true);

  const html = `
    <h1 style="text-align: center;">Hello World!</h1>

    <img src="https://www.w3schools.com/html/pic_trulli.jpg" width="240" style="float: left; margin: 0 16px 16px 0"/>

    <p>Lorem ipsum dolor sit amet. Et voluptatem eaque 33 asperiores omnis in molestiae asperiores. Sit ipsum dolor et omnis dolorem est dignissimos quia aut fugit porro et quia nemo nam rerum nobis. Aut fugit eius ut recusandae dolores sit maiores minima ut voluptatem voluptatem nam laboriosam dolorum ex quia animi aut iste autem! Est amet fugit eum voluptatibus illo in illo nesciunt est accusamus rerum vel cumque dolorem quo ipsa reprehenderit et molestiae dolorem.</p>
    <p>Qui asperiores voluptatibus et quidem provident ut sint assumenda. Est dignissimos nulla et sunt expedita sed consequuntur commodi ut quam fugit. Sed laboriosam voluptas ex laudantium quia sit ipsum iure eos veritatis eveniet et totam cumque ut deleniti consequuntur. Et provident maxime At consequuntur repudiandae ut necessitatibus sunt.</p>
    <p>Est expedita galisum At veniam praesentium 33 error exercitationem 33 ullam praesentium ab laboriosam repellendus sit voluptatum Quis! Et omnis officiis et natus voluptates qui quasi voluptatum quo impedit numquam aut molestias cupiditate. Ex nihil maxime nam voluptas obcaecati aut voluptatem molestiae non tenetur ipsum ad iure iusto aut quia placeat et unde eveniet?</p>
    <p>Lorem ipsum dolor sit amet. Et voluptatem eaque 33 asperiores omnis in molestiae asperiores. Sit ipsum dolor et omnis dolorem est dignissimos quia aut fugit porro et quia nemo nam rerum nobis. Aut fugit eius ut recusandae dolores sit maiores minima ut voluptatem voluptatem nam laboriosam dolorum ex quia animi aut iste autem! Est amet fugit eum voluptatibus illo in illo nesciunt est accusamus rerum vel cumque dolorem quo ipsa reprehenderit et molestiae dolorem.</p>
    <p>Qui asperiores voluptatibus et quidem provident ut sint assumenda. Est dignissimos nulla et sunt expedita sed consequuntur commodi ut quam fugit. Sed laboriosam voluptas ex laudantium quia sit ipsum iure eos veritatis eveniet et totam cumque ut deleniti consequuntur. Et provident maxime At consequuntur repudiandae ut necessitatibus sunt.</p>
    <p>Est expedita galisum At veniam praesentium 33 error exercitationem 33 ullam praesentium ab laboriosam repellendus sit voluptatum Quis! Et omnis officiis et natus voluptates qui quasi voluptatum quo impedit numquam aut molestias cupiditate. Ex nihil maxime nam voluptas obcaecati aut voluptatem molestiae non tenetur ipsum ad iure iusto aut quia placeat et unde eveniet?</p>

    <a href="#hash">Hash Link</a>
    <br/>
    <a href="https://www.npmjs.com/package/react-native-html-component">External Link (&#x3C;a&#x3E;)</a>
    <br/>
    <button onclick="window.open('https://www.npmjs.com/package/react-native-html-component')">External Link (window.open)</button>
    <br/>
    <button onclick="location.href = 'https://www.npmjs.com/package/react-native-html-component'">External Link (location.href)</button>
    <br/>
    <button onclick="alert('Hello World!')">Alert</button>
  `;

  const css = `
    body {
      padding: 16px;
    }

    p:first-letter {
      margin-left: 16px
    }
  `;

  return (
    <SafeAreaView>
      <Button title={isVisible ? 'Hide' : 'Show'} onPress={() => setIsVisible((current) => !current)} />

      <ScrollView>
        {isVisible && (
          <HtmlComponent
            html={html}
            css={css}
            onNavigate={({ url }) => {
              alert(`onNavigate: ${url}`);
              return true;
            }}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
