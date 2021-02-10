import Head from 'next/head';

export default function Page({children}) {

  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Play Tic Tac Toe</title>
      </Head>
      <div>
        {children}
      </div>
    </div>
  );
}
