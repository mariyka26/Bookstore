import { useState } from 'react'
import { Outlet } from 'react-router'
import { Header } from './header'
import { Main } from './main'
import { Container } from './container'
import { Title } from './title'
import { Breadcrumbs } from './breadcrumbs'
import { Footer } from './footer'
import { SubscribeBlock } from './subscribe-block'

interface BreadcrumbItem {
  to: string
  label: string
}

export function Layout() {
  const [title, setTitle] = useState<string>('')
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([])
  const [showSubscribe, setShowSubscribe] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Header container={Container} />
      <Main>
        <Container>
          {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
          {title && <Title>{title}</Title>}
          <Outlet context={{ title, setTitle, setBreadcrumbs, setShowSubscribe }} />
          {showSubscribe && <SubscribeBlock />}
        </Container>
      </Main>

      <Footer container={Container} />
    </div>
  );
};