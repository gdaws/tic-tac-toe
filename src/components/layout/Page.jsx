import Head from 'next/head';

export default function Page({children}) {

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#703D6F" />
        <meta name="msapplication-TileColor" content="#703D6F" />
        <meta name="theme-color" content="#703D6F" />
        <title>Play Tic Tac Toe</title>
      </Head>
      <div>
        {children}
      </div>
    </div>
  );
}
