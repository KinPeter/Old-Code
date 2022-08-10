import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import styled from 'styled-components'

import SideNavBar from './components/sidenavbar'
import Discover from './pages/discover'
import { WIDTH_LG } from './mediaquery'

import './css/app.scss'

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <PageContainer>
          <SideNavBar {...this.props} />
          <ContentWrapper>
            <Switch>
              <Route path="/discover" component={Discover} />
            </Switch>
          </ContentWrapper>
        </PageContainer>
      </Router>
    )
  }
}

const ContentWrapper = styled.main`
  padding-left: 0;

  @media (min-width: ${WIDTH_LG}) {
    padding-left: 280px;
  }
`

const PageContainer = styled.main`
  overflow-x: hidden;
`
