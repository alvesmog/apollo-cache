import { Grid } from 'semantic-ui-react';

import { ColoringBooks, TextBooks, CurrentCache } from './index';

export default function Content({ selectedServerInfo, selectedServer }) {
  return (
    <Grid columns={3} relaxed='very' className='content-grid'>
      <Grid.Column width={4}>
        <ColoringBooks
          selectedServerInfo={selectedServerInfo}
          selectedServer={selectedServer}
        />
      </Grid.Column>
      <Grid.Column width={4}>
        <TextBooks
          selectedServerInfo={selectedServerInfo}
          selectedServer={selectedServer}
        />
      </Grid.Column>
      <Grid.Column width={8}>
        <CurrentCache selectedServer={selectedServer} />
      </Grid.Column>
    </Grid>
  );
}
