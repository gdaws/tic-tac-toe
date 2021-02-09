import Head from 'next/head';

export default function Page({children}) {

  return (
    <div>
      <Head>
        <title>Play Tic Tac Toe</title>
      </Head>
      <div>
        {children}
      </div>
    </div>
  );
}
