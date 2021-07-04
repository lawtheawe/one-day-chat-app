import { Card, Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components/macro';

import PageTitle from './components/PageTitle';
import ChannelSelectContainer from './containers/ChannelSelectContainer';
import ChatContainer from './containers/ChatContainer';
import UserSelectContainer from './containers/UserSelectContainer';
import { ChatsProvider } from './hooks/useChats';
import { CHANNELS, USERS } from './data';

const ContentWrapper = styled.div``;

const StyledCard = styled(Card)`
  border: 0;
  background: #f4f5fb;
  border-radius: 2px;
  box-shadow: none;
`;

const ChatSelectWrapper = styled.div`
  position: relative;
  padding: 1rem 0;
  border-right: 1px solid #e6ecf3;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const FlexCol = styled(Col)`
  display: flex;
  flex-direction: column;
`;

function App() {
  return (
    <ChatsProvider
      initialChat={{
        user: USERS[0],
        channel: CHANNELS[0],
        messages: [],
      }}
    >
      <Container>
        <PageTitle />
        <ContentWrapper>
          <Row>
            <Col xs={12}>
              <StyledCard>
                <Row noGutters>
                  <Col xs={3} md={4}>
                    <ChatSelectWrapper>
                      <UserSelectContainer />
                      <ChannelSelectContainer />
                    </ChatSelectWrapper>
                  </Col>
                  <FlexCol xs={9} md={8}>
                    <ChatContainer />
                  </FlexCol>
                </Row>
              </StyledCard>
            </Col>
          </Row>
        </ContentWrapper>
      </Container>
    </ChatsProvider>
  );
}

export default App;
