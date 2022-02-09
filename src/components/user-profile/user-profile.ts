import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { classMap } from 'lit/directives/class-map.js';
import { ApolloQueryController } from '@apollo-elements/core';

import { UserProfile } from './UserProfile.query.graphql.js';

import style from './user-profile.css';

@customElement('user-profile')
export class UserProfileElement extends LitElement {
  static styles = style;

  query = new ApolloQueryController(this, UserProfile);

  render() {
    const { data, loading } = this.query;
    return html`
      <header>
        <h2 class=${classMap({ loading })}>
          Welcome, ${data?.profile?.name}!
        </h2>
      </header>
    `;
  }
}
