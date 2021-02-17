import React from 'react';
import { Checkbox, Form, Divider, Button } from 'semantic-ui-react';
import { serverOptions } from '../App';

export default function Controls({
  selectedServer,
  handleServerChange,
  handleFetchData,
  handleClearCache
}) {
  return (
    <>
      <Form>
        {serverOptions.map((server, key) => (
          <Form.Field key={key}>
            <Checkbox
              toggle
              label={server.type}
              className='server-selection-checkbox'
              value={server.id}
              checked={selectedServer === server.id}
              onChange={handleServerChange}
            />
          </Form.Field>
        ))}
      </Form>
      <Divider />
      <Button content='Fetch data' color='green' onClick={handleFetchData} />
      <Button content='Clear cache' color='orange' onClick={handleClearCache} />
    </>
  );
}
