import { useState } from 'react'
import { Outlet } from 'react-router'
import { Main } from '../ui/main'
import { Container } from '../ui/container'
import { Title } from '../ui/title'
import { Footer } from '../ui/footer'
import { SubscribeBlockContainer } from './subscribe-block-container'
import { HeaderContainer } from './header-container'

export function Layout() {
  const [title, setTitle] = useState<string>('');
  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderContainer container={Container} />
      <Main>
        <Container>
          {title && <Title>{title}</Title>}
          <Outlet context={{ title, setTitle, setShowSubscribe }} />
          {showSubscribe && <SubscribeBlockContainer />}
        </Container>
      </Main>

      <Footer container={Container} />
    </div>
  );
};