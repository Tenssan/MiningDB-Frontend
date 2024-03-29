import { Html, Head, Main, NextScript } from 'next/document'

export default function Document({ children }) {
  return (
    <Html lang="en">
      <Head>
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap" rel="stylesheet"></link>
        
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        {children}
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
