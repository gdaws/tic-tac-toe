import {useEffect, useState} from 'react';
import { useRouter } from 'next/router';
import Page from '../components/layout/Page';
import Overlay from '../components/layout/Overlay';
import Centered from '../components/layout/Centered';
import MainMenu from '../components/forms/MainMenu';
import { generateUrl } from '../pages/play/[config]';

export default function Home() {

  const router = useRouter();

  const play = (config) => {
    router.push(generateUrl(config));
  };

  return (
    <Page>
      <Overlay>
        <Centered>
          <MainMenu value={{playerX: {type: 'human'}, playerO: {type: 'bot', skill: 'medium'}}} onSubmit={play} />
        </Centered>
      </Overlay>
    </Page>
  );
}
