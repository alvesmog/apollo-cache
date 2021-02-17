import { useReactiveVar } from '@apollo/client';
import { currentCache } from '../App';
import { Card } from 'semantic-ui-react';

const CurrentCache = ({ selectedServer }) => {
  const _currentCache = useReactiveVar(currentCache);
  console.log('renderizou current cache', _currentCache);
  const printableCache = _currentCache
    ? () => {
        const { data } = _currentCache;
        return JSON.stringify(data?.data, null, 2);
      }
    : () => false;

  return (
    <div>
      <h2>Current Cache - Server {selectedServer}</h2>
      {_currentCache && Object.keys(_currentCache).length !== 0 && (
        <Card fluid>
          <Card.Content>
            <Card.Description>
              <pre style={{ color: 'black', fontWeight: 700 }}>{printableCache()}</pre>
            </Card.Description>
          </Card.Content>
        </Card>
      )}
    </div>
  );
};

export default CurrentCache;
