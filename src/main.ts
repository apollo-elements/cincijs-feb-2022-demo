import '@apollo-elements/components/apollo-client';
import { ApolloClientElement } from '@apollo-elements/components/apollo-client';

import { client } from './client';

import './components/user-profile';

const clientWrapper = document.getElementById('client') as ApolloClientElement;

clientWrapper.client = client;

customElements.whenDefined('user-profile')
  .then(() => document.body.removeAttribute('unresolved'));
